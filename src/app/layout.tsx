import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Providers } from "../contexts/providers";
import { fjallaOne, monteserrat, pressStart } from "../styles/fonts";
import { Header } from "@/components/Header";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DodgeBallers",
  description: "DodgeBaller is a game built for Blobert NFT holders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${monteserrat.variable}, ${fjallaOne.variable}`}
    >
      <body>
        <Providers>
          <Theme
            accentColor="amber"
            grayColor="olive"
            panelBackground="solid"
            scaling="100%"
            radius="large"
          >
            <div className="min-h-screen">
              <Header />
              {children}
              <Toaster />
            </div>
          </Theme>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
