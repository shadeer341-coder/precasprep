import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Repeat, LayoutDashboard, Zap, BarChart } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: "All-in-One Dashboard",
    description: "Manage everything from a single, intuitive interface.",
    image: "https://picsum.photos/600/400?random=1",
    aiHint: "dashboard analytics",
    className: "lg:col-span-2",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Seamless Integrations",
    description: "Connect effortlessly with others.",
    image: "https://picsum.photos/600/400?random=2",
    aiHint: "people avatars",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Team Collaboration",
    description: "Built-in communication & sharing.",
    image: null,
  },
  {
    icon: <Repeat className="h-8 w-8 text-primary" />,
    title: "Regular Updates",
    description: "Continuous improvements & new features.",
    image: null,
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Real-Time Analytics",
    description: "Drive decisions with powerful insights.",
    image: "https://picsum.photos/600/400?random=3",
    aiHint: "analytics chart",
  },
];

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">The Story of Our Growth & Impact</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              With every milestone, we continue to drive real impact—helping companies scale, streamline, and succeed.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className={`flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl ${feature.className || ''}`}>
              {feature.image && (
                <div className="aspect-video overflow-hidden">
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    width={600} 
                    height={400} 
                    data-ai-hint={feature.aiHint || ""}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader className="flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}