import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, deleteFavorite } from "../features/favoriteSlice";

export default function MyFavoriteList() {
  const dispatch = useDispatch();
  const {
    list: favorites,
    loading,
    error,
  } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleDelete = (MovieId) => {
    dispatch(deleteFavorite(MovieId));
  };

  if (loading) return <h2>Loading favorites...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Favorite List</h1>
      <div style={styles.grid}>
        {favorites?.length > 0 ? (
          favorites.map((item) =>
            item && item.Movie ? (
              <div key={item.Movie.id} style={styles.card}>
                <img
                  src={item.Movie.posterPath || "default-image.jpg"}
                  alt={item.Movie.title || "No Title"}
                  style={styles.image}
                />
                <div style={styles.content}>
                  <div>
                    <h3>{item.Movie.title || "Untitled Movie"}</h3>
                    <p>{item.Movie.overview || "No description available."}</p>
                  </div>

                  <div>
                    <p style={styles.releaseDate}>
                      Release Date:{" "}
                      {item.Movie.releaseDate
                        ? new Date(item.Movie.releaseDate)
                            .toISOString()
                            .split("T")[0]
                        : "Unknown"}
                    </p>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(item.MovieId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease",
    cursor: "pointer",
    height: "100%", // Pastikan card mengisi seluruh ruang yang tersedia
  },
  image: {
    width: "100%",
    height: "500px",
    objectFit: "cover",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1, // Ini memungkinkan bagian konten berkembang
    padding: "16px",
    justifyContent: "space-between",
  },
  releaseDate: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "auto", // Membuat tombol delete tetap berada di bawah
    width: "100%",
    transition: "background-color 0.3s ease",
  },
};
