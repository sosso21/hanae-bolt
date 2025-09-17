import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Filter, Search } from "lucide-react";
import { locales, Locale, translations } from "@/lib/i18n";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  getFeaturedProducts,
} from "@/constants/products";
import { HANAE_INFO } from "@/constants";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    title: `Boutique - ${HANAE_INFO.name}`,
    description:
      "Découvrez nos services, formations et templates pour booster votre présence digitale.",
    alternates: {
      canonical: `/${locale}/shop`,
      languages: {
        fr: "/fr/shop",
        en: "/en/shop",
        ar: "/ar/shop",
      },
    },
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = translations[locale];
  const featuredProducts = getFeaturedProducts();

  const shopTitle = "Notre Boutique";
  const shopSubtitle =
    "Services, formations et outils pour développer votre activité";
  const featuredTitle = "Produits en vedette";
  const allProductsTitle = "Tous nos produits";
  const addToCartLabel = "Ajouter au panier";
  const viewDetailsLabel = "Voir les détails";
  const inStockLabel = "En stock";
  const outOfStockLabel = "Rupture de stock";
  const fromLabel = "À partir de";

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl">
                {shopTitle}
              </h1>
              <p className="mb-8 text-muted-foreground text-xl">
                {shopSubtitle}
              </p>

              {/* Search and Filter */}
              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="top-3 left-3 absolute w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="bg-background px-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full text-sm"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtrer
                </Button>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Badge
                    key={category.id}
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="mx-auto px-4 container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-foreground text-3xl">
                {featuredTitle}
              </h2>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg overflow-hidden transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
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
                    <div className="top-4 right-4 absolute">
                      <Badge
                        variant={product.inStock ? "default" : "secondary"}
                      >
                        {product.inStock ? inStockLabel : outOfStockLabel}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                        <span className="text-muted-foreground text-sm">
                          4.8
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 text-muted-foreground text-sm line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-primary text-2xl">
                        {product.price}€
                      </span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground text-sm line-through">
                          {product.originalPrice}€
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Button className="flex-1" disabled={!product.inStock}>
                      <ShoppingCart className="mr-2 w-4 h-4" />
                      {addToCartLabel}
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/${locale}/shop/${product.slug}`}>
                        {viewDetailsLabel}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto px-4 container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-foreground text-3xl">
                {allProductsTitle}
              </h2>
            </div>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <div className="top-2 left-2 absolute">
                        <Badge variant="destructive" className="text-xs">
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

                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold text-sm line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-primary">
                          {product.price}€
                        </span>
                        {product.originalPrice && (
                          <span className="text-muted-foreground text-xs line-through">
                            {product.originalPrice}€
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {
                          PRODUCT_CATEGORIES.find(
                            (cat) => cat.id === product.category
                          )?.name
                        }
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      size="sm"
                      className="w-full"
                      disabled={!product.inStock}
                      asChild
                    >
                      <Link href={`/${locale}/shop/${product.slug}`}>
                        {viewDetailsLabel}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
