import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">تواصل معنا</h1>
          <p className="text-lg text-gray-600 mb-10">
            لدينا فريق دعم جاهز للإجابة على أي سؤال.
          </p>
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
