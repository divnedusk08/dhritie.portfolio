import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import { Dancing_Script } from 'next/font/google'; // Added Dancing Script
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const dancingScript = Dancing_Script({ // Configured Dancing Script
  variable: '--font-dancing-script',
  subsets: ['latin'],
  weight: ['400', '700'], // Include weights if needed, default is 400
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
      <body className={`${geistSans.variable} ${dancingScript.variable} font-sans antialiased`}> {/* Added dancingScript variable */}
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
