import type {Metadata} from 'next';
import { Geist } from 'next/font/google';
import { Merriweather } from 'next/font/google'; // Changed from Love Ya Like A Sister to Merriweather
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const merriweather = Merriweather({ // Configured Merriweather
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '700'], // Merriweather supports various weights, added 400 and 700
});

export const metadata: Metadata = {
  title: "Dhriti E's Portfolio | Your Professional Portfolio",
  description: 'Showcasing skills, projects, and achievements.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${merriweather.variable} font-sans antialiased`}> {/* Added merriweather variable */}
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
