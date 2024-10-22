"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Post } from "../Post";
import { cn } from "@/lib/utils";

export const TableProfile = ({ profile }) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const getPosts = async (items) => {
    try {
      let array = [];
      await items.forEach(async (item) => {
        await fetch("http://localhost:3000/postagens/" + item.idPost)
          .then((res) => res.json())
          .then((res) => {
            array.push(res);
          });
        setLikedPosts(array);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getLikedPosts = async () => {
    try {
      await fetch("http://localhost:3000/curtidas?idUser=" + profile.id)
        .then((res) => res.json())
        .then(async (res) => {
          await getPosts(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPosts = async () => {
    await fetch(`http://localhost:3000/postagens?userId=${profile.id}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setPosts(response);
      });
  };

  useEffect(() => {
    getLikedPosts();
    getMyPosts();
  }, []);

  const validadeOwnUser =
    profile &&
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user")).id == profile.id;

  return (
    <Tabs defaultValue="myposts" className="w-full">
      <TabsList
        className={cn(
          "grid w-full grid-cols-2",
          !validadeOwnUser && "grid-cols-1"
        )}
      >
        {validadeOwnUser && <TabsTrigger value="mylikes">Curtidas</TabsTrigger>}
        <TabsTrigger value="myposts">Posts</TabsTrigger>
      </TabsList>
      {validadeOwnUser && (
        <TabsContent className="overflow-y-auto max-h-[70vh]" value="mylikes">
          <div className="flex flex-col gap-6">
            {likedPosts
              .sort((a, b) => new Date(b.datePost) - new Date(a.datePost))
              .map((post) => (
                <Post getPost={getLikedPosts} postagem={post} key={post.id} />
              ))}
          </div>
        </TabsContent>
      )}
      <TabsContent className="overflow-y-auto max-h-[70vh]" value="myposts">
        <div className="flex flex-col gap-6">
          {posts.length > 0 &&
            posts
              .sort((a, b) => new Date(b.datePost) - new Date(a.datePost))
              .map((item) => <Post getPost={getMyPosts} postagem={item} key={item.id} />)}
        </div>
      </TabsContent>
    </Tabs>
  );
};
