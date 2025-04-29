import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../features/recommendationSlice";

export default function RecommendationPage() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(
    (state) => state.recommendation
  );
  const [preferences, setPreferences] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRecommendations(preferences));
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Movie Recommendations</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center mb-4"
      >
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Masukkan preferensi (contoh: saya suka film remaja)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Dapatkan Rekomendasi
        </button>
      </form>

      {loading && (
        <h2 className="text-center text-warning">Loading brooooo...</h2>
      )}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      <div className="row g-4">
        {movies.map((movie, index) => (
          <div key={index} className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <p className="card-text">
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="card-text">
                  <strong>Tahun:</strong> {movie.year}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {movie.rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
