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
        <div className="mx-auto grid max-w-5xl gap-6 pt-12 lg:grid-cols-5 lg:gap-8">
          <Card className="relative group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] lg:col-span-3">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-25 transition duration-500 group-hover:opacity-60 group-hover:blur-3xl"></div>
            <div className="relative bg-card rounded-lg h-full flex flex-col">
                <div className="aspect-video overflow-hidden rounded-lg m-2 relative">
                  <Image 
                    src="https://picsum.photos/600/400?random=1" 
                    alt="Real Interview Questions" 
                    width={600} 
                    height={400} 
                    data-ai-hint="dashboard analytics"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <CardHeader className="flex-row items-start gap-4">
                  <NotebookText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <CardTitle>Real Interview Questions</CardTitle>
                    <p className="text-muted-foreground pt-2">Practice with authentic university-style questions, carefully designed to reflect what you’ll face in real interviews.</p>
                  </div>
                </CardHeader>
            </div>
          </Card>

          <Card className="relative group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] lg:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-25 transition duration-500 group-hover:opacity-60 group-hover:blur-3xl"></div>
            <div className="relative bg-card rounded-lg h-full flex flex-col">
              <div className="flex-grow aspect-video overflow-hidden bg-[#111119] p-4 flex flex-col justify-center gap-2">
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
              <CardHeader className="flex-row items-start gap-4">
                <Zap className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <CardTitle>Seamless Integrations</CardTitle>
                  <p className="text-muted-foreground pt-2">Connect effortlessly with others.</p>
                </div>
              </CardHeader>
            </div>
          </Card>
          
          <div className="lg:col-span-5 grid lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 grid gap-8">
              <Card className="relative group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-25 transition duration-500 group-hover:opacity-60 group-hover:blur-3xl"></div>
                <div className="relative bg-card rounded-lg h-full flex flex-col">
                    <CardHeader className="flex-row items-center gap-4 flex-1">
                      <div className="flex-1">
                        <CardTitle>Smart Proctoring</CardTitle>
                        <p className="text-muted-foreground pt-2">With webcam checks and internet monitoring, you’ll experience a realistic interview environment.</p>
                      </div>
                      <Bot className="h-8 w-8 text-primary" />
                    </CardHeader>
                </div>
              </Card>
              <Card className="relative group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-25 transition duration-500 group-hover:opacity-60 group-hover:blur-3xl"></div>
                <div className="relative bg-card rounded-lg h-full flex flex-col">
                    <CardHeader className="flex-row items-center gap-4 flex-1">
                       <div className="flex-1">
                        <CardTitle>Track Your Growth</CardTitle>
                        <p className="text-muted-foreground pt-2">Receive email reports after each attempt so you can see your progress and prepare with confidence.</p>
                      </div>
                      <Repeat className="h-8 w-8 text-primary" />
                    </CardHeader>
                </div>
              </Card>
            </div>

            <Card className="relative group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-25 transition duration-500 group-hover:opacity-60 group-hover:blur-3xl"></div>
              <div className="relative bg-card rounded-lg h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <Image 
                      src="https://picsum.photos/600/400?random=3"
                      alt="Real-Time Analytics" 
                      width={600} 
                      height={400} 
                      data-ai-hint="analytics chart"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="flex-row items-start gap-4">
                    <BarChart className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <CardTitle>Real-Time Analytics</CardTitle>
                      <p className="text-muted-foreground pt-2">Drive decisions with powerful insights.</p>
                    </div>
                  </CardHeader>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
