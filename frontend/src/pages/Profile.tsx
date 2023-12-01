import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";
import "./HomePage.css";
import UserContext, { LoginToken, User } from "../context/UserContext";
import { useParams } from "react-router";
import axios from "../utils/api";
import { Post } from "./HomePage";
import PostCard from "../components/PostCard";

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { data } = useContext(UserContext);
  const [user, setUser] = useState<LoginToken | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [repliesCount, setRepliesCount] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    setUser(data);
    fetchUsers();
    fetchPostsByUser();
  }, [data]);

  useEffect(() => {
    posts.forEach((post) => {
      getReplies(post.id);
    });
  }, [posts]);

  const fetchPostsByUser = async () => {
    if (!user || !user.access_token || user.access_token.length <= 0) {
      return;
    }

    try {
      const response = await axios.get(`/posts/user/${user.user.id}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      if (response.status === 200) {
        const sortedPosts = response.data.sort((a: Post, b: Post) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        setPosts(sortedPosts);
      } else {
        setPosts([]);
      }
    } catch (error: any) {
      setPosts([]);
    }
  };

  const fetchUsers = async () => {
    if (!user || !user.access_token || user.access_token.length <= 0) {
      return;
    }

    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error: any) {
      setUsers([]);
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
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? { ...p, like_counter: p.like_counter + 1 } : p
          )
        );
      }
    } catch (error: any) {
      return;
    }
  };

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

  const handleDelete = async (postId: number) => {
    try {
      const response = await axios.delete(`/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });

      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      }
    } catch (error: any) {
      return;
    }
  };

  const matchedUser = users.find((user) => user.id === parseInt(userId ?? "0"));

  return (
    <div>
      <Container className="HomeContainer">
        <div className="HomeBodyDiv">
          <main>
            <section className="profile">
              {user?.user.first_name ? (
                <div>
                  <img src="profile-picture.jpg" alt="Profile Picture" />
                  <h2>{`@${matchedUser?.first_name} ${matchedUser?.last_name}`}</h2>
                  <p>Email: {matchedUser?.email}</p>
                </div>
              ) : (
                <p style={{ color: "black" }}>Loading user data...</p>
              )}
            </section>
          </main>
        </div>
      </Container>
      <Container className="HomeContainer">
        <div></div>
        <div className="HomeBodyDiv">
          <h1 className="HomeTitle">{`@${user?.user.first_name} ${user?.user.last_name}'s Posts`}</h1>
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
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
