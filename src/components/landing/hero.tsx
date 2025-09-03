"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

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

  return (
    <section
      className="w-full py-20 md:py-32 lg:py-40"
      style={{ background: 'linear-gradient(12deg, rgb(1 2 3) 60%, rgb(38 56 71) 100%)' }}
    >
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
              Practice and ace interviews
            </h1>
            <p className="max-w-[600px] text-gray-400 md:text-xl">
              Get anonymous mock interviews with engineers from Google, Meta, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="font-bold">
                <Link href="/practice">Get started for free</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="font-bold">
                <Link href="#">Book a session</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="transition-transform duration-700 ease-out"
              style={{ transform: `translateX(${xTransform}px) translateY(${yTransform}px) scale(1.05)` }}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
