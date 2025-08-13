// app/api/auth/resend-otp/route.js
import { generateOTP, saveOTP } from "@/lib/otp";

// تخزين مؤقت (في الذاكرة) للإرسالات (Rate Limiting)
const otpRequests = new Map();

function isRateLimited(email) {
  const now = Date.now();
  const window = 60 * 1000; // 1 دقيقة
  const maxAttempts = 3;

  if (!otpRequests.has(email)) {
    otpRequests.set(email, []);
  }

  const requests = otpRequests.get(email).filter((t) => t > now - window);
  otpRequests.set(email, requests);

  if (requests.length >= maxAttempts) return true;

  requests.push(now);
  return false;
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (isRateLimited(email)) {
      return Response.json(
        { success: false, message: "تم تجاوز عدد المحاولات. انتظر دقيقة." },
        { status: 429 }
      );
    }

    const otp = generateOTP();
    const saved = await saveOTP(email, otp);

    if (!saved) {
      return Response.json(
        { success: false, message: "فشل في إرسال الكود" },
        { status: 500 }
      );
    }

    // هنا ممكن تستخدم خدمة إرسال إيميل (مثل Resend, SendGrid)
    // ده مثال وهمي
    console.log(`OTP for ${email}: ${otp}`);

    return Response.json(
      { success: true, message: "تم إرسال الكود إلى بريدك الإلكتروني." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Resend OTP Error:", err);
    return Response.json(
      { success: false, message: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
