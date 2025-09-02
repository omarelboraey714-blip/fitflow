"use client";

export default function SocialLogin() {
  const handleSocialLogin = (provider) => {
    alert(`تسجيل دخول بـ ${provider} (في الإصدار الكامل)`);
  };

  return (
    <div className="space-y-3 mt-6">
      <p className="text-center text-gray-400 text-sm">
        أو سجل الدخول باستخدام
      </p>
      <div className="flex justify-center gap-4">
        {[
          { name: "Google", icon: "🔍", color: "hover:bg-red-500" },
          { name: "Facebook", icon: "f", color: "hover:bg-blue-600" },
          { name: "Apple", icon: "🍎", color: "hover:bg-gray-800" },
        ].map((social) => (
          <button
            key={social.name}
            type="button"
            onClick={() => handleSocialLogin(social.name)}
            className={`w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg ${social.color} transition transform hover:scale-110`}
            aria-label={`تسجيل الدخول بـ ${social.name}`}
          >
            {social.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
