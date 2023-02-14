import "./NavBar.css";

function NavigationBar() {
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
          <li>
            {" "}
            <a href="/login">log in</a>
          </li>
          <li>
            {" "}
            <a href="/signup">sign up</a>{" "}
          </li>
        </ul>{" "}
      </header>{" "}
    </>
  );
}

export default NavigationBar;
