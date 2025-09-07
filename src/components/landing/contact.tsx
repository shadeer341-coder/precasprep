
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/contact/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  interest: z.string({ required_error: "Please select an option." }),
  email: z.string().email("Please enter a valid email address."),
});

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


export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // @ts-ignore
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <motion.section 
      id="contact" 
      className="w-full py-12 md:py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={containerVariants}
    >
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Contact Us</div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions? We'd love to hear from you.
            </p>
          </div>
        </motion.div>
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          variants={itemVariants}
        >
          <div className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg md:text-xl">
                  <span>Hey, my name is</span>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[150px]">
                        <FormControl>
                          <Input placeholder="Type Here" {...field} className="inline-input text-lg md:text-xl" />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <span>and I'm looking for</span>
                   <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[180px]">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                             <SelectTrigger className="inline-input text-lg md:text-xl">
                              <SelectValue placeholder="Select Dropdown" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="individual">Individual Plan</SelectItem>
                            <SelectItem value="agency">Agency Plan</SelectItem>
                            <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                            <SelectItem value="general">General Question</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg md:text-xl">
                   <span>Get in touch with me at</span>
                   <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[200px]">
                        <FormControl>
                          <Input placeholder="Your Email ID Here" {...field} className="inline-input text-lg md:text-xl" />
                        </FormControl>
                         <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <span>!</span>
                </div>
                
                <Button type="submit" size="lg" className="font-bold" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Enquiry"}
                  {!form.formState.isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        .inline-input {
          display: inline-block;
          background: transparent;
          border: none;
          border-bottom: 1px solid hsl(var(--border));
          border-radius: 0;
          padding: 0;
          height: auto;
          line-height: inherit;
          box-shadow: none;
        }
        .inline-input:focus-visible {
          ring-offset: 0;
          ring: 0;
          border-bottom: 1px solid hsl(var(--primary));
        }
      `}</style>
    </motion.section>
  );
}

    

    