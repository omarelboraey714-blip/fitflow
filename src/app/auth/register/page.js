// Server Component
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/gym-blur.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10  dark:bg-black/50 p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl w-full mx-6 my-20">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
            FitFlow
          </h1>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            انضم إلى أقوى مجتمع رياضي
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            احصل على خطة تدريبية مخصصة ودعم مباشر من المدربين.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
