"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const testimonials = [
  {
    quote: "Precasprep was a game-changer. The AI feedback helped me pinpoint exactly where I was going wrong. I got into my dream university!",
    name: "Sarah L.",
    title: "Student, Stanford University",
    avatar: "SL",
    image: "https://picsum.photos/100/100?random=1",
    ai_hint: "woman portrait"
  },
  {
    quote: "As a college counselor, I recommend this to all my students. The platform is intuitive and the feedback is incredibly valuable.",
    name: "Michael Chen",
    title: "College Counselor",
    avatar: "MC",
    image: "https://picsum.photos/100/100?random=2",
    ai_hint: "man portrait"
  },
  {
    quote: "The camera validation feature is brilliant. It helped me get comfortable with the virtual format and improve my on-screen presence.",
    name: "Jessica P.",
    title: "Student, MIT",
    avatar: "JP",
    image: "https://picsum.photos/100/100?random=3",
    ai_hint: "woman portrait"
  },
  {
    quote: "Our agency uses Precasprep to prepare our clients. The results speak for themselves - higher acceptance rates across the board.",
    name: "David R.",
    title: "Director, Apex Admissions",
    avatar: "DR",
    image: "https://picsum.photos/100/100?random=4",
    ai_hint: "man portrait"
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-card">
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
        <div className="pt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.name} className="md:basis-1/2">
                  <div className="p-4">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col items-start justify-between h-full gap-4">
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
