
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { useState } from "react";
import { PricingDialog } from "./pricing-dialog";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export function Pricing() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setDialogOpen(true);
  };


  return (
    <>
    <motion.section 
      id="pricing" 
      className="w-full py-12 md:py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Pricing Plans</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Find the Perfect Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Start with our flexible plans. Simple and transparent pricing to help you succeed.
            </p>
          </div>
        </motion.div>
        <motion.div 
          className="mx-auto grid max-w-6xl items-start gap-8 sm:grid-cols-1 lg:grid-cols-3 pt-12"
          variants={itemVariants}
        >
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Individual</CardTitle>
              <CardDescription>For students and individual applicants preparing for their big day.</CardDescription>
              <div className="flex items-baseline pt-4">
                <span className="text-4xl font-bold">$25</span>
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
              <Button className="w-full" onClick={() => handlePlanSelect("Individual")}>Get Started</Button>
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
                      <Button className="w-full mt-4" onClick={() => handlePlanSelect("Agency - Starter")}>Choose Starter</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="standard" className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                          <div className="flex items-baseline pt-4 justify-center">
                              <span className="text-4xl font-bold">$575</span>
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
                      <Button className="w-full mt-4" onClick={() => handlePlanSelect("Agency - Standard")}>Choose Standard</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="advanced" className="h-full">
                     <div className="flex flex-col h-full">
                        <div className="flex-1">
                            <div className="flex items-baseline pt-4 justify-center">
                                <span className="text-4xl font-bold">$1100</span>
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
                        <Button className="w-full mt-4" onClick={() => handlePlanSelect("Agency - Advanced")}>Choose Advanced</Button>
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
              <Button className="w-full" variant="outline" onClick={() => handlePlanSelect("Enterprise")}>Email Us</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.section>
    <PricingDialog 
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      planName={selectedPlan}
    />
    </>
  );
}

    