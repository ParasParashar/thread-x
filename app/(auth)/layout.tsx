import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
export const metadata = {
  title: "Threads App",
  description: "This is made with latest Next-Js 13.4 version.",
};
const inter = Inter({ subsets: ["latin"] });

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1 flex items-center justify-center h-screen`}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default layout;
