import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <FileQuestion className="h-10 w-10 text-primary" />,
    title: "01. Real Interview Questions",
    description: "Practice with authentic university-style questions, carefully designed to reflect what you’ll face in real interviews.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "02. Smart Proctoring",
    description: "With webcam checks and internet monitoring, you’ll experience a realistic interview environment.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "03. Track Your Growth",
    description: "Receive email reports after each attempt so you can see your progress and prepare with confidence.",
  },
];

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Features</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Why Choose Us?</h2>
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
