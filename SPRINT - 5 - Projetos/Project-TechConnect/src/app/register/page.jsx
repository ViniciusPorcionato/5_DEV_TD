"use client";
import { SubTitle, Title } from "@/components/Text";
import { CornerUpLeft, Loader } from "lucide-react";
import Logo from "../../assets/LogoDesktop.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { octokit } from "@/utils/githubkey";
import { useUser } from "@/context/userContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Container } from "@/components/Container";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  const { setUser } = useUser();

  const validateUser = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      if (userName.length < 2) {
        toast({
          variant: "destructive",
          title: "O nome de usuário deve ter no mínimo 3 caracteres!",
        });
      } else {
        octokit
          .request("GET /users/{username}", {
            username: userName,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          })
          .then(async (response) => {
            const verify = await checkUserExists();

            if (verify) {
              toast({
                variant: "destructive",
                title: "Este usuário já está cadastrado!",
              });
            } else {
              registerUser(response.data);
            }
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: "Algo deu errado, tente novamente.",
            });
          });
        setUserName("");
      }
      setLoading(false);
    }, 1000);
  };

  const checkUserExists = () => {
    return fetch(
      `http://localhost:3000/usuarios?userName=${userName.toLocaleLowerCase()}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) {
          return true;
        }
        return false;
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Não foi possível consultar os usuários, tente novamente.",
        });
      });
  };

  const registerUser = (user) => {
    try {
      const data = {
        id: uuid(),
        userName: user.login.toLocaleLowerCase(),
        imagem: user.avatar_url,
        urlGitHub: user.html_url,
      };

      fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: JSON.stringify(data),
      });
      //setar o user
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast({
        title: "Registrado com sucesso!",
      });
      //navegar
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Não foi possível registrar o usuário, tente novamente.",
      });
    }
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
          <div className="flex flex-col">
            <img
              className={cn(
                "select-none mt-12 max-sm:w-[190px] max-sm:h-[55px] max-sm:mt-24",
                theme.toString() === "dark" ? "" : "invert"
              )}
              src={Logo.src}
            />
          </div>
          <div className="flex flex-col items-center gap-12 max-sm:gap-6">
            <Title>Cadastre com sua conta GitHub</Title>
            <form
              onSubmit={validateUser}
              className="flex flex-col items-center gap-4 w-full"
            >
              <Input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder="Digite seu usuário do GitHub"
                className="h-12 placeholder:text-primary/75 text-lg max-sm:text-sm max-sm:w-[100%]"
              />
              <motion.div className="w-full" whileTap={{ scale: 1.05 }}>
                <Button className="w-full text-lg h-12 max-sm:text-base">
                  {!loading ? "Cadastrar" : <Loader className="animate-spin" />}
                </Button>
              </motion.div>
            </form>
            <div className="flex gap-1 items-center max-sm:flex-col">
              <SubTitle>Caso já tenha uma conta cadastrada,</SubTitle>
              <Link
                className="text-primary text-lg hover:cursor-pointer underline max-sm:text-base"
                href="/login"
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

export default RegisterPage;
