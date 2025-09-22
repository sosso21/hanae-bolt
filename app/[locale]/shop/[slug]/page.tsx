import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowLeft, Check, Clock, Shield, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { BuyNowButton } from "@/components/cart/buy-now-button";
import { locales, Locale, translations } from "@/lib/i18n";
import { getProductBySlug, PRODUCTS } from "@/constants/products";
import { HANAE_INFO } from "@/constants";
import ProductImages from "@/components/ProductSheetImages";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const paths = [];
  for (const locale of locales) {
    for (const product of PRODUCTS) {
      paths.push({ locale, slug: product.slug });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const product = getProductBySlug(slug, locale);
  if (!product) {
    notFound();
  }

  const t = translations[locale];

  return {
    title: `${product.name} - ${t.shop.title} ${HANAE_INFO.name}`,
    description: product.description,
    alternates: {
      canonical: `/${locale}/shop/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const product = getProductBySlug(slug, locale);
  if (!product) {
    notFound();
  }

  const t = translations[locale];

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <div className="mx-auto px-4 py-8 container">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link
                href={`/${locale}/shop`}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.shop.backToShopLabel}
              </Link>
            </Button>
          </div>

          <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
            {/* Product Images */}
            <ProductImages product={product} /> {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <span className="ml-2 text-muted-foreground text-sm">
                      (4.8)
                    </span>
                  </div>
                </div>

                <h1 className="mb-4 font-bold text-foreground text-3xl">
                  {product.name}
                </h1>

                <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-primary text-3xl">
                      {product.price}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground text-xl line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock
                      ? t.shop.inStockLabel
                      : t.shop.outOfStockLabel}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-row flex-col gap-4">
                <AddToCartButton
                  product={product}
                  locale={locale}
                  size="lg"
                  className="flex-1"
                />
                <BuyNowButton
                  product={product}
                  locale={locale}
                  size="lg"
                  className="flex-1"
                />
              </div>

              {/* Features */}
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="font-medium">{t.shop.guaranteeTitle}</p>
                    <p className="text-muted-foreground text-xs">
                      {t.shop.guaranteeText}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{t.shop.deliveryTitle}</p>
                    <p className="text-muted-foreground text-xs">
                      {t.shop.deliveryText}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="font-medium">{t.shop.supportTitle}</p>
                    <p className="text-muted-foreground text-xs">
                      {t.shop.supportText}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Specifications */}
              {product.specifications && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      {t.shop.specificationsTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center"
                          >
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
