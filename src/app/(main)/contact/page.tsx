"use client";

import { useActionState, useFormStatus } from "react-dom-experimental"; // useActionState is experimental in react-dom for now, but should be react for stable
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { submitContactForm } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Loader2, Mail, Send, MessageSquare, User } from "lucide-react";

// For stable React 19, useActionState will be imported directly from "react"
// For now, with Next.js 15.2.3 and React 18.3.1, useFormState is still from "react-dom"
// However, the error message suggests a forward-looking change.
// Let's try importing useActionState from 'react' first as per the error message's intent
// If that doesn't resolve, we might need to check React versions.
// Given the error message "ReactDOM.useFormState has been renamed to React.useActionState",
// the correct import should be from "react".

import { useActionState as useReactActionState } from "react";


const initialState = {
  message: "",
  success: false,
  fields: undefined as Record<string, string> | undefined,
  issues: undefined as string[] | undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      Send Message
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useReactActionState(submitContactForm, initialState);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: state.fields?.name || "",
      email: state.fields?.email || "",
      message: state.fields?.message || "",
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset({ name: "", email: "", message: "" }); // Reset form on successful submission
      } else {
        toast({
          title: "Error",
          description: state.message || "Failed to send message.",
          variant: "destructive",
        });
        // Optionally repopulate form if specific field errors were returned
        if(state.fields){
          form.setValue("name", state.fields.name || "");
          form.setValue("email", state.fields.email || "");
          form.setValue("message", state.fields.message || "");
        }
        if(state.issues) {
          // This is a bit simplistic; a full solution would map issues to RHF errors.
          // For now, just show the general message.
          console.error("Validation issues:", state.issues);
        }
      }
    }
  }, [state, toast, form]);

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Get In Touch
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          Have a question or want to work together? Feel free to reach out.
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Mail className="mr-3 h-7 w-7 text-primary" /> Contact Me
          </CardTitle>
          <CardDescription>
            Fill out the form below and I'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
