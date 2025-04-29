import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Logout() {
  const navigate = useNavigate();

  function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");

        Swal.fire({
          title: "Logged out!",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/");
      }
    });
  }

  return (
    <button
      type="button"
      className="btn btn-outline-success"
      onClick={logout}
      style={{ width: "100%" }}
    >
      <b>Log out</b>
    </button>
  );
}
