// Server Component
import StoreHero from "@/components/Store/StoreHero";
import CategoriesSection from "@/components/Store/CategoriesSection";
import ProductsGrid from "@/components/Store/ProductsGrid";
import SpecialOffers from "@/components/Store/SpecialOffers";
import BestSellers from "@/components/Store/BestSellers";
import Recommended from "@/components/Store/Recommended";
import CustomerReviews from "@/components/Store/CustomerReviews";
import StoreCTA from "@/components/Store/StoreCTA";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function StorePage({ searchParams }) {
  const { category, q } = await searchParams; // ✅ await على searchParams

  let query = supabase.from("products").select("*");

  if (category) query = query.eq("category", category);
  if (q) query = query.ilike("name", `%${q}%`);

  const { data: products, error } = await query;

  if (error || !products) {
    console.error("فشل جلب المنتجات:", error);
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <p className="text-red-400">حدث خطأ أثناء تحميل المتجر</p>
      </div>
    );
  }

  // ✅ جلب الأفضل مبيعًا
  const { data: bestSellers } = await supabase
    .from("products")
    .select("*")
    .eq("is_best_seller", true);

  // ✅ المقترحات
  const recommended = products.filter((p) => p.rating >= 4).slice(0, 2);

  // ✅ آراء العملاء
  const reviews = [
    {
      name: "سارة",
      text: "الجودة عالية جدًا، التيشيرت مريح وعملي في التمرين",
      rating: 5,
    },
    { name: "أحمد", text: "البروتين فعال وطعمه لذيذ، أنصح به", rating: 5 },
    {
      name: "نور",
      text: "الشنطة عملية وتحمل كل حاجة، خاماتها قوية",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <StoreHero />
      <CategoriesSection products={products} />
      <ProductsGrid products={products} />
      <SpecialOffers />
      <BestSellers products={bestSellers} />
      <Recommended products={recommended} />
      <CustomerReviews reviews={reviews} />
      <StoreCTA />
    </div>
  );
}
