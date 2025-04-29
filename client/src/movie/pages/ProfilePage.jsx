import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../features/profileSlice";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const {
    data: profile,
    loading,
    error,
  } = useSelector((state) => state.profile);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setNewUsername(profile.username);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ username: newUsername }));
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been successfully updated!",
      confirmButtonColor: "#007bff",
    });
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Profile</h1>
      {profile ? (
        <div style={styles.card}>
          <FaUserCircle size={100} color="#007bff" style={styles.icon} />
          <h2 style={styles.username}>{profile.username}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <FaEdit style={styles.editIcon} />
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              Update Profile
            </button>
          </form>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  card: {
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    display: "inline-block",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    width: "350px",
  },
  icon: {
    marginBottom: "10px",
  },
  username: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  form: {
    marginTop: "10px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  editIcon: {
    marginRight: "8px",
    color: "#888",
  },
  input: {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "16px",
    backgroundColor: "transparent",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};
