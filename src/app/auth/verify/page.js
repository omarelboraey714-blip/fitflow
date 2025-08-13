// app/auth/confirm/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("جاري التحقق...");

  useEffect(() => {
    const confirm = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      // تأكد من نوع التحقق
      if (type !== "confirmation" || !token) {
        setStatus("error");
        setMessage("رابط غير صالح أو منتهي الصلاحية.");
        return;
      }

      // استخدم Supabase علشان تؤكد الـ OTP
      const { error } = await supabase.auth.verifyOtp({
        token,
        type: "email", // type: 'email' للتأكيد
      });

      if (error) {
        console.error("Verification Error:", error);
        setStatus("error");
        setMessage("فشل التحقق. قد يكون الرابط منتهي الصلاحية.");
      } else {
        setStatus("success");
        setMessage("تم تفعيل الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
      }
    };

    confirm();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md text-center">
        {status === "loading" && (
          <div className="text-blue-600 flex items-center justify-center">
            🔄 جاري التحقق...
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600">✅ {message}</div>
        )}
        {status === "error" && <div className="text-red-600">❌ {message}</div>}
        <br />
        <a
          href="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          العودة لتسجيل الدخول
        </a>
      </div>
    </div>
  );
}
