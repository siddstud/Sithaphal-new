'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import RecipeSection from './components/RecipeSection'
import Footer from './components/Footer'
import CartModal from './components/CartModal'
import RecipeModal from './components/RecipeModal'
import PaymentModal from './components/PaymentModal'
import ChatBot from './components/ChatBot'
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Features />
        <Testimonials />
        <RecipeSection />
      </main>
      <Footer />
      <CartModal />
      <RecipeModal />
      <PaymentModal />
      <ChatBot />
    </div>
  )
}
