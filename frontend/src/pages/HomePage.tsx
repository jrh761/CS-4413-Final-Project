import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostCard from "../components/PostCard";

import "./HomePage.css";
import axios from "../utils/api";
import UserContext from "../context/UserContext";

export type User = {
  first_name: string;
  last_name: string;
  profile_picture: string;
  email: string;
  role: string;
};

export type Post = {
  post_content: string;
  post_image: string;
  id: number;
  created_at: string;
  like_counter: number;
  user: User;
};

const HomePage: React.FC = () => {
  const { data } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, [data]);

  const getPosts = async () => {
    if (data && data?.access_token.length <= 0) {
      return;
    }
    try {
      const response = await axios.get("/posts", {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        setPosts(response.data);
      }
    } catch (error: any) {
      setPosts([]);
    }
  };

  return (
    <Container className="HomeContainer">
      <div className="HomeBodyDiv">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
