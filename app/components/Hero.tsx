'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float, Text3D, Center } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import ParallaxSection from './ParallaxSection'

function SithaphalModel() {
  const meshRef = useRef<any>()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={[2.5, 2.5, 2.5]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#22c55e" 
          roughness={0.2} 
          metalness={0.3}
          emissive="#16a34a"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  )
}

function FloatingElements() {
  return (
    <>
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
            scale={0.1 + Math.random() * 0.1}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#4ade80" 
              transparent 
              opacity={0.6}
              emissive="#22c55e"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-300 rounded-full opacity-30 floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400 rounded-full opacity-25 floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
      >
        <AnimatedSection animation="slideLeft" delay={0.2}>
          <div className="text-center lg:text-left">
            <motion.h1 
              className="text-6xl lg:text-8xl font-playfair text-green-800 mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Premium
              <span className="block text-gradient pulse-glow">Sithaphal</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Experience the authentic taste of nature's sweetest gift. Our premium custard apples are carefully selected for their exceptional quality and flavor.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="slideRight" delay={0.4}>
          <div className="h-96 lg:h-[600px] relative">
            <Canvas 
              camera={{ position: [0, 0, 8], fov: 45 }}
              shadows
              className="rounded-2xl"
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />
              <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.8}
                castShadow
                color="#22c55e"
              />
              
              <Suspense fallback={null}>
                <SithaphalModel />
                <FloatingElements />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={1}
                  enablePan={false}
                />
              </Suspense>
            </Canvas>
            
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-2xl pointer-events-none"></div>
          </div>
        </AnimatedSection>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}
