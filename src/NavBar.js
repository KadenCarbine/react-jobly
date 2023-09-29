import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="NavBar-Jobly">
            <Link to="/">Jobly</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
