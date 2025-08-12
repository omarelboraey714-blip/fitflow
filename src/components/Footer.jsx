"use client";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">FitFlow</h3>
          <p className="text-gray-400">منصتك الشاملة للوصول إلى جسم أحلامك.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#home" className="hover:text-white transition">
                الرئيسية
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition">
                المميزات
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-white transition">
                العملاء
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">تواصل معنا</h4>
          <p className="text-gray-400">support@fitflow.sa</p>
          <p className="text-gray-400">+966 5X XXX XXXX</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-800">
        &copy; 2025 FitFlow. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
