import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { fetchMovies } from "../features/MovieSlice";
import { addFavorite } from "../features/favoriteSlice";
import { useNavigate } from "react-router";
import { createCart } from "../features/MyCartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: movies, loading } = useSelector((state) => state.movies.list);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  const handleAddFavorite = (movieId) => {
    dispatch(addFavorite(movieId));
    navigate("favorite-list");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Movies Discover</h1>
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <Link to="favorite-list" className="btn btn-outline-primary w-25">
          <b>My Favorite List</b>
        </Link>
        <Link to="recomendation" className="btn btn-outline-success w-25">
          <b>Get Recommendations</b>
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map((movie) => (
          <div className="col" key={movie.id}>
            <div className="card shadow-sm h-100">
              <img
                src={movie.posterPath}
                className="card-img-top img-zoom"
                alt={movie.title}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <h6 className="card-title">Price : {movie.price}</h6>
                <p className="text-muted">
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toISOString().split("T")[0]}
                </p>
                <div className="d-flex gap-4">
                  <button
                    className="btn btn-gradient mt-auto w-100"
                    onClick={() => handleAddFavorite(movie.id)}
                  >
                    Add Favorite
                  </button>
                  <button
                    onClick={() => {
                      dispatch(createCart(movie));
                      navigate("/home/my-cart");
                    }}
                    className="btn btn-success mt-auto w-100"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
