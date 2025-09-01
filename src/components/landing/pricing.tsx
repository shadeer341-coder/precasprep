import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const individualFeatures = [
  "Unlimited practice sessions",
  "AI-powered feedback",
  "50+ interview questions",
  "Performance tracking",
];

const agencyFeatures = [
  "All features in Individual",
  "Team management dashboard",
  "Custom branding",
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
        <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-2 pt-12">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Individual</CardTitle>
              <CardDescription>For students and individual applicants preparing for their big day.</CardDescription>
              <div className="flex items-baseline pt-4">
                <span className="text-4xl font-bold">$29</span>
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
          <Card className="border-primary shadow-lg flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Agency</CardTitle>
                <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Most Popular</div>
              </div>
              <CardDescription>For schools, counselors, and organizations helping students succeed.</CardDescription>
              <div className="flex items-baseline pt-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <ul className="space-y-2">
                {agencyFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
