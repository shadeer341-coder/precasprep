import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Camera, BarChart } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI-Driven Prep",
    description: "Receive intelligent feedback on your answers, tone, and body language from our advanced AI.",
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "Camera Validation",
    description: "Practice with your camera on to get used to virtual interviews and receive feedback on your presence.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Structured Feedback",
    description: "Get detailed reports on your strengths, weaknesses, and areas for improvement after each session.",
  },
];

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Features</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Why Choose InterviewAce?</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide the tools you need to walk into your university interviews with confidence.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 pt-12">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
