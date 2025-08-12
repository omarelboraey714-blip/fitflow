import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "sonner"; // ← import Toaster
import "./globals.css";

export const metadata = {
  title: {
    default: "FitFlow | منصة اللياقة والصحة للسعوديين",
    template: "%s | FitFlow",
  },
  description:
    "ابدأ رحلتك نحو جسم مثالي مع خطط تدريب وتغذية مخصصة من FitFlow. مناسب للمبتدئين والمحترفين في المملكة العربية السعودية.",
  keywords: [
    "لياقة بدنية",
    "تمارين منزلية",
    "نظام غذائي",
    "تدريب شخصي",
    "تطبيق لياقة",
    "تمارين للنساء",
    "تمارين للرجال",
    "لياقة في السعودية",
  ],
  authors: [{ name: "FitFlow Team" }],
  creator: "FitFlow",
  openGraph: {
    title: "FitFlow | منصة اللياقة والصحة للسعوديين",
    description: "خطط تدريب وتغذية مخصصة لك. ابدأ رحلتك اليوم مع FitFlow.",
    url: "https://fitflow-sa.vercel.app",
    siteName: "FitFlow",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FitFlow - منصة اللياقة والصحة",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitFlow | منصة اللياقة والصحة للسعوديين",
    description: "ابدأ رحلتك نحو جسم مثالي مع خطط تدريب وتغذية مخصصة.",
    images: ["/images/og-image.jpg"],
    site: "@FitFlowKSA",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://fitflow-sa.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Sonner Toaster - يظهر في كل الصفحات */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          dir="rtl"
          theme="light" // استخدم "dark" لو عندك Dark Mode
          toastOptions={{
            duration: 3000,
            success: {
              style: { background: "#16a34a", color: "white" },
              icon: "✅",
            },
            error: {
              style: { background: "#dc2626", color: "white" },
              icon: "❌",
            },
            warning: {
              style: { background: "#d97706", color: "white" },
              icon: "⚠️",
            },
          }}
        />
      </body>
    </html>
  );
}
