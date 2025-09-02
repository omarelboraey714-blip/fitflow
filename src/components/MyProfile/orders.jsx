// Server Component
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UserOrdersPage() {
  const supabase = createServerComponentClient({ cookies });
  const { session } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_phone", session.user.phone || session.user.email)
    .order("created_at", { ascending: false });

  if (error) {
    return <div>خطأ في تحميل الطلبات</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">طلباتي</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">ليس لديك طلبات بعد.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg p-6 bg-white text-gray-800"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{order.item_name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "success"
                      ? "bg-green-100 text-green-800"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status === "success" && "مكتمل"}
                  {order.status === "pending" && "قيد المعالجة"}
                  {order.status === "failed" && "فشلت"}
                </span>
              </div>
              <p>
                <strong>النوع:</strong> {order.item_type}
              </p>
              <p>
                <strong>السعر:</strong> {order.item_price} ر.س
              </p>
              <p>
                <strong>طريقة الدفع:</strong> {order.payment_method}
              </p>
              <p>
                <strong>التاريخ:</strong>{" "}
                {new Date(order.created_at).toLocaleDateString("ar-SA")}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/profile" className="text-blue-600 hover:underline">
          العودة إلى الملف الشخصي
        </Link>
      </div>
    </div>
  );
}
