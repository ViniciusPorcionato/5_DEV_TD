"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { InputEdit } from "../InputEdit";
import { ButtonDeleteConfirm } from "../Button";

export const ModalBio = ({ user, getProfile }) => {
  const [novaBio, setNovaBio] = useState(user.bio ? user.bio : "");

  const changeBio = (e) => {
    e.preventDefault();

    try {
      fetch(`http://localhost:3000/usuarios/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...user, bio: novaBio }),
      });
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center w-full bg-primary text-background p-2 rounded h-8">
        Alterar Biografia
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="w-[90%] max-md:p-3"
      >
        <DialogHeader className="flex justify-around">
          <DialogTitle className="font-normal text-center">
            Alterar Biografia
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={changeBio} className="h-[100%]">
          <DialogFooter className="flex justify-between items-center w-[100%] h-[100%]">
            <div className="flex flex-col gap-3 w-[100%] h-[100%]">
              <InputEdit
                valueText={novaBio}
                onChangeText={(e) => setNovaBio(e.target.value)}
              />
              <DialogClose>
                <ButtonDeleteConfirm>Confirmar</ButtonDeleteConfirm>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
