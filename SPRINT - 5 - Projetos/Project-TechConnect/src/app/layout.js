import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { UserProvider } from "@/context/userContext";
import ThemeProvider from "@/providers/themeProvides";

const poppins = Poppins({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TechConnect",
  description: "A melhor rede social de desenvolvedores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        suppressHydrationWarning
        className={cn(poppins.className, "antialiased")}
      >
        <UserProvider>
          <ThemeProvider attribute="class">
            {/* <Header /> */}
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
