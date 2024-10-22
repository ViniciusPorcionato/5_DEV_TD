"use client";
import { SubTitle, Title } from "@/components/Text";
import { CornerUpLeft, Loader } from "lucide-react";
import Logo from "../../assets/LogoDesktop.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  const { setUser } = useUser();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      if (userName.length < 2) {
        toast({
          variant: "destructive",
          title: "O nome de usuário deve ter no mínimo 3 caracteres!",
        });
      } else {
        await fetch(
          `http://localhost:3000/usuarios?userName=${userName.toLowerCase()}`
        )
          .then((response) => response.json())
          .then(async (response) => {
            if (response[0]) {
              //setar o state "user" com essa resposta

              localStorage.setItem("user", JSON.stringify(response[0]));
              setUser(response[0]);
              toast({
                title: "Login realizado com sucesso",
              });
              //ir para a página de feed router.replace("???")
              setTimeout(() => {
                router.replace("/");
              }, 1000);
            } else {
              toast({
                variant: "destructive",
                title: "Usuário não encontrado!",
              });
            }
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: "Algo deu errado, tente novamente!",
            });
          });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <main>
      <Toaster />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Container className="flex flex-col items-center min-h-max gap-28 max-sm:gap-20">
          <img
            className={cn(
              "select-none mt-12 max-sm:w-[190px] max-sm:h-[55px] max-sm:mt-24",
              theme.toString() === "dark" ? "" : "invert"
            )}
            src={Logo.src}
          />
          <div className="flex flex-col items-center gap-12 max-sm:gap-6">
            <Title>Entre com sua conta GitHub</Title>
            <form
              onSubmit={login}
              className="flex flex-col items-center justify-center gap-4 w-full"
            >
              <Input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder="Digite seu usuário do GitHub"
                className="h-12 placeholder:text-primary/75 text-lg max-sm:text-sm max-sm:w-[90%]"
              />
              <motion.div
                className="w-full max-sm:w-[90%]"
                whileTap={{ scale: 1.05 }}
              >
                <Button className="w-full text-lg h-12 max-sm:text-base">
                  {!loading ? "Logar" : <Loader className="animate-spin" />}
                </Button>
              </motion.div>
            </form>
            <div className="flex items-center gap-1 max-sm:flex-col">
              <SubTitle>Caso não tenha uma conta cadastrada,</SubTitle>
              <Link
                className="text-primary text-lg hover:cursor-pointer underline max-sm:text-base"
                href="/register"
              >
                acesse aqui!
              </Link>
            </div>
          </div>
        </Container>
      </motion.div>
    </main>
  );
};

export default LoginPage;
