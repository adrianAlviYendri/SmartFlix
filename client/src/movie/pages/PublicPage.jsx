import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicMovies } from "../features/publicSlice";
import Swal from "sweetalert2";

export default function PublicPage() {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector((state) => state.public);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchPublicMovies(searchQuery)); // Fetch berdasarkan query
    }, 500); // Delay untuk debounce agar tidak spam request

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, dispatch]);

  const handleViewDetails = (movie) => {
    Swal.fire({
      title: movie.title,
      html: `
        <img src="${movie.posterPath}" alt="${
        movie.title
      }" style="width:100%; max-height:400px; object-fit:cover; border-radius:10px; margin-bottom:10px;">
        <p style="text-align:left;"><strong>Overview:</strong> ${
          movie.overview
        }</p>
        <p style="text-align:left;"><strong>Release Date:</strong> ${
          new Date(movie.releaseDate).toISOString().split("T")[0]
        }</p>
      `,
      confirmButtonText: "Cool!",
      confirmButtonColor: "#ff5733",
      background: "#222",
      color: "#fff",
      width: "50%",
    });
  };

  if (loading) return <h2 className="text-center mt-4">Loading...</h2>;
  if (error)
    return <h2 className="text-center mt-4 text-danger">Error: {error}</h2>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Public Movie List</h1>

      {/* 🔍 Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-4 col-md-6 mb-4" key={movie.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={movie.posterPath}
                className="card-img-top img-zoom"
                alt={movie.title}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p
                  className="card-text text-truncate"
                  style={{ maxHeight: "60px", overflow: "hidden" }}
                >
                  {movie.overview}
                </p>
                <p className="text-muted">
                  <small>
                    Release Date:{" "}
                    {new Date(movie.releaseDate).toISOString().split("T")[0]}
                  </small>
                </p>
                <button
                  className="btn btn-gradient mt-auto"
                  onClick={() => handleViewDetails(movie)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
