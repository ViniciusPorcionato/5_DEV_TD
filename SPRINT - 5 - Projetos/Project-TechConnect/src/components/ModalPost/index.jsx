"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import InputPublication from "../InputPublication/InputPublication";
import { Plus, Trash } from "lucide-react";
import { CreateImageFile } from "@/configAzure/serverconfig";
import { useUser } from "@/context/userContext";
import { v4 as uuid } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

export const ModalPost = ({ getPost }) => {
  const [images, setImages] = useState([]);

  //context de usuário
  const { user } = useUser();

  const [postagem, setPostagem] = useState({
    descricao: "",
    imagens: [],
  });
  const { toast } = useToast();

  const handleUpdateFile = async () => {
    if (images.length > 0) {
      try {
        let imagesURLs = [];
        for (var image of images) {
          const img = await CreateImageFile(image);
          imagesURLs.push(img);
        }
        return imagesURLs;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Não foi possível salvar o arquivo, tente novamente.",
        });
      }
    }
  };

  const post = async () => {
    if (postagem.descricao.trim() == "" && images.length < 1) {
      toast({
        variant: "destructive",
        title: "Digite um texto ou adicione uma imagem!",
      });
      return;
    }
    try {
      const data = {
        ...postagem,
        id: uuid(),
        datePost: new Date().toISOString(),
        userId: user.id,
        userName: user.userName,
        userImage: user.imagem,
        urlGitHub: user.urlGitHub,
        imagens: await handleUpdateFile(),
      };

      await fetch("http://localhost:3000/postagens", {
        method: "POST",
        body: JSON.stringify(data),
      });
      getPost();
      toast({
        title: "Postagem publicada com sucesso",
      });
      postagem.descricao = "";
      setImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    // Verifica se há arquivos selecionados no evento
    if (images.length > 2) {
      toast({
        variant: "destructive",
        title: "Limite de 3 fotos atingido!",
      });
      return;
    }
    if (e.target.files && e.target.files[0]) {
      // Atualiza o estado de imagens usando uma prop passada como parâmetro
      setImages([
        // Mantém todas as imagens existentes
        ...images,
        // Adiciona uma nova URL de objeto para o arquivo selecionado
        e.target.files[0],
      ]);
    }
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger>
        <Plus
          size={50}
          className="p-3 bg-primary text-background border rounded-lg fixed bottom-10 left-10 z-50 max-md:bottom-3 max-md:right-3"
        />
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          setImages([]);
          setPostagem({ ...postagem, descricao: "" });
        }}
        className="w-[90%] h-auto max-sm:rounded-lg max-md:p-3"
      >
        <DialogHeader className="flex gap-2 h-min space-y-0">
          <DialogTitle>Sua Publicação</DialogTitle>
          <DialogDescription className="text-base">
            Digite o que você esta pensando...
          </DialogDescription>
        </DialogHeader>

        <div className="h-full flex flex-col gap-5">
          <InputPublication
            onChangeText={(e) =>
              setPostagem({ ...postagem, descricao: e.target.value })
            }
            onChange={(e) => handleImageChange(e)}
            setImages={setImages}
            images={images}
            valueText={postagem.descricao}
            valueImage={postagem.imagens}
          />
          <DialogClose
            onClick={() => post()}
            className="text-center py-2 w-full flex items-center justify-center bg-primary text-background rounded-lg hover:bg-primary/90"
          >
            Enviar Publicação
          </DialogClose>
        </div>
        <div className="flex gap-2 rounded-[10px] flex-wrap justify-center">
          {images.map((image, i) => (
            <div className=" flex flex-col justify-center gap-2 items-center">
              <img
                className="aspect-video object-cover min-w-36 h-20 rounded-md"
                key={i}
                src={URL.createObjectURL(image)}
              />
              <Trash
                className="text-background py-2 size-8 cursor-pointer rounded-md w-full bg-primary"
                onClick={() => setImages(images.filter((img) => img != image))}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
