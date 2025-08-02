import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { supabase } from "@/lib/supabase";
import type { Product, Category } from "@/types";
import { hasSupabaseConfig } from "@/lib/supabase";
import {
  Phone,
  MessageSquare,
  Instagram,
  Music,
  Facebook,
  ShoppingBag,
  Truck,
  RefreshCw,
  HelpCircle,
  Send,
} from "lucide-react";
import DiscountPopup from "@/components/DiscountPopup";
export const dynamic = "force-dynamic";

interface HeroSection {
  id: string;
  title: string;
  subtitle?: string;
  background_image_url?: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
}

async function getFeaturedProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(4);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data || [];
}

async function getCategories(): Promise<Category[]> {
  if (!hasSupabaseConfig) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .in("slug", ["sunglasses", "bags", "watches", "accessories"]);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

async function getActiveHeroSection(): Promise<HeroSection | null> {
  if (!hasSupabaseConfig)
    return {
      id: "default",
      title: "Premium Style, Exceptional Quality",
      subtitle:
        "Discover our latest collection of premium clothing and accessories",
      background_image_url: "/placeholder.svg?height=600&width=1200",
      primary_button_text: "Shop Now",
      primary_button_link: "/products",
      secondary_button_text: "Browse Categories",
      secondary_button_link: "/categories",
    };

  const { data, error } = await supabase
    .from("hero_sections")
    .select("*")
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching hero section:", error);
    return {
      id: "default",
      title: "Premium Style, Exceptional Quality",
      subtitle:
        "Discover our latest collection of premium clothing and accessories",
      background_image_url: "/placeholder.svg?height=600&width=1200",
      primary_button_text: "Shop Now",
      primary_button_link: "/products",
      secondary_button_text: "Browse Categories",
      secondary_button_link: "/categories",
    };
  }

  return data;
}

export default async function HomePage() {
  const [featuredProducts, categories, heroSection] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getActiveHeroSection(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <DiscountPopup />
      {/* Hero Section - Full viewport height minus navigation */}
      <section
        className="relative bg-gray-900 text-white"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="absolute inset-0">
          <Image
            src={
              heroSection?.background_image_url ||
              "/placeholder.svg?height=600&width=1200"
            }
            alt="Hero background"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {heroSection?.title || "Premium Style, Exceptional Quality"}
            </h1>
            {heroSection?.subtitle && (
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                {heroSection.subtitle}
              </p>
            )}
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href={heroSection?.primary_button_link || "/products"}>
                  {heroSection?.primary_button_text || "Shop Now"}
                </Link>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link
                  href={heroSection?.secondary_button_link || "/categories"}
                >
                  {heroSection?.secondary_button_text || "Browse Categories"}
                </Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>
      {/* Perfume Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Perfume Collection
            </h2>
            <p className="text-lg text-gray-600">
              Discover fragrances tailored for every style and occasion
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {/* Men's Perfume */}
            <Link href="/categories/mens-perfumes" className="block group">
              <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 sm:h-72 w-full">
                    <Image
                      src="/men-perfume.jpg"
                      alt="Men's Perfume"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600">
                      Men's Perfume
                    </h3>
                    <p className="hidden sm:block text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                      Bold, fresh, and confident fragrances
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Women's Perfume */}
            <Link href="/categories/womens-perfumes" className="block group">
              <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 sm:h-72 w-full">
                    <Image
                      src="/women-perfume.jpg"
                      alt="Men's Perfume"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-pink-600">
                      Women's Perfume
                    </h3>
                    <p className="hidden sm:block text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                      Elegant, floral, and captivating scents
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>

          {/* Horizontal scroll on mobile, grid on larger screens */}
          <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 no-scrollbar -mx-4 px-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[70%] sm:min-w-0 flex-shrink-0 sm:flex-shrink"
              >
                <Card className="group hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-0">
                    <Link href={`/categories/${category.slug}`}>
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <Image
                          src={
                            category.image_url ||
                            "/placeholder.svg?height=300&width=300"
                          }
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="font-semibold text-xl group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-gray-600 mt-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked favorites from our latest collection
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <Link href={`/products/${product.slug}`}>
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <Image
                          src={
                            product.images[0] ||
                            "/placeholder.svg?height=300&width=300"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">
                            {product.price} EGP
                          </span>
                          {product.compare_price && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.compare_price} EGP
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No featured products available
              </p>
              <Button asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
 <section className="py-16 bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Style</h2>
    <p className="text-lg text-gray-300 mb-8">
      Subscribe to our newsletter for the latest updates and exclusive offers
    </p>
    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg text-gray-900"
      />
      <Button size="lg" className="w-full sm:w-auto">Subscribe</Button>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-6 gap-4 border-t">
            {/* Logo */}
            <Image
              src={"/whiff-wear-logo.png"}
              alt="Whiff Wear"
              width={80}
              height={80}
            />

            {/* Social Icons */}
            <div className="flex gap-4">
              {/* Phone */}
              <a
                href="tel:01097009218"
                className="text-gray-600 hover:text-gray-900"
              >
                <Phone className="h-5 w-5" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/201097009218"
                className="text-gray-600 hover:text-gray-900"
              >
                <Image src={"/whatsapp.png"} alt="" width={20} height={20} />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/whiffwear__"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram className="h-5 w-5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@whiff_wear"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Image src={"/tik-tok.png"} alt="" width={20} height={20} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/whiffwear"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Whiff Wear. Devloped by{" "}
              <a
                href="https://websity1.vercel.app/"
                target="_blank"
                className="hover:text-blue-600"
              >
                Websity
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
