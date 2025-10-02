export const runtime = "nodejs";

function getCrypto(): Crypto {
  if (typeof globalThis !== "undefined" && (globalThis as any).crypto) {
    return (globalThis as any).crypto as Crypto;
  }
  throw new Error("CRYPTO_UNAVAILABLE");
}

function toHex(bytes: Uint8Array): string {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    const h = bytes[i].toString(16).padStart(2, "0");
    hex += h;
  }
  return hex;
}

function fromHex(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("INVALID_HEX");
  }
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = Number.parseInt(hex.substr(i * 2, 2), 16);
    if (Number.isNaN(byte)) {
      throw new Error("INVALID_HEX");
    }
    out[i] = byte;
  }
  return out;
}

function getSecretKeyBytes(): Uint8Array {
  const raw = `${
    process.env.ORDER_ID_SECRET_KEY ??
    "9a3f5e0c4c87e2f911b6f7b2375ad8a7d6c4cdb3d6e5f0a7b3c1d4a6b8c9d2e3"
  }`;
  if (!raw) {
    throw new Error("MISSING_SECRET_KEY");
  }

  const tryBase64 = (() => {
    try {
      const buf = Buffer.from(raw, "base64");
      return buf.length === 32 ? new Uint8Array(buf) : null;
    } catch {
      return null;
    }
  })();

  if (tryBase64) return tryBase64;

  const tryHex = (() => {
    try {
      const buf = Buffer.from(raw, "hex");
      return buf.length === 32 ? new Uint8Array(buf) : null;
    } catch {
      return null;
    }
  })();

  if (tryHex) return tryHex;

  const utf8 = Buffer.from(raw, "utf8");
  if (utf8.length === 32) return new Uint8Array(utf8);

  throw new Error(
    `INVALID_SECRET_KEY_LENGTH - ${
      process.env.NODE_ENV === "development" ? raw : ""
    }`
  );
}

export async function encodePriceToOrderId(price: string): Promise<string> {
  const cryptoApi = getCrypto();
  const keyBytes = getSecretKeyBytes();
  const iv = new Uint8Array(12);
  cryptoApi.getRandomValues(iv);

  const plaintext = new TextEncoder().encode(price);
  const cryptoKey = await cryptoApi.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const encrypted = await cryptoApi.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    plaintext
  );
  const ciphertextWithTag = new Uint8Array(encrypted);

  const payload = new Uint8Array(iv.length + ciphertextWithTag.length);
  payload.set(iv, 0);
  payload.set(ciphertextWithTag, iv.length);

  const lengthBytes = payload.length;
  const dataBigInt = BigInt("0x" + toHex(payload));
  const markerShift = BigInt(16 + lengthBytes * 8);
  const withMarker =
    (BigInt(1) << markerShift) |
    (BigInt(lengthBytes) << BigInt(lengthBytes * 8)) |
    dataBigInt;
  return withMarker.toString(10);
}

export async function decodeOrderIdToPrice(orderId: string): Promise<string> {
  if (!/^[0-9]+$/.test(orderId)) {
    throw new Error("INVALID_ORDER_ID_FORMAT");
  }

  const combined = BigInt(orderId);
  if (combined <= BigInt(1)) {
    throw new Error("INVALID_ORDER_ID_VALUE");
  }

  const bitLength = combined.toString(2).length;
  const markerBitPos = BigInt(bitLength - 1);
  const withoutMarker = combined - (BigInt(1) << markerBitPos);

  const remainingBits = Number(markerBitPos);
  console.log('markerBitPos:', markerBitPos)
  if (remainingBits < 16) {
    throw new Error("INVALID_ORDER_ID_BITS");
  }

  const lengthBits = 16;
  const dataBits = remainingBits - lengthBits;

  const lengthValue = Number(withoutMarker >> BigInt(dataBits));
  if (lengthValue <= 0) {
    throw new Error("INVALID_ORDER_ID_LENGTH");
  }

  const dataMask = (BigInt(1) << BigInt(dataBits)) - BigInt(1);
  const dataBigInt = withoutMarker & dataMask;

  const dataHex = dataBigInt.toString(16).padStart(lengthValue * 2, "0");
  const payload = fromHex(dataHex);

  if (payload.length !== lengthValue) {
    throw new Error("ORDER_ID_LENGTH_MISMATCH");
  }

  if (lengthValue < 12 + 16) {
    throw new Error("ORDER_ID_TOO_SHORT");
  }

  const iv = payload.subarray(0, 12);
  const ciphertextWithTag = payload.subarray(12);

  const cryptoApi = getCrypto();
  const keyBytes = getSecretKeyBytes();
  const cryptoKey = await cryptoApi.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const decrypted = await cryptoApi.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    ciphertextWithTag
  );
  return new TextDecoder().decode(new Uint8Array(decrypted));
}
