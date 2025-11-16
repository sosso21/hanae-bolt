"use client";

import Image from "next/image";
import { useTransition, useMemo } from "react";
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
import { Star, Search, X, ArrowUpDown } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { BuyNowButton } from "@/components/cart/buy-now-button";
import { Locale, translations } from "@/lib/i18n";
import {
  getProductCategories,
  getFeaturedProducts,
  getLocalizedProducts,
} from "@/constants/products";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseAsString, parseAsArrayOf, useQueryStates } from "nuqs";

interface ShopContentProps {
  locale: Locale;
}

export function ShopContent({ locale }: ShopContentProps) {
  const [isPending, startTransition] = useTransition();
  const t = translations[locale];
  const featuredProducts = getFeaturedProducts(locale);
  const allProducts = getLocalizedProducts(locale);
  const productCategories = getProductCategories(locale);

  // Configuration des paramètres de recherche avec nuqs
  const [{ search, categories, sortBy }, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    sortBy: parseAsString.withDefault(""),
  });

  // Fonction pour filtrer et trier les produits
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filtrage par recherche textuelle
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filtrage par catégories
    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Tri des produits
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "newest":
            return b.id - a.id; // Supposant que l'ID plus élevé = plus récent
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [allProducts, search, categories, sortBy]);

  // Fonction pour gérer la recherche
  const handleSearchChange = (value: string) => {
    startTransition(() => {
      setFilters({ search: value });
    });
  };

  // Fonction pour gérer les catégories
  const handleCategoryToggle = (categoryId: string) => {
    startTransition(() => {
      const newCategories = categories.includes(categoryId)
        ? categories.filter((id) => id !== categoryId)
        : [...categories, categoryId];

      setFilters({ categories: newCategories });
    });
  };

  // Fonction pour gérer le tri
  const handleSortChange = (value: string) => {
    startTransition(() => {
      setFilters({ sortBy: value });
    });
  };

  // Fonction pour effacer tous les filtres
  const clearAllFilters = () => {
    startTransition(() => {
      setFilters({ search: "", categories: [], sortBy: "" });
    });
  };

  const hasActiveFilters = search.trim() || categories.length > 0 || sortBy;

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="mx-auto px-4 container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl">
                {t.shop.title}
              </h1>
              <p className="mb-8 text-muted-foreground text-xl">
                {t.shop.subtitle}
              </p>

              {/* Search and Filter */}
              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="top-3 left-3 absolute w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t.shop.searchPlaceholder}
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                  {search && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSearchChange("")}
                      className="top-1 right-1 absolute p-0 w-8 h-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <ArrowUpDown className="mr-2 w-4 h-4" />
                      <SelectValue placeholder={t.shop.sortBy} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">
                        {t.shop.sortOptions.newest}
                      </SelectItem>
                      <SelectItem value="price-asc">
                        {t.shop.sortOptions.priceAsc}
                      </SelectItem>
                      <SelectItem value="price-desc">
                        {t.shop.sortOptions.priceDesc}
                      </SelectItem>
                      <SelectItem value="name-asc">
                        {t.shop.sortOptions.nameAsc}
                      </SelectItem>
                      <SelectItem value="name-desc">
                        {t.shop.sortOptions.nameDesc}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      {t.shop.clearFilters}
                    </Button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {productCategories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={
                      categories.includes(category.id) ? "default" : "outline"
                    }
                    className={`hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer ${
                      categories.includes(category.id)
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    {category.name}
                    {categories.includes(category.id) && (
                      <X className="ml-1 w-3 h-3" />
                    )}
                  </Badge>
                ))}
              </div>

              {/* Résultats de recherche */}
              {hasActiveFilters && (
                <div className="mt-6 text-muted-foreground text-sm">
                  {filteredProducts.length === 0 ? (
                    <p>{t.shop.noResults}</p>
                  ) : (
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2">
                      <p>
                        {filteredProducts.length}{" "}
                        {filteredProducts.length === 1
                          ? "produit trouvé"
                          : "produits trouvés"}
                        {search && ` pour "${search}"`}
                        {categories.length > 0 &&
                          ` dans ${categories.length} catégorie${
                            categories.length > 1 ? "s" : ""
                          }`}
                      </p>
                      {sortBy && (
                        <p className="text-xs">
                          Trié par:{" "}
                          {t.shop.sortOptions[
                            sortBy as keyof typeof t.shop.sortOptions
                          ] || sortBy}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Products - Affiché seulement si aucun filtre actif */}
        {!hasActiveFilters && (
          <section className="py-20">
            <div className="mx-auto px-4 container">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-bold text-foreground text-3xl">
                  {t.shop.featuredTitle}
                </h2>
              </div>

              <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    productCategories={productCategories}
                    t={t}
                    featured={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Products / Filtered Results */}
        <section className={`py-20 ${!hasActiveFilters ? "bg-muted/30" : ""}`}>
          <div className="mx-auto px-4 container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-foreground text-3xl">
                {hasActiveFilters
                  ? t.shop.searchResults
                  : t.shop.allProductsTitle}
              </h2>
            </div>

            {isPending ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-muted-foreground text-lg">
                  {t.shop.searching}
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-muted-foreground text-lg">
                  {t.shop.noProductsFound}
                </div>
                <Button onClick={clearAllFilters} variant="outline">
                  {t.shop.viewAllProducts}
                </Button>
              </div>
            ) : (
              <div
                className={`gap-6 grid grid-cols-1 md:grid-cols-2 ${
                  hasActiveFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } ${isPending ? "opacity-50" : ""}`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    productCategories={productCategories}
                    t={t}
                    featured={false}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

function ProductCard({
  product,
  locale,
  productCategories,
  t,
  featured = false,
}: {
  product: any;
  locale: Locale;
  productCategories: readonly any[];
  t: any;
  featured?: boolean;
}) {
  return (
    <Link href={`/${locale}/shop/${product.slug}`}>
      <Card
        className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
          featured ? "overflow-hidden" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-video" : "aspect-square"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div
              className={`absolute ${
                featured ? "top-4 left-4" : "top-2 left-2"
              }`}
            >
              <Badge
                variant="destructive"
                className={featured ? "" : "text-xs"}
              >
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
          {featured && (
            <div className="top-4 right-4 absolute">
              <Badge variant={product.inStock ? "default" : "secondary"}>
                {product.inStock ? t.shop.inStockLabel : t.shop.outOfStockLabel}
              </Badge>
            </div>
          )}
        </div>

        {featured ? (
          <>
            <CardHeader>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                  <span className="text-muted-foreground text-sm">4.8</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm line-clamp-2">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
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
              <AddToCartButton
                product={product}
                locale={locale}
                className="flex-1"
              />
              <BuyNowButton
                product={product}
                locale={locale}
                className="flex-1"
              />
            </CardFooter>
          </>
        ) : (
          <>
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
                    productCategories.find((cat) => cat.id === product.category)
                      ?.name
                  }
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <AddToCartButton
                  product={product}
                  locale={locale}
                  size="sm"
                  className="flex-1"
                />
                <BuyNowButton
                  product={product}
                  locale={locale}
                  size="sm"
                  className="flex-1"
                />
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </Link>
  );
}
