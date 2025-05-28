"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateBioSuggestions, type GenerateBioSuggestionsInput } from "@/ai/flows/generate-bio-suggestions";
import { BioGeneratorSchema, type BioGeneratorFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

interface BioGeneratorFormProps {
  onBioGenerated: (bio: string) => void;
  initialBio?: string;
}

export function BioGeneratorForm({ onBioGenerated, initialBio }: BioGeneratorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBio, setGeneratedBio] = useState<string | null>(initialBio || null);
  const { toast } = useToast();

  const form = useForm<BioGeneratorFormValues>({
    resolver: zodResolver(BioGeneratorSchema),
    defaultValues: {
      name: "",
      profession: "",
      achievements: "",
      style: "professional",
    },
  });

  async function onSubmit(values: BioGeneratorFormValues) {
    setIsLoading(true);
    setGeneratedBio(null);
    try {
      const input: GenerateBioSuggestionsInput = {
        name: values.name,
        profession: values.profession,
        achievements: values.achievements,
        style: values.style,
      };
      const result = await generateBioSuggestions(input);
      if (result.bio) {
        setGeneratedBio(result.bio);
        onBioGenerated(result.bio);
        toast({
          title: "Bio Suggestion Generated!",
          description: "You can now edit and use the generated bio.",
        });
      } else {
        throw new Error("Bio generation failed to produce output.");
      }
    } catch (error) {
      console.error("Error generating bio:", error);
      toast({
        title: "Error",
        description: "Failed to generate bio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = event.target.value;
    setGeneratedBio(newBio);
    onBioGenerated(newBio);
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-accent" />
          AI Bio Generator
        </CardTitle>
        <CardDescription>
          Fill in your details and let AI craft a bio suggestion for you.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession/Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer, Artist" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Achievements/Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly list your key achievements, skills, or experiences you want to highlight."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Separate items with commas or new lines.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a writing style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="witty">Witty</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="mt-6">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-primary/90">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Bio
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
      {generatedBio !== null && (
        <CardFooter className="flex-col items-start gap-2 pt-4">
            <Label htmlFor="generatedBioTextarea" className="font-semibold">Your Generated Bio (Editable):</Label>
            <Textarea
              id="generatedBioTextarea"
              value={generatedBio}
              onChange={handleBioChange}
              className="min-h-[150px] w-full"
              placeholder="Your generated bio will appear here..."
            />
            <p className="text-sm text-muted-foreground">Feel free to edit the text above to better suit your voice.</p>
        </CardFooter>
      )}
    </Card>
  );
}
