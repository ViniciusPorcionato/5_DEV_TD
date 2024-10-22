"use client";
import { Container } from "@/components/Container";
import { HeaderBack } from "@/components/Header";
import { SearchInput } from "@/components/Input";
import { Post } from "@/components/Post";
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState(null);

  const { user } = useUser();

  const getPost = () => {
    return fetch("http://localhost:3000/postagens")
      .then((response) => response.json())
      .then((response) => {
        setAllPosts(response);
        setFilteredPosts(response);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleSearch = (query) => {
    setSearchItem(query);
    if (query === "") {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts?.filter((post) => {
        return (
          post.descricao.toLowerCase().includes(query.toLowerCase()) ||
          post.userName.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredPosts(filtered);
    }
  };

  return (
    <Container>
      <SearchInput
        value={searchItem}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filteredPosts &&
        filteredPosts.map((postagem) => (
          <Post getPost={getPost} key={postagem.id} postagem={postagem} />
        ))}
    </Container>
  );
};

export default SearchPage;
