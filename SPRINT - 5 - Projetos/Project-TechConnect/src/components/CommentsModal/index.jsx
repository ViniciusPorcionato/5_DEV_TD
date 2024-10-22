"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { Trash, SendHorizontal, Edit } from "lucide-react";
import { FaRegComment } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { useUser } from "@/context/userContext";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";

export const CommentsModal = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const { toast } = useToast();

  const { user } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:3000/comentarios?postId=${postId}`
      );
      const data = await response.json();
      setComments(data);
    };

    if (isDrawerOpen) fetchComments(); // carrega apenas se o drawer estiver aberto
  }, [isDrawerOpen, postId]);

  const handleAddComment = async () => {
    // verifica se está editando ou adicionando um novo comentario
    if (editingCommentId) {
      // atualiza o comentario
      const updatedComment = {
        ...comments.find((comment) => comment.id === editingCommentId),
        text: commentText, // atualiza o texto
      };

      await fetch(`http://localhost:3000/comentarios/${editingCommentId}`, {
        method: "PUT",
        body: JSON.stringify(updatedComment),
      }).catch(() => {
        toast({
          title: "Não foi possível editar o comentario, tente novamente.",
        });
        return;
      });

      toast({
        title: "Comentário editado com sucesso.",
      });

      setComments(
        comments.map((comment) =>
          comment.id === editingCommentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null); // Finaliza a edição.
    } else {
      // adiciona um novo comentario.
      if (commentText.trim()) {
        const newComment = {
          id: uuid(),
          userId: user.id,
          userName: user.userName,
          userPhoto: user.imagem,
          postId,
          text: commentText,
        };

        await fetch("http://localhost:3000/comentarios", {
          method: "POST",
          body: JSON.stringify(newComment),
        }).catch(() => {
          toast({
            title: "Não foi possível registrar o comentario, tente novamente.",
          });
          return;
        });
        toast({
          title: "Comentário registrado com sucesso.",
        });

        setComments([...comments, newComment]);
      }
    }

    setCommentText(""); // limpa o input
  };

  const handleRemoveComment = async (id) => {
    await fetch(`http://localhost:3000/comentarios/${id}`, {
      method: "DELETE",
    }).catch(() => {
      toast({
        variant: "destructive",
        title: "Não foi possível deletar o comentario, tente novamente.",
      });
      return;
    });
    toast({
      title: "Comentario deletado com sucesso",
    });

    setComments(comments.filter((comment) => comment.id !== id));

    // se o comentario sendo editado for deletado limpa a edição
    if (editingCommentId === id) {
      setCommentText("");
      setEditingCommentId(null);
    }
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    setCommentText(commentToEdit.text);
    setEditingCommentId(id);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCommentId(null);
    setCommentText(""); // limpa o input
  };

  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleAddComment();
      event.preventDefault(); // Previne o comportamento padrão
    }
  };

  return (
    <>
      <FaRegComment
        className="cursor-pointer"
        size={25}
        onClick={() => setIsDrawerOpen(true)}
      />
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <Toaster />
        <DrawerContent className="bg-background !h-5/6 border border-primary/25">
          <DrawerHeader className="flex flex-col">
            {editingCommentId && (
              <p className="text-primary font-medium text-base mb-2">
                Você está editando um comentário.
              </p>
            )}
            <DrawerTitle>
              <div className="flex items-center">
                <Input
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  className="flex-grow placeholder:text-primary/75 font-medium"
                  placeholder="Digite o que achou da publicação..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)} // atualiza o texto do comentario
                />
                <button
                  onClick={handleAddComment}
                  className="ml-2 flex items-center"
                >
                  <SendHorizontal className="w-6 h-6 text-primary" />
                </button>
              </div>
            </DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>

          {/* lista de comentarios */}
          {comments.length > 0 ? (
            <div className="py-2 px-6 text-primary overflow-y-auto max-h-[450px] [&>*:nth-child(odd)]:bg-primary/10 [&>*:nth-child(even)]:bg-transparent">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-primary/50 gap-4 flex justify-between items-center rounded-md px-2 py-4"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={comment.userPhoto}
                      alt={`${comment.userName} profile`}
                      className="w-8 h-8 rounded-full"
                    />

                    <div>
                      <p className="font-bold text-sm">{comment.userName}</p>
                      <p className="text-base text-primary/90">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                  {user && user.id == comment.userId && (
                    <div className="flex items-center space-x-2">
                      {/*editar comentário */}
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="flex items-center"
                      >
                        <Edit className="size-6 text-primary" />
                      </button>
                      {/* deletar comentário */}
                      <button
                        onClick={() => handleRemoveComment(comment.id)}
                        className="flex items-center"
                      >
                        <Trash className="size-6 text-primary" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="w-full text-center">
              Não há comentários nessa postagem!
            </p>
          )}

          <DrawerFooter className="space-x-2">
            <Button className="border-primary/50" onClick={handleCloseDrawer}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
