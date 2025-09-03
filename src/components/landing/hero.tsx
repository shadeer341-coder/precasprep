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
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-accent"
              variants={itemVariants}
            >
              Practice and ace interviews
            </motion.h1>
            <motion.p 
              className="max-w-[600px] text-gray-400 md:text-xl"
              variants={itemVariants}
            >
              Get anonymous mock interviews with engineers from Google, Meta, and more.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <Button size="lg" asChild className="font-bold">
                <Link href="/practice">Get started for free</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="font-bold">
                <Link href="#">Book a session</Link>
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
                src="https://ovktxfetpzfduhecbjek.supabase.co/storage/v1/object/public/public-main-index/hero-02.mp4"
                width="600"
                height="400"
                className="rounded-lg object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
