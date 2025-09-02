// Server Component
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import "@/components/css/OrderSuccess.css";

export default function OrderSuccessPage() {
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <FaCheckCircle className="order-success-icon" />
        <h1 className="order-success-title">تم الطلب بنجاح!</h1>
        <p className="order-success-message">
          شكرًا لك، تم استقبال طلبك وسنقوم بالتواصل معك قريبًا.
        </p>
        <div className="order-success-actions">
          <Link href="/" className="order-success-button primary">
            العودة للرئيسية
          </Link>
          <Link
            href="/profile/orders"
            className="order-success-button secondary"
          >
            مشاهدة الطلبات
          </Link>
        </div>
      </div>
    </div>
  );
}
