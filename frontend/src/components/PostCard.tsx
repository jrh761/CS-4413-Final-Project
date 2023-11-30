import "./PostCard.css";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function TextExample() {
  return (
    <Card className="CardWrapper">
      <Card.Body>
        <Link to="#Profile" className="CardName">
          <Card.Title>Name</Card.Title>
        </Link>
        <Card.Subtitle className="CardStatus">Status</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TextExample;