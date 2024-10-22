"use client";
import logoDesktop from "@/assets/img/logo-desktop.png";
import logoDesktopDark from "@/assets/img/logo-desktop-dark.png";
import { MenuModal } from "../MenuModal";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { CornerUpLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import ThemeSwitcher from "../ThemeSwitcher";

export const Header = () => {
  const pathname = usePathname();

  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
      let lastScrollY = window.scrollY;

      const updateScrollDirection = () => {
        const scrollY = window.scrollY;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (
          direction !== scrollDirection &&
          (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
        ) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      };
    }, [scrollDirection]);

    return scrollDirection;
  }

  const scrollDirection = useScrollDirection();

  const { user } = useUser();

  const { theme } = useTheme();

  return (
    <header
      className={cn(
        "w-full bg-background h-20 mb-4 px-6 max-lg:px-4 sticky top-0 transition-[top, background-color] ease-linear duration-300 z-50",
        scrollDirection === "down" ? "-top-24" : "top-0"
      )}
    >
      <div className="max-w-5xl w-full h-full mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <img
            src={logoDesktop.src}
            alt="Logo Desktop TechConnect"
            className={cn("w-40 cursor-pointer", theme.toString() === "dark" ? "" : "invert")}
          />
        </Link>

        <MenuModal />
      </div>
    </header>
  );
};
