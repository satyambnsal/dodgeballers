import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Providers } from "../contexts/providers";
import { fjallaOne, monteserrat } from "../styles/fonts";
import { Header } from "@/components/Header";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DodgeBallers",
  description:
    "Blobert NFT Duel",
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
      </body>
    </html>
  );
}
