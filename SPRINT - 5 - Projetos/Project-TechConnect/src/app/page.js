"use client";

import { Container } from "@/components/Container";
import { ModalPost } from "@/components/ModalPost";
import { Post } from "@/components/Post";
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { user, setUser } = useUser();
  const [postagens, setPostagens] = useState([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getPost = () => {
    try {
      fetch("http://localhost:3000/postagens")
        .then((response) => response.json())
        .then((response) => {
          setPostagens(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    getPost();
  }, []);

  return (
    <main>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] bg-primary origin z-[100] origin-top-left"
        style={{ scaleX }}
      />
      <Container>
        {!user ? null : <ModalPost getPost={getPost} />}
        {postagens.length > 0 &&
          postagens
            .sort((a, b) => new Date(b.datePost) - new Date(a.datePost))
            .map((postagem) => (
              <Post getPost={getPost} key={postagem.id} postagem={postagem} />
            ))}
      </Container>
    </main>
  );
}
