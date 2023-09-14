import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import BottomBar from "@/components/shared/BottomBar";
import ActiveStatus from "@/components/chats/ActiveStatus";
import ToasterProvider from "@/components/cards/Toaster";
export const metadata = {
  title: "Thread X App",
  description: "This is made with latest Next-Js 13.4 version.",
};
const inter = Inter({ subsets: ["latin"] });

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                <ToasterProvider/>
                <ActiveStatus/>
                {children}
                </div>
            </section>
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default layout;
