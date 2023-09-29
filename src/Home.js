import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className= "text-center my-">
      <h1 className="Home-h1">Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      <Link to="/login">
      <Button
          variant="primary"
          type="submit"
          className="p-2"
        >
          Log In
        </Button>
        </Link>
        <Link to="/signup">
        <Button
          variant="primary"
          type="submit"
          className="p-2 m-2"
        >
          Sign Up
        </Button>
        </Link>
    </div>
  );
};

export default Home;
