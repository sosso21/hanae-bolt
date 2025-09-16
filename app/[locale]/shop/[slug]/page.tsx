import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Star, 
  ArrowLeft, 
  Check, 
  Clock, 
  Shield,
  Truck
} from "lucide-react";
import { locales, Locale } from "@/lib/i18n";
import { PRODUCTS, getProductBySlug } from "@/constants/products";
import { HANAE_INFO } from "@/constants";

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

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return {
    title: `${product.name} - Boutique ${HANAE_INFO.name}`,
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

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const backToShopLabel = "Retour à la boutique";
  const addToCartLabel = "Ajouter au panier";
  const buyNowLabel = "Acheter maintenant";
  const inStockLabel = "En stock";
  const outOfStockLabel = "Rupture de stock";
  const specificationsTitle = "Spécifications";
  const guaranteeTitle = "Garantie qualité";
  const guaranteeText = "Satisfait ou remboursé sous 30 jours";
  const deliveryTitle = "Livraison rapide";
  const deliveryText = "Livraison sous 24-48h";
  const supportTitle = "Support inclus";
  const supportText = "Support technique gratuit";

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        <div className="mx-auto px-4 py-8 container">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/${locale}/shop`} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {backToShopLabel}
              </Link>
            </Button>
          </div>

          <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <div className="top-4 left-4 absolute">
                    <Badge variant="destructive">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="gap-2 grid grid-cols-4">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                    <span className="ml-2 text-muted-foreground text-sm">(4.8)</span>
                  </div>
                </div>

                <h1 className="mb-4 font-bold text-3xl text-foreground">
                  {product.name}
                </h1>

                <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-3xl text-primary">
                      {product.price}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground text-xl line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? inStockLabel : outOfStockLabel}
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
                <Button 
                  size="lg" 
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  {addToCartLabel}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  {buyNowLabel}
                </Button>
              </div>

              {/* Features */}
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="font-medium">{guaranteeTitle}</p>
                    <p className="text-muted-foreground text-xs">{guaranteeText}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{deliveryTitle}</p>
                    <p className="text-muted-foreground text-xs">{deliveryText}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="font-medium">{supportTitle}</p>
                    <p className="text-muted-foreground text-xs">{supportText}</p>
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
                      {specificationsTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
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