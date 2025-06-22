import { useState } from 'react'
import Navbar from './components/layout/Navbar';
import BottomNavBar from './components/layout/BottomNavBar';
import Hero from './components/Hero';
import MinifyForm from './components/MinifyForm';
import CTA from './components/CTA';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import WorkSteps from './components/WorkSteps';
// import About from './components/About';
// import Advantages from './components/Advantages';

import Footer from './components/layout/Footer';

import './App.css'

function App() {

  return (
        <div className="min-h-screen">
          <Navbar />
          <BottomNavBar />
          <main>
            <Hero />
            <MinifyForm />
            <CTA />
            {/* <About /> */}
            {/* <Advantages /> */}
            <WorkSteps />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      )
}

export default App
