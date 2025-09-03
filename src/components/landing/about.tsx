import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Repeat, LayoutDashboard, Zap, BarChart, Send, NotebookText, Bot } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const features = [
  {
    icon: <NotebookText className="h-8 w-8 text-primary" />,
    title: "Real Interview Questions",
    description: "Practice with authentic university-style questions, carefully designed to reflect what you’ll face in real interviews.",
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
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Smart Proctoring",
    description: "With webcam checks and internet monitoring, you’ll experience a realistic interview environment.",
    image: null,
  },
  {
    icon: <Repeat className="h-8 w-8 text-primary" />,
    title: "Track Your Growth",
    description: "Receive email reports after each attempt so you can see your progress and prepare with confidence.",
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

const integrations = [
    {
      name: "Alex Hales",
      email: "alexhales@gmail.com",
      avatar: "https://picsum.photos/100/100?random=4",
      aiHint: "man portrait"
    },
    {
      name: "Mathew Faris",
      email: "mathewfaris@gmail.com",
      avatar: "https://picsum.photos/100/100?random=5",
      aiHint: "man portrait"
    },
    {
      name: "Georgia",
      email: "georgia@gmail.com",
      avatar: "https://picsum.photos/100/100?random=6",
      aiHint: "woman portrait"
    },
]

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Why Choose Us?</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">The Ultimate Interview Prep Tool</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers a comprehensive suite of features designed to help you ace your university interviews.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className={`flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl ${feature.className || ''}`}>
              {feature.title === 'Seamless Integrations' ? (
                 <div className="aspect-video overflow-hidden bg-[#111119] p-4 flex flex-col justify-center gap-2">
                    {integrations.map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <Image src={integration.avatar} alt={integration.name} width={100} height={100} data-ai-hint={integration.aiHint} />
                                    <AvatarFallback>{integration.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-white">{integration.name}</p>
                                    <p className="text-xs text-gray-400">{integration.email}</p>
                                </div>
                            </div>
                            <div className="p-2 rounded-full bg-black/30">
                                <Send className="h-4 w-4 text-white -rotate-45" />
                            </div>
                        </div>
                    ))}
                 </div>
              ) : feature.image && (
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
              <CardHeader className="flex-row items-start gap-4">
                {feature.icon}
                <div className="flex-1">
                  <CardTitle>{feature.title}</CardTitle>
                  <p className="text-muted-foreground pt-2">{feature.description}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
