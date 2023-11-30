import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Post } from "../pages/HomePage";
import "./PostCard.css";
import moment from "moment";

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Card className="CardWrapper">
      <Card.Body>
        <Link to="#Profile" className="CardName">
          <Card.Title>{`${post.user.first_name} ${post.user.last_name}`}</Card.Title>
        </Link>
        <Card.Subtitle className="CardStatus">
          {moment(post.created_at).format("MMMM Do YYYY: h:mm a")}
        </Card.Subtitle>
        <Card.Text>{post.post_content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
