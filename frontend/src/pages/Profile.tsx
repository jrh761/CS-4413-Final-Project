import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";
import "./HomePage.css";
import UserContext, { LoginToken, User } from "../context/UserContext";
import { useParams } from "react-router";
import axios from "../utils/api";

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { data } = useContext(UserContext);
  const [user, setUser] = useState<LoginToken | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUser(data);
    fetchUsers();
  }, [data]);

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

  const matchedUser = users.find((user) => user.id === parseInt(userId ?? "0"));

  return (
    <Container className="HomeContainer">
      <div className="HomeBodyDiv">
        <main>
          <section className="profile">
            {user?.isAuthenticated ? (
              <div>
                <img src="profile-picture.jpg" alt="Profile Picture" />
                <h2>{`${matchedUser?.first_name} ${matchedUser?.last_name}`}</h2>
                <p>Email: {matchedUser?.email}</p>
              </div>
            ) : (
              <p style={{ color: "black" }}>Loading user data...</p>
            )}
          </section>
        </main>
      </div>
    </Container>
  );
};

export default Profile;
