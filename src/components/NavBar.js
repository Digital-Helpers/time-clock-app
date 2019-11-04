// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../utils/react-auth0-wrapper";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, loginWithPopup, logout  } = useAuth0();
console.log(window.location.origin)
  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithPopup({})
          }
        >
          Log in
        </button>
      )}
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
      </span>
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;