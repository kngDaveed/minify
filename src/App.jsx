import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import BottomNavBar from "./components/layout/BottomNavBar";
import Hero from "./components/Hero";
import MinifyForm from "./components/MinifyForm";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import WorkSteps from "./components/WorkSteps";
import Footer from "./components/layout/Footer";
import RedirectPage from "./pages/RedirectPage"; // You will create this

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BottomNavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <MinifyForm />
              <CTA />
              <WorkSteps />
              <FAQ />
              <Contact />
            </>
          }
        />
        <Route path="/p/:slug" element={<RedirectPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
