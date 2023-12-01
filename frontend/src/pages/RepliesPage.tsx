import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostCard from "../components/PostCard";

import "./HomePage.css";
import axios from "../utils/api";
import UserContext from "../context/UserContext";
import CreatePost from "../components/CreatePost";
import { Post } from "./HomePage";
import { useParams } from "react-router";
import CreateReply from "../components/CreateReply";

const RepliesPage: React.FC = () => {
  const { postId } = useParams();
  const { data } = useContext(UserContext);

  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Post[]>([]);

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
        const sortedReplies = response.data.sort((a: Post, b: Post) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        setReplies(sortedReplies);
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
      <div>
        <Container className="HomeContainer">
          <div></div>
          <div className="HomeBodyDiv">
            <h1 className="HomeTitle">View Post</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                marginTop: 20,
              }}
            >
              {post && (
                <PostCard
                  key={post.id}
                  post={post}
                  handleLike={handleLike}
                  repliesCount={replies.length}
                  hideReplyButton={true}
                />
              )}
            </div>
          </div>
        </Container>
        <Container className="HomeContainer">
          <div className="HomeBodyDiv">
            <CreateReply
              setReplies={setReplies}
              replies={replies}
              postId={post?.id ?? 0}
              post={post ?? null}
            />
          </div>
        </Container>
        <Container className="HomeContainer">
          <div></div>
          <div className="HomeBodyDiv">
            <h1 className="HomeTitle">Replies</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                marginTop: 20,
              }}
            >
              {replies.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    handleLike={handleLike}
                    hideReplyButton={true}
                    hideReplies={true}
                  />
                );
              })}
              {replies.length <= 0 && (
                <h5 style={{ marginLeft: 50 }}>
                  Be the first to say something!
                </h5>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RepliesPage;
