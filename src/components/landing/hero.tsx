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
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001.001C5.373.001 0 5.374 0 12.001s5.373 12 12.001 12c6.627 0 12-5.373 12-12S18.628.001 12.001.001zM8.62 17.88c-.31 0-.62-.05-.92-.15-1.12-.37-1.89-1.4-1.89-2.6 0-.25.03-.49.08-.73l.6-2.65c.23-1 .9-2.42 2.05-3.32.19-.15.42-.23.66-.23.36 0 .7.15.95.4l1.6 1.6c.5.5.78 1.18.78 1.88 0 1.47-1.19 2.67-2.67 2.67-.02 0-.03 0-.05-.001zm6.76-11.76c.31 0 .62.05.92.15 1.12.37 1.89 1.4 1.89 2.6 0 .25-.03.49-.08.73l-.6 2.65c-.23 1-.9 2.42-2.05 3.32-.19-.15-.42-.23-.66-.23-.36 0-.7-.15-.95-.4l-1.6-1.6c-.5-.5-.78-1.18-.78-1.88 0-1.47 1.19-2.67 2.67-2.67.02 0 .03 0 .05.001z"></path>
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
