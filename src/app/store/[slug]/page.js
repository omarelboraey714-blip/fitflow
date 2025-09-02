// Server Component
import ProductHero from "@/components/Store/ProductDetails/ProductHero";
import ProductTabs from "@/components/Store/ProductDetails/ProductTabs";
import ProductReviews from "@/components/Store/ProductDetails/ProductReviews";
import ProductSpecs from "@/components/Store/ProductDetails/ProductSpecs";
import RelatedProducts from "@/components/Store/ProductDetails/RelatedProducts";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // جلب المنتج
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) {
    return <div className="p-8 text-red-500">المنتج غير موجود</div>;
  }

  // جلب التقييمات
  const { data: reviews, error: reviewsError } = await supabase
    .from("product_reviews")
    .select("user_name, rating, comment, created_at")
    .eq("product_id", product.id)
    .order("created_at", { ascending: false });

  // حساب التقييم المتوسط
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "جديد";

  // منتجات مقترحة (نفس الفئة)
  const { data: related, error: relatedError } = await supabase
    .from("products")
    .select("id, name, price, image, slug, rating")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ProductHero product={product} avgRating={avgRating} />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <ProductTabs product={product} />
        <ProductSpecs specs={product.specs} />
        <ProductReviews reviews={reviews} productId={product.id} />
        <RelatedProducts products={related} />
      </div>
      <AddToCartButton product={product} />
    </div>
  );
}

// توليد slugs لكل المنتجات
export async function generateStaticParams() {
  const { data: products, error } = await supabase
    .from("products")
    .select("slug");

  if (error || !products) {
    return []; // fallback
  }

  return products.map((p) => ({ slug: p.slug }));
}
