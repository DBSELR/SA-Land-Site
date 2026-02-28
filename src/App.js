import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegistrationPage from "./pages/RegistrationPage";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import TermsConditions from "./pages/TermsConditions";
import WhatsAppButton from "./components/WhatsAppButton";
import CourseDetail from "./pages/CourseDetail";
import PaymentResult from "./pages/PaymentResult";
import BookDemoPage from "./pages/BookDemoPage";
import AboutSection from "./components/home/AboutSection";
import ContactUsPage from "./components/home/ContactUsPage";


function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
 <Route path="/contact" element={<ContactUsPage />} />
 
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/book-demo" element={<BookDemoPage />} />

        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </Router>
  );
}

export default App;
