import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import { Love_Ya_Like_A_Sister } from 'next/font/google'; // Added Love Ya Like A Sister
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const loveYaLikeASister = Love_Ya_Like_A_Sister({ // Configured Love Ya Like A Sister
  variable: '--font-love-ya-like-a-sister',
  subsets: ['latin'],
  weight: ['400'], // Love Ya Like A Sister typically has one weight
});

export const metadata: Metadata = {
  title: 'Persona | Your Professional Portfolio',
  description: 'Showcasing skills, projects, and achievements.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${loveYaLikeASister.variable} font-sans antialiased`}> {/* Added loveYaLikeASister variable */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem={false} 
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
