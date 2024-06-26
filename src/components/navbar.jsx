import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  const hasUser = Object.keys(user).length > 0;
  return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <NavLink className="navbar-brand" to="/blogs">
          GrandShipper
        </NavLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <NavLink className="nav-link" to="/blogs">
             Blogs <span className="sr-only">(current)</span>
            </NavLink>
            </li>
            {!hasUser && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}

            {hasUser && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/about-us">
                  About Us
                </NavLink>
              </li>

          </ul>
        </div>
      </nav>
 
  );
};

export default Navbar;