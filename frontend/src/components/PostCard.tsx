import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Post } from "../pages/HomePage";
import "./PostCard.css";
import moment from "moment";
import { useContext } from "react";
import UserContext from "../context/UserContext";

type Props = {
  post: Post | any;
  handleLike: (postId: number) => void;
  handleDelete?: (postId: number) => void;
  repliesCount?: number | null;
  hideReplyButton?: boolean;
  hideReplies?: boolean;
};

const PostCard: React.FC<Props> = ({
  post,
  handleLike,
  repliesCount,
  hideReplyButton,
  hideReplies,
  handleDelete,
}) => {
  const { data } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <Card className="CardWrapper">
      <Card.Body>
        <Link to={`profile/${data?.user.id}`} className="CardName">
          <Card.Title>{`@${post.user.first_name} ${post.user.last_name}`}</Card.Title>
        </Link>
        <Card.Subtitle className="CardStatus">
          {moment(post.created_at).format("MMMM Do YYYY: h:mm a")}
        </Card.Subtitle>
        <Card.Text>
          {hideReplies ? post.reply_content : post.post_content}
        </Card.Text>
      </Card.Body>
      {!hideReplies && (
        <Card.Footer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div className="like-button" onClick={() => handleLike(post.id)}>
                <small className="">Like post</small>
              </div>
              {!hideReplyButton && (
                <>
                  <div
                    className="reply-button"
                    onClick={() => {
                      navigate(`/post/${post.id}`);
                    }}
                  >
                    <small className="">Reply</small>
                  </div>
                  <div
                    className="reply-button"
                    onClick={() => {
                      navigate(`/post/${post.id}`);
                    }}
                  >
                    <small className="">View Replies</small>
                  </div>
                  {(data?.user.id === post.user.id ||
                    data?.user.role === "Admin") &&
                    handleDelete && (
                      <div
                        className="reply-button"
                        onClick={() => {
                          handleDelete(post.id);
                        }}
                      >
                        <small className="">Delete</small>
                      </div>
                    )}
                </>
              )}
            </div>
            <div>
              <small className="text-muted">
                {post.like_counter} likes | {repliesCount ?? 0} Replies
              </small>
            </div>
          </div>
        </Card.Footer>
      )}
    </Card>
  );
};

export default PostCard;
