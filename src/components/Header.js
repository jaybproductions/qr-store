import React, { useContext } from "react";
import firebase from "../firebase";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Header = (props) => {
  const { user } = useContext(UserContext);
  async function LogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/login");
      console.log("You are now logged out.");
    } catch (err) {
      console.error("Unable to log out", err);
      console.log(err.message);
    }
  }

  return (
    <div className="header">
      <div className="title">
        <Link to={"/home"} style={{ color: "white" }}>
          <h3>QR Store</h3>
        </Link>
      </div>

      <div className="user-info">
        {user ? (
          <>
            <p>Hello, {user.displayName}</p>
            <button type="button" className="btn btn-dark" onClick={LogoutUser}>
              logout
            </button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Link to={"/login"}>
              <button type="button" className="btn btn-dark">
                Login
              </button>{" "}
            </Link>
            <Link to={"/signup"}>
              <button type="button" className="btn btn-dark">
                Sign Up
              </button>{" "}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
