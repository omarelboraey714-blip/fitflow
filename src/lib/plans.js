// lib/plans.js
export const membershipPlans = [
  {
    name: "العضوية الشهرية",
    price: "99 ج.م/شهر",
    subtitle: "للمبتدئين",
    gradient: "linear-gradient(135deg, #1e40af, #3730a3)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    features: ["دخول يومي", "استخدام الأجهزة", "تدريبات إرشادية"],
  },
  {
    name: "العضوية ربع سنوية",
    price: "270 ج.م/3 أشهر",
    subtitle: "الأكثر شيوعًا",
    gradient: "linear-gradient(135deg, #059669, #166534)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    features: ["دخول يومي", "تدريب شخصي", "خصومات على المنتجات"],
  },
  {
    name: "العضوية السنوية",
    price: "999 ج.م/سنة",
    subtitle: "وفر 20%",
    gradient: "linear-gradient(135deg, #c2410c, #9a3412)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.165-2.052-.48-3.003z"
        />
      </svg>
    ),
    features: ["دخول يومي", "تدريب شخصي", "ورش عمل", "هدية سنوية"],
  },
  {
    name: "العضوية VIP",
    price: "1500 ج.م/شهر",
    subtitle: "للمحترفين",
    gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    features: [
      "دخول يومي",
      "تدريب شخصي",
      "ورش عمل",
      "تغذية مخصصة",
      "استشارات شهرية",
    ],
  },
];
