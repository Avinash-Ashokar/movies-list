// Importing necessary types and components
import type { Metadata } from "next"; // Type for metadata in Next.js
import { Montserrat } from "next/font/google"; // Importing Montserrat font from Google Fonts
import "./globals.css"; // Importing global CSS styles
import { UserStateProvider } from "@/context/userStateContext"; // Context provider for user state management
import WavyFooter from "@/components/wavy-footer"; // Footer component
import { ToastContainer } from "react-toastify"; // Toast notifications container

// Configuring the Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"], // Specifying the font subsets
  display: "swap", // Font display strategy
  variable: "--font-montserrat", // CSS variable for the font
});

// Metadata for the page
export const metadata: Metadata = {
  title: "Movies List", // Title of the page
  description: "Website to store movie information.", // Description of the page
};

// Root layout component for the application
export default function RootLayout({
  children, // Children components to be rendered inside the layout
}: Readonly<{
  children: React.ReactNode; // Type definition for children
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      {/* HTML structure with language and font class */}
      <body>
        <div className="bg-[#093545] min-h-screen flex flex-col justify-between">
          {/* Main container with background color and flex layout */}
          <UserStateProvider>
            {/* Providing user state context to children */}
            <ToastContainer /> {/* Container for toast notifications */}
            {children} {/* Rendering children components */}
          </UserStateProvider>
          <WavyFooter /> {/* Footer component */}
        </div>
      </body>
    </html>
  );
}
