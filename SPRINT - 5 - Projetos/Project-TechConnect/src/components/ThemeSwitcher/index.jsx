"use client";
import { useTheme } from "next-themes";
import { FaRegMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")} className="w-full cursor-pointer rounded-lg flex gap-2 justify-center h-12 items-center bg-primary hover:bg-primary/90 text-background">
      <h2>Trocar Tema</h2>
      {theme == "dark" ? (
        <FaRegMoon
          className="hover:opacity-50 size-5 duration-500 text-background cursor-pointer"
        />
      ) : (
        <FaSun
          className="hover:opacity-50 size-5 cursor-pointer text-background duration-500"
        />
      )}
    </div>
  );
}
