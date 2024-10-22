"use client";
import React, {  } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

export const ModalDelete = ({ postagem, getPost }) => {
  const { toast } = useToast();

  const deletePost = async () => {
    try {
      await fetch(`http://localhost:3000/postagens/${postagem.id}`, {
        method: "DELETE",
      });
      getPost()
      toast({
        title: "Postagem deletada com sucesso",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Não foi possível deletar a postagem, tente novamente.",
      });
    }
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger>
        <Trash2 size={30} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-[90%] max-w-md h-[30%] max-md:p-3 max-sm:rounded-lg"
      >
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>@{postagem && postagem.userName}</DialogTitle>
        </DialogHeader>

        <div className="w-[100%] flex items-center justify-center">
          <DialogDescription className="text-primary text-lg">
            Deseja excluir seu post?
          </DialogDescription>
        </div>

        <form>
          <DialogFooter className="flex justify-between items-center w-[100%] ">
            <div className="flex justify-center gap-10 w-[100%]">
              <DialogClose
                onClick={deletePost}
                className="text-center py-2 w-full flex items-center justify-center bg-primary text-background rounded-lg hover:bg-primary/90"
              >
                Confirmar
              </DialogClose>
              <DialogClose className="text-center py-2 w-full flex items-center justify-center bg-primary text-background rounded-lg hover:bg-primary/90">
                Voltar
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
