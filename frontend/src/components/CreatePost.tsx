import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Post } from "../pages/HomePage";

import axios from "../utils/api";

import UserContext from "../context/UserContext";

import "./Header.css";
import "./PostCard.css";

type Props = {
  setPosts: (posts: Post[]) => void;
  posts: Post[];
};

const CreatePost: React.FC<Props> = ({ posts, setPosts }) => {
  const { data } = useContext(UserContext);

  const [postContent, setPostContent] = useState("");

  const handlePost = async () => {
    if (postContent.length <= 0) {
      return;
    }

    const formData = {
      post_content: postContent,
      post_image: "",
    };

    try {
      const response = await axios.post("/posts/create", formData, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });

      if (response.status === 200) {
        setPosts([response.data, ...posts]);
        setPostContent("");
      }
    } catch (error: any) {
      setPosts([]);
    }
  };

  return (
    <div>
      <h2 className="PostTitle">Create Post</h2>
      <Form className="PostWrapper">
        <Form.Group className="py-4" controlId="postContent">
          <Form.Control
            className="py-4"
            as="textarea"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="py-4">
            <Button
              className="HeaderButton"
              style={{ float: "right", width: 100 }}
              variant="primary"
              onClick={handlePost}
            >
              Post
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreatePost;
