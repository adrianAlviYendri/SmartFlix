import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../features/MyCartSlice";

export default function MyCart() {
  const myCart = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Cart</h2>

      {myCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          {myCart.map((el) => (
            <div key={el.id} className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={el.posterPath}
                      alt={el.title}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="card-title">{el.title}</h5>
                        <p className="card-text text-muted mb-1">
                          Release:{" "}
                          {new Date(el.releaseDate).toLocaleDateString()}
                        </p>
                        <p className="card-text">{el.overview}</p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(decrementQuantity(el.id))}
                          >
                            −
                          </button>
                          <span className="btn btn-outline-secondary disabled">
                            {el.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => dispatch(incrementQuantity(el.id))}
                          >
                            +
                          </button>
                        </div>
                        <strong className="text-end text-primary">
                          {el.price}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
