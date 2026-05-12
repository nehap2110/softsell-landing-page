import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F19]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      <motion.div
        className="relative flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shadow-brand-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display text-2xl font-bold text-white">SoftSell</span>
        </div>

        {/* Loader dots */}
        <div className="flex items-center gap-2">
          <div className="loader-dot w-2 h-2 rounded-full bg-brand-primary" />
          <div className="loader-dot w-2 h-2 rounded-full bg-brand-primary" />
          <div className="loader-dot w-2 h-2 rounded-full bg-brand-primary" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#0B0F19] overflow-x-hidden"
          >
            <Navbar />
            <main>
              <Hero />
              <HowItWorks />
              <WhyChooseUs />
              <Testimonials />
              <ContactForm />
            </main>
            <Footer />
            <ChatWidget />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}