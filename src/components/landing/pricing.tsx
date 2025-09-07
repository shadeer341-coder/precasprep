import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const individualFeatures = [
  "Unlimited practice sessions",
  "AI-powered feedback",
  "50+ interview questions",
  "Performance tracking",
];

const agencyStarterFeatures = [
  "All features in Individual",
  "Up to 10 students",
  "Team management dashboard",
];

const agencyStandardFeatures = [
  "All features in Starter",
  "Up to 25 students",
  "Custom branding",
];

const agencyAdvancedFeatures = [
  "All features in Standard",
  "Up to 50 students",
  "Priority support",
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Pricing Plans</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Find the Perfect Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Start with our flexible plans. Simple and transparent pricing to help you succeed.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-start gap-8 sm:grid-cols-1 lg:grid-cols-3 pt-12">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Individual</CardTitle>
              <CardDescription>For students and individual applicants preparing for their big day.</CardDescription>
              <div className="flex items-baseline pt-4">
                <span className="text-4xl font-bold">$25</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <ul className="space-y-2">
                {individualFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-primary shadow-lg flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Agency</CardTitle>
                <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Most Popular</div>
              </div>
              <CardDescription>For schools, counselors, and organizations helping students succeed.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Tabs defaultValue="standard" className="w-full flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="starter">Starter</TabsTrigger>
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <div className="flex-1">
                  <TabsContent value="starter" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                          <div className="flex items-baseline pt-4 justify-center">
                              <span className="text-4xl font-bold">$240</span>
                              <span className="ml-1 text-muted-foreground">/month</span>
                          </div>
                          <p className="text-center text-sm text-muted-foreground mb-4">for 10 students</p>
                          <ul className="space-y-2">
                              {agencyStarterFeatures.map((feature) => (
                                  <li key={feature} className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span>{feature}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <Button className="w-full mt-4">Choose Starter</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="standard" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                          <div className="flex items-baseline pt-4 justify-center">
                              <span className="text-4xl font-bold">$575</span>
                              <span className="ml-1 text-muted-foreground">/month</span>
                          </div>
                          <p className="text-center text-sm text-muted-foreground mb-4">for 25 students</p>
                          <ul className="space-y-2">
                              {agencyStandardFeatures.map((feature) => (
                                  <li key={feature} className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span>{feature}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <Button className="w-full mt-4">Choose Standard</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="advanced" className="h-full">
                     <div className="flex flex-col h-full">
                        <div className="flex-1">
                            <div className="flex items-baseline pt-4 justify-center">
                                <span className="text-4xl font-bold">$1100</span>
                                <span className="ml-1 text-muted-foreground">/month</span>
                            </div>
                            <p className="text-center text-sm text-muted-foreground mb-4">for 50 students</p>
                            <ul className="space-y-2">
                                {agencyAdvancedFeatures.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button className="w-full mt-4">Choose Advanced</Button>
                     </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Tailored solutions for large-scale educational institutions and partners.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center text-center">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                    Contact us for custom pricing, dedicated support, and features tailored to your organization's needs.
                </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Email Us</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
