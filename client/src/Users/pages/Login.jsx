import axios from "axios";
import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let token = localStorage.getItem("access_token");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("userId", response.data.id);
      navigate("/home");
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "The email or password you entered is incorrect.",
      });
    }
  };

  async function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    try {
      const res = await axios.post("http://localhost:3000/google-login", {
        googleToken: response.credential,
      });
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/home");
    } catch (error) {
      console.log("🚀 ~ handleCredentialResponse ~ error:", error);
    }
  }

  function signInGoogle() {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("Google"), {
      theme: "outline",
      size: "large",
    });
  }

  useEffect(() => {
    if (token) {
      navigate("/home");
    }

    signInGoogle();
  }, []);

  return (
    <section className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="row shadow-lg rounded-4 overflow-hidden w-100"
        style={{ maxWidth: 1000 }}
      >
        <div className="col-md-6 p-5 bg-white">
          <h1 className="display-4 fw-bold mb-4">Login</h1>
          <form id="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="login-email"
                className="form-control"
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="login-password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="login-password"
                className="form-control"
                placeholder="Enter your password..."
                required=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-secondary w-100 py-2 mt-5">
              Log In
            </button>
          </form>
          <div id="Google" className="w-100 mt-3 Google"></div>
        </div>
        <div className="col-md-6 bg-dark-subtle text-black p-5 d-flex flex-column justify-content-center">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/474x/c2/1d/20/c21d200be3841d44eb0ab7ed5a634c32.jpg"
              alt="sofa"
              className="img-fluid img-zoom rounded-4"
              style={{ maxWidth: 300 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
