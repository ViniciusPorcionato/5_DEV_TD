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
import { SquarePen } from "lucide-react";
import { InputEdit } from "../InputEdit";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const ModalEdit = ({ postagem, getPost }) => {
  const [novaDescricao, setNovaDescricao] = useState("");

  const { toast } = useToast();

  const changeDescription = async () => {
    if (novaDescricao.trim() == "") {
      toast({
        variant: "destructive",
        title: "Digite algum texto!",
      });
      return;
    }
    try {
      await fetch(`http://localhost:3000/postagens/${postagem.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...postagem, descricao: novaDescricao }),
      });
      getPost();
      toast({
        title: "Postagem editada com sucesso",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Não foi possível editar a postagem, tente novamente.",
      });
    }
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger>
        <SquarePen className="text-primary" size={30} />
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          setNovaDescricao("");
        }}
        className="w-[90%] h-auto max-md:p-3 max-sm:rounded-lg"
      >
        <DialogHeader className="flex justify-around gap-2">
          <DialogTitle>@{postagem && postagem.userName}</DialogTitle>
          Texto atual:
          <DialogDescription className="">
            {postagem && postagem.descricao}
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="py-4">
            <h1>Alterar Descrição:</h1>
            <InputEdit
              valueText={novaDescricao}
              onChangeText={(e) => setNovaDescricao(e.target.value)}
            />
          </div>
        </form>
        <DialogClose
          onClick={() => changeDescription()}
          className="text-center py-2 w-full flex items-center justify-center bg-primary text-background rounded-lg hover:bg-primary/90"
        >
          Editar Publicação
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
