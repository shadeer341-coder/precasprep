
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Precasprep was a game-changer. The AI feedback helped me pinpoint exactly where I was going wrong. I got into my dream university!",
    name: "Sarah L.",
    title: "Student, Stanford University",
    avatar: "SL",
    image: "https://picsum.photos/100/100?random=1",
    ai_hint: "woman portrait",
    rating: 5,
  },
  {
    quote: "As a college counselor, I recommend this to all my students. The platform is intuitive and the feedback is incredibly valuable.",
    name: "Michael Chen",
    title: "College Counselor",
    avatar: "MC",
    image: "https://picsum.photos/100/100?random=2",
    ai_hint: "man portrait",
    rating: 5,
  },
  {
    quote: "The camera validation feature is brilliant. It helped me get comfortable with the virtual format and improve my on-screen presence.",
    name: "Jessica P.",
    title: "Student, MIT",
    avatar: "JP",
    image: "https://picsum.photos/100/100?random=3",
    ai_hint: "woman portrait",
    rating: 4,
  },
  {
    quote: "Our agency uses Precasprep to prepare our clients. The results speak for themselves - higher acceptance rates across the board.",
    name: "David R.",
    title: "Director, Apex Admissions",
    avatar: "DR",
    image: "https://picsum.photos/100/100?random=4",
    ai_hint: "man portrait",
    rating: 5,
  },
  {
    quote: "The instant feedback is what makes this tool so powerful. I could practice a question and immediately see how to improve.",
    name: "Emily White",
    title: "Student, Yale University",
    avatar: "EW",
    image: "https://picsum.photos/100/100?random=5",
    ai_hint: "woman portrait",
    rating: 5,
  },
  {
    quote: "An essential tool for any student serious about their university applications. The question bank is extensive and very relevant.",
    name: "James Brown",
    title: "High School Principal",
    avatar: "JB",
    image: "https://picsum.photos/100/100?random=6",
    ai_hint: "man portrait",
    rating: 4,
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <Card className="flex-shrink-0 w-80 mx-4">
    <CardContent className="p-6 flex flex-col items-start justify-between h-full gap-4">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`} />
        ))}
      </div>
      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
      <div className="flex items-center gap-4 pt-4">
        <Avatar className="h-12 w-12">
          <Image src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.ai_hint} width={100} height={100} />
          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);


export function Testimonials() {
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Reviews</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from students and educators who have found success with Precasprep.
            </p>
          </div>
        </div>
        <div className="relative mt-12 overflow-hidden">
          <div className="flex animate-scroll-left [animation-duration:40s] hover:[animation-play-state:paused]">
            {[...firstRow, ...firstRow].map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="flex animate-scroll-right [animation-duration:40s] mt-8 hover:[animation-play-state:paused]">
            {[...secondRow, ...secondRow].map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
