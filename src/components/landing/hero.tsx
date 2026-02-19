"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const xTransform = mousePosition.x * 0.02;
  const yTransform = mousePosition.y * 0.02;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const videoVariants = {
     hidden: { opacity: 0, scale: 0.95 },
     visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.6,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
        }
     }
  }


  return (
    <section
      className="w-full py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div 
            className="flex flex-col justify-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
              variants={itemVariants}
            >
              Experience the real CAS Shield interview with exact questions
            </motion.h1>
            <motion.p 
              className="max-w-[600px] text-muted-foreground md:text-xl flex flex-wrap items-center gap-x-2 gap-y-1"
              variants={itemVariants}
            >
              <span>Get anonymous mock interviews with engineers from</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24S8.955,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.904,36.639,44,30.825,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Google,
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 287.56 191" className="h-5 w-5">
                    <defs>
                        <style>{`.cls-1{fill:#0081fb;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}`}</style>
                        <linearGradient id="linear-gradient" x1="62.34" y1="101.45" x2="260.34" y2="91.45" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#0064e1"/>
                            <stop offset="0.4" stopColor="#0064e1"/>
                            <stop offset="0.83" stopColor="#0073ee"/>
                            <stop offset="1" stopColor="#0082fb"/>
                        </linearGradient>
                        <linearGradient id="linear-gradient-2" x1="41.42" y1="53" x2="41.42" y2="126" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#0082fb"/>
                            <stop offset="1" stopColor="#0064e0"/>
                        </linearGradient>
                    </defs>
                    <title>facebook-meta</title>
                    <path className="cls-1" d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z"/>
                    <path className="cls-2" d="M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z"/>
                    <path className="cls-3" d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z"/>
                </svg>
                Meta
              </span>
              <span>and more.</span>
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <Button size="lg" asChild className="font-bold">
                <Link href="/#pricing">Sign up</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="font-bold">
                <Link href="https://app.precasprep.com">Book a session</Link>
              </Button>
            </motion.div>
          </motion.div>
          <div className="flex items-center justify-center">
            <motion.div
              className="transition-transform duration-700 ease-out"
              style={{ transform: `translateX(${xTransform}px) translateY(${yTransform}px) scale(1.05)` }}
              variants={videoVariants}
              initial="hidden"
              animate="visible"
            >
              <video
                src="https://ovktxfetpzfduhecbjek.supabase.co/storage/v1/object/public/public-main-index/shadeer-hero.mp4"
                width="600"
                height="400"
                className="rounded-lg object-cover"
                autoPlay
                loop
                muted
                playsInline
                title="Promotional video for Precasprep showing app interface"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
