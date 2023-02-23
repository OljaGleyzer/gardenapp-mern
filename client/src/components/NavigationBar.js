import "./NavBar.css";
import { getToken } from "../utils/getToken";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

function NavigationBar() {
  const { logout } = useContext(AuthContext);
  const token = getToken();
  return (
    <>
      <header className="nav-bar">
        <a href="/" className="logo">
          {" "}
          Garden App{" "}
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            {" "}
            <a href="/">plants</a>{" "}
          </li>
          {token ? (
            <li>
              {" "}
              <a href="/myprofile">My Profile</a>
            </li>
          ) : (
            <li>
              {" "}
              <a href="/login">log in</a>{" "}
            </li>
          )}
          <li>
            {" "}
            {token && (
              <a href="/login" onClick={() => logout(getToken, logout)}>
                logout
              </a>
            )}
          </li>
          <li> {!token && <a href="/signup">sign up</a>}</li>
        </ul>{" "}
      </header>{" "}
    </>
  );
}

export default NavigationBar;
