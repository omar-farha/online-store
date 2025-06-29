import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";
import { hasSupabaseConfig } from "@/lib/supabase";

async function getProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600">Discover our complete collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg flex items-center justify-center bg-gray-100">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.is_featured && (
                      <Badge className="absolute top-2 left-2">Featured</Badge>
                    )}
                    {product.compare_price &&
                      product.compare_price > product.price && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          Sale
                        </Badge>
                      )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          {product.price} EGP
                        </span>
                        {product.compare_price &&
                          product.compare_price > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.compare_price} EGP
                            </span>
                          )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.stock_quantity > 0 ? (
                          <span className="text-green-600">In Stock</span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Products Found
            </h2>
            <p className="text-gray-600">Check back later for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  );
}
