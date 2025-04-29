import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function FormAddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  async function addUser(e) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/register",
        { ...user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("🚀 ~ addUser ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Register Failed!",
        text: "provide valid input",
      });
    }
  }

  return (
    <form onSubmit={addUser} id="add-user-form">
      <div className="mb-3">
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          className="form-control"
          placeholder="Username"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Email"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="form-control"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="btn btn-dark w-100 py-2 mt-5">
        Sign Up
      </button>
    </form>
  );
}
