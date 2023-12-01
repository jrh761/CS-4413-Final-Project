import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostCard from "../components/PostCard";

import "./HomePage.css";
import axios from "../utils/api";
import UserContext from "../context/UserContext";
import CreatePost from "../components/CreatePost";
import { Post } from "./HomePage";
import { useParams } from "react-router";

const RepliesPage: React.FC = () => {
  const { postId } = useParams();
  const { data } = useContext(UserContext);

  const [post, setPost] = useState<Post | null>(null);
  const [repliesCount, setRepliesCount] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    getPost();
  }, [data]);

  useEffect(() => {
    if (!post) {
      return;
    }

    getReplies(post.id);
  }, [post]);

  const getReplies = async (postId: number) => {
    if (data && data?.access_token.length <= 0) {
      return;
    }
    try {
      const response = await axios.get(`/posts/replies/${postId}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        setRepliesCount({
          ...repliesCount,
          [postId]: response.data.length,
        });
      }
    } catch (error: any) {
      return;
    }
  };

  const getPost = async () => {
    if (data && data?.access_token.length <= 0) {
      return;
    }
    try {
      const response = await axios.get(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });

      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (error: any) {
      return;
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const response = await axios.post(
        `/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        }
      );

      if (response.status === 200) {
        setPost((prevPost) =>
          prevPost
            ? {
                ...prevPost,
                like_counter: prevPost.like_counter + 1,
              }
            : null
        );
      }
    } catch (error: any) {
      return;
    }
  };

  return (
    <div>
      {/* {data?.isAuthenticated ? (
        <div>
          <Container style={{ marginBottom: 20 }} className="HomeContainer">
            <div className="HomeBodyDiv">
              <CreatePost setPosts={setPosts} posts={posts} />
            </div>
          </Container>
          <Container className="HomeContainer">
            <div></div>
            <div className="HomeBodyDiv">
              <h1 className="HomeTitle">Latest Posts</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  marginTop: 20,
                }}
              >
                {posts.map((post) => {
                  const replyCount = repliesCount[post.id] ?? 0;
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      handleLike={handleLike}
                      repliesCount={replyCount}
                    />
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <Container className="HomeContainer">
          <h1>Welcome to the Social Media App</h1>
          <p>
            Create an account{" "}
            <a style={{ color: "whitesmoke" }} href="/register">
              here
            </a>{" "}
            to see what other users are posting!
          </p>
          <p>
            Already a user?{" "}
            <a style={{ color: "whitesmoke" }} href="/login">
              Log in here
            </a>
          </p>
        </Container>
      )} */}
    </div>
  );
};

export default RepliesPage;
