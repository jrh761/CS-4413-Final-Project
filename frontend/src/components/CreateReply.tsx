import React, { Dispatch, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Post } from "../pages/HomePage";

import axios from "../utils/api";

import UserContext from "../context/UserContext";

import "./Header.css";
import "./PostCard.css";

type Props = {
  replies: Post[];
  setReplies: Dispatch<React.SetStateAction<Post[]>>;
  postId: number;
  post: Post | null;
};

const CreateReply: React.FC<Props> = ({
  replies,
  setReplies,
  postId,
  post,
}) => {
  const { data } = useContext(UserContext);

  const [reply, setReply] = useState("");

  const handleReply = async () => {
    if (data && data?.access_token.length <= 0) {
      return;
    }
    try {
      const postData = { reply_content: reply };
      const response = await axios.post(`/posts/reply/${postId}`, postData, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });

      if (response.status === 200) {
        setReplies([response.data, ...replies]);
        setReply("");
      }
    } catch (error: any) {
      return;
    }
  };

  return (
    <div>
      <h2 className="PostTitle">Reply</h2>
      <Form className="PostWrapper">
        <Form.Group className="py-4" controlId="postContent">
          <Form.Control
            className="py-4"
            as="textarea"
            placeholder={
              post
                ? `Reply to @${post.user.first_name} ${post.user.last_name}`
                : "Reply"
            }
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <div className="py-4">
            <Button
              className="HeaderButton"
              style={{ float: "right", width: 100 }}
              variant="primary"
              onClick={handleReply}
            >
              Reply
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateReply;
