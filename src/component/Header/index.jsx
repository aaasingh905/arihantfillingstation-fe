import React, { useContext } from "react";
import "./index.css";
import { Link, Navigate } from "react-router-dom";
import Logo from "./logo";
import { UserContext } from "../../store/UserStore";

function Header() {
  const { user, updateUserStore } = useContext(UserContext);
  const { token } = user;
  return (
    <div className="header-main-container">
      <Logo />
      {token && (
        <>
          <ul className="nav-list-container">
            <li>
              <Link className="nav-links" to="/add">
                Add Record
              </Link>{" "}
            </li>
            <li>
              <Link className="nav-links" to="/view">
                View Record
              </Link>{" "}
            </li>
            <li>
              <Link className="nav-links" to="/users">
                User Accounts
              </Link>{" "}
            </li>
          </ul>
          <div>
            <ul className="nav-list-container">
              <li>
                <button
                  className="nav-buttons"
                  onClick={() => updateUserStore({ token: "" })}
                  type="button"
                >
                  Logout
                </button>{" "}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
