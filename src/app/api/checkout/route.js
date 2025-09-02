import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // 1. اقرأ البيانات من الطلب
    const body = await request.json();

    const { item, customer, paymentMethod, total } = body;

    // 2. تحقق من البيانات
    if (!item || !customer || !paymentMethod || !total) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    if (!customer.phone || !customer.name) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف مطلوبان" },
        { status: 400 }
      );
    }

    // 3. استخرج بيانات العميل
    const {
      name: customer_name,
      email: customer_email,
      phone: customer_phone,
      address: customer_address,
    } = customer;

    // 4. استخرج بيانات العنصر
    const item_price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^\d.-]/g, ""))
        : item.price;

    if (isNaN(item_price)) {
      return NextResponse.json({ error: "سعر غير صالح" }, { status: 400 });
    }

    // 5. أدخل الطلب في قاعدة البيانات
    const { error } = await supabase.from("orders").insert({
      item_type: item.type,
      item_id: item.id,
      item_name: item.name,
      item_price: item_price,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      payment_method: paymentMethod,
      status: "pending",
    });

    if (error) {
      console.error("خطأ في حفظ الطلب:", error);
      return NextResponse.json({ error: "فشل حفظ الطلب" }, { status: 500 });
    }

    // 6. أعد استجابة ناجحة
    return NextResponse.json({
      success: true,
      message: "تم حفظ الطلب بنجاح",
      orderId: "تم إنشاء الطلب", // في الواقع، Supabase يرجع `id` لو طلبت
    });
  } catch (err) {
    console.error("خطأ داخلي:", err);
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
// بعد أن تتأكد أن الطلب نُسخ بنجاح
if (!error) {
  // أرسل إيميل
  if (customer_email) {
    sendOrderConfirmation(customer_email, {
      customer_name,
      customer_email,
      item_name: item.name,
      item_price: item_price,
      payment_method: paymentMethod,
      id: result.data[0]?.id, // لو عرفت الـ id
    });
  }
}

// إعداد ناقل البريد (Gmail)
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // مثلاً: you@gmail.com
    pass: process.env.EMAIL_APP_PASS, // كلمة مرور التطبيق (App Password)
  },
});

// دالة لإرسال الإيميل
async function sendOrderConfirmation(to, orderData) {
  const { customer_name, item_name, item_price, payment_method } = orderData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `تم تأكيد طلبك في FitFlow - #${orderData.id || "معلق"}`,
    html: `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #1e3a8a;">مرحبًا ${customer_name}،</h2>
        <p>شكرًا لك على طلبك من <strong>FitFlow</strong>!</p>
        <p>تفاصيل طلبك:</p>
        <ul style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <li><strong>المنتج:</strong> ${item_name}</li>
          <li><strong>السعر:</strong> ${item_price} ر.س</li>
          <li><strong>طريقة الدفع:</strong> ${payment_method}</li>
          <li><strong>الحالة:</strong> قيد المعالجة</li>
        </ul>
        <p>سيتواصل معك أحد فريق الدعم قريبًا لتأكيد التفاصيل.</p>
        <hr style="border: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #666; font-size: 0.9em;">© ${new Date().getFullYear()} FitFlow. جميع الحقوق محفوظة.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ تم إرسال الإيميل بنجاح");
  } catch (error) {
    console.error("❌ فشل إرسال الإيميل:", error);
    // لا تُفشل الطلب لو الإيميل فشل
  }
}
