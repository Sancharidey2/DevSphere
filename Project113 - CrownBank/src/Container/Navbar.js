import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Link, NavLink } from "react-router-dom";
import logoname from "../Images/logoname.png";
import "../index.css";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink to="/">
        <img src={logoname} alt="logo" className="logo_size" />
      </NavLink>
      <Link className="navbar-brand" href="/"></Link>

      <div className="navbar-expand-lg">
        <ul className="navbar-nav mr-auto ms-auto">
          <li className="nav-item  ">
            <NavLink className="nav-link spacing_navbar" exact to="/">
              Home{" "}
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link spacing_navbar" exact to="/Contact">
              Contact
            </NavLink>
          </li>
        </ul>
        <NavLink
          className="btn btn-primary spacing_nav"
          style={{
            display: "left",
            justifyContent: "center",
            alignItems: "left",
          }}
          exact
          to="/addUser"
          type="submit"
        >
          {<AddIcon />} Add User
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
