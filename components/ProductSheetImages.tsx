"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductImagesProps {
  product: {
    image: string;
    images: string[];
    name: string;
    price: number;
    originalPrice?: number;
  };
}

export default function ProductImages({ product }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative rounded-lg aspect-square overflow-hidden">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        {product.originalPrice && (
          <div className="top-4 left-4 absolute">
            <Badge variant="destructive">
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </Badge>
          </div>
        )}
      </div>

      {/* Miniatures */}
      {product.images.length > 1 && (
        <div className="gap-2 grid grid-cols-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-md aspect-square overflow-hidden cursor-pointer ${
                selectedImage === image ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 2}`}
                fill
                className="object-cover hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
