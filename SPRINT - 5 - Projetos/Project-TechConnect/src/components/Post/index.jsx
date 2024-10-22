"use client";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImageCarousel } from "../ImageCarousel";
import { CommentsModal } from "../CommentsModal";
import { useUser } from "@/context/userContext";
import { v4 as uuid } from "uuid";
import { ModalEdit } from "../ModalEdit";
import { ModalDelete } from "../ModalDelete";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

export const Post = ({ postagem, getPost }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [likeNumber, setLikeNumber] = useState(0);

  const [isTruncated, setIsTruncated] = useState(true);

  if (!postagem) return null;

  const truncatedText =
    postagem.descricao &&
    postagem.descricao.slice(0, 200) +
      (postagem.descricao.length > 200 ? "..." : "");

  const toggleText = () => {
    setIsTruncated(!isTruncated);
  };

  const { user } = useUser();

  const verifyIsLiked = async () => {
    let usuario = await JSON.parse(localStorage.getItem("user"));
    try {
      const isLikedPromise = await fetch(
        `http://localhost:3000/curtidas?idPost=${postagem.id}&idUser=${usuario.id}`
      );

      const isLikedRes = await isLikedPromise.json();

      if (isLikedRes[0]) {
        setIsLiked(true);
        setLikeId(isLikedRes[0].id);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    try {
      const data = {
        id: uuid(),
        idUser: user.id,
        idPost: postagem.id,
      };

      await fetch("http://localhost:3000/curtidas", {
        method: "POST",
        body: JSON.stringify(data),
      });
      await getLikeNumber();
    } catch (error) {
      console.log(error);
    }
  };

  const deslikePost = async () => {
    try {
      await fetch(`http://localhost:3000/curtidas/${likeId}`, {
        method: "DELETE",
      });
      await getLikeNumber();
    } catch (error) {
      console.log(error);
    }
  };

  const getLikeNumber = async () => {
    
    try {
      await fetch("http://localhost:3000/curtidas?idPost=" + postagem.id)
        .then((res) => res.json())
        .then((res) => setLikeNumber(res.length));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikeNumber();
    verifyIsLiked();
  }, [isLiked]);

  return (
    <div className="flex flex-col gap-5 p-5 bg-primary/10 rounded-xl">
      <div className="flex items-center w-full gap-3">
        <img
          onClick={() => router.push(`/${postagem.userName}`)}
          className="w-10 rounded-[50px] max-sm:w-8 cursor-pointer"
          src={postagem.userImage}
        />
        <div className="flex w-full sm:items-center justify-between max-sm:flex-col">
          <a
            onClick={() => router.push(`/${postagem.userName}`)}
            className="text-xl font-medium hover:text-primary/50 max-sm:text-base cursor-pointer"
          >
            @{postagem.userName}
          </a>

          <span className="text-sm">
            {new Date(postagem.datePost).toLocaleString()}
          </span>
        </div>
      </div>
      <Separator className="bg-primary/20" />

      <p className="font-regular text-wrap break-words">
        {isTruncated ? truncatedText + " " : postagem.descricao + " "}
        {postagem.descricao && postagem.descricao.length > 200 && (
          <a
            className="font-medium underline cursor-pointer"
            onClick={toggleText}
          >
            {isTruncated ? "Ler mais" : "Ler menos"}
          </a>
        )}
      </p>
      {postagem.imagens && postagem.imagens.length > 0 && (
        <ImageCarousel images={postagem.imagens} />
      )}
      <div className="flex flex-row-reverse justify-between w-full items-center">
        {!JSON.parse(localStorage.getItem("user")) ? null : (
          <div className="flex gap-5 -mr-4">
            <p>{likeNumber}</p>
            <div
              className="cursor-pointer"
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? (
                <FaHeart onClick={() => deslikePost()} size={25} />
              ) : (
                <FaRegHeart onClick={() => likePost()} size={25} />
              )}
            </div>
            <CommentsModal postId={postagem.id} />
          </div>
        )}
        {JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id == postagem.userId && (
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setIsLiked(!isLiked)}
            >
              <ModalEdit getPost={getPost} postagem={postagem} />
            </div>
            <ModalDelete getPost={getPost} postagem={postagem} />
          </div>
        )}
      </div>
    </div>
  );
};
