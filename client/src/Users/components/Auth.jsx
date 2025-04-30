import { Link, Outlet } from "react-router";
import { useNavigate } from "react-router";
import Logout from "./Logout";
import { useEffect } from "react";

export default function Auth() {
  const navigate = useNavigate();

  let token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            Movie Recommender
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="profile" className="btn btn-outline-secondary mx-2">
                  <b>Profile</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/home/my-cart"
                  className="btn btn-outline-warning mx-2"
                >
                  🛒 Cart
                </Link>
              </li>
              <li className="nav-item">
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
