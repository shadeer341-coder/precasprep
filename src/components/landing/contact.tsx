
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/contact/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  interest: z.string({ required_error: "Please select an option." }),
  email: z.string().email("Please enter a valid email address."),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      terms: false,
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
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-left">
              <p className="text-sm text-primary font-semibold">/ Get In Touch</p>
              <CardTitle className="text-4xl font-headline font-bold">Schedule an Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I hereby accept all terms and conditions.
                          </FormLabel>
                           <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="font-bold" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Enquiry"}
                    {!form.formState.isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
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
    </section>
  );
}
