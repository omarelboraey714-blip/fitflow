"use client";

export default function DashboardContent() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          رحلتك نحو الجسد المثالي
        </h2>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: "45%" }}
          ></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          أكملت 45% من خطتك الشهرية!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">مقالات مقترحة</h3>
          <ul className="space-y-2 text-blue-600 dark:text-blue-400">
            <li>كيف تبدأ نظام تغذية صحي</li>
            <li>تمارين منزلية بدون معدات</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">الخطط</h3>
          <p className="text-gray-600 dark:text-gray-300">
            مشترك في خطة: الأساسي
          </p>
        </div>
      </div>
    </div>
  );
}
