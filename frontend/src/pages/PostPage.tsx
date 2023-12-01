import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostCard from "../components/PostCard";

import "./HomePage.css";
import axios from "../utils/api";
import UserContext from "../context/UserContext";
import CreatePost from "../components/CreatePost";

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

const PostPage: React.FC = () => {
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
        const sortedPosts = response.data.sort((a: Post, b: Post) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        setPosts(sortedPosts);
      }
    } catch (error: any) {
      setPosts([]);
    }
  };

  return <div></div>;
  //     <div>
  //       {data?.isAuthenticated ? (
  //         <div>
  //           <Container style={{ marginBottom: 20 }} className="HomeContainer">
  //             <div className="HomeBodyDiv">
  //               <CreatePost setPosts={setPosts} posts={posts} />
  //             </div>
  //           </Container>
  //           <Container className="HomeContainer">
  //             <div></div>
  //             <div className="HomeBodyDiv">
  //               <h1 className="HomeTitle">Latest Posts</h1>
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   flexDirection: "column",
  //                   gap: 20,
  //                   marginTop: 20,
  //                 }}
  //               >
  //                 {posts.map((post) => (
  //                   <PostCard key={post.id} post={post} />
  //                 ))}
  //               </div>
  //             </div>
  //           </Container>
  //         </div>
  //       ) : (
  //         <Container className="HomeContainer">
  //           <h1>Welcome to the Social Media App</h1>
  //           <p>
  //             Create an account{" "}
  //             <a style={{ color: "whitesmoke" }} href="/register">
  //               here
  //             </a>{" "}
  //             to see what other users are posting!
  //           </p>
  //           <p>
  //             Already a user?{" "}
  //             <a style={{ color: "whitesmoke" }} href="/login">
  //               Log in here
  //             </a>
  //           </p>
  //         </Container>
  //       )}
  //     </div>
  //   );
};

export default PostPage;
