import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/userContext";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import ThemeSwitcher from "../ThemeSwitcher";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const MenuModal = () => {
  const { setUser, user } = useUser();
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <HiOutlineSquares2X2 size={32} />
      </SheetTrigger>
      <SheetContent className="transition-[background-color] duration-300">
        <div className="h-40 w-2 rounded-xl bg-primary absolute left-2 top-1/2 -translate-y-1/2" />
        <div className="h-full w-full flex flex-col items-center justify-around">
          <SheetHeader className="flex w-full justify-center items-center flex-row gap-4 h-48 max-md:flex-col">
            {!JSON.parse(localStorage.getItem("user")) ? (
              <Link className="w-full" href={"/login"}>
                <Button className="w-full">Entrar</Button>
              </Link>
            ) : (
              <>
                <SheetTitle>
                  <img
                    src={user && user.imagem}
                    alt="Foto de perfil do usuário"
                    className="size-24 object-cover rounded-3xl bg-zinc-800"
                  />
                </SheetTitle>
                <SheetDescription className="flex flex-col justify-center items-center gap-4 text-primary">
                  {user && user.userName}
                  <a target="_blank" href={user && user.urlGitHub}>
                    <GitHubLogoIcon className="size-10 text-background bg-primary w-32 rounded-lg py-1 cursor-pointer hover:bg-primary/80" />
                  </a>
                </SheetDescription>
              </>
            )}
          </SheetHeader>
          <div className="flex flex-col gap-6 items-center justify-center h-48 ">
            <Link href="/" className="hover-link">
              Home
            </Link>
            {!JSON.parse(localStorage.getItem("user")) ? null : (
              <Link href={`/${user && user.userName}`} className="hover-link">
                Meu Perfil
              </Link>
            )}
            <Link href="/search" className="hover-link">
              Pesquisar
            </Link>
          </div>

          <div className="flex flex-col gap-8 items-center justify-center w-full h-48 ">
            {!JSON.parse(localStorage.getItem("user")) ? null : (
              <SheetClose className="w-full">
                <div
                  onClick={logout}
                  className="flex items-center gap-2 w-full bg-primary justify-center rounded-lg text-background h-12 cursor-pointer hover:bg-primary/90"
                >
                  <h2>Sair</h2>
                  <LogOut />
                </div>
              </SheetClose>
            )}

            <ThemeSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
