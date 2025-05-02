import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  toggleSelectItem,
  clearSelectedItems,
  selectCheckoutTotal,
} from "../features/MyCartSlice";
import { useEffect } from "react";

export default function MyCart() {
  const userId = Number(localStorage.getItem("userId"));
  const dispatch = useDispatch();

  const myCart = useSelector((state) =>
    state.cart.list.filter((item) => item.userId === userId)
  );

  const selectedItems = useSelector((state) =>
    state.cart.selectedItems
      .filter((item) => item.userId === userId)
      .map((item) => item.id)
  );

  const totalCheckout = useSelector(selectCheckoutTotal(userId));

  const isAllSelected =
    selectedItems.length === myCart.length && myCart.length > 0;

  const handleToggleAll = () => {
    if (isAllSelected) {
      dispatch(clearSelectedItems());
    } else {
      myCart.forEach((item) => dispatch(toggleSelectItem(item.id)));
    }
  };

  useEffect(() => {
    console.log("🚀 ~ MyCart ~ totalCheckout:", totalCheckout);
    console.log("🚀 ~ MyCart ~ myCart:", myCart);
  }, [myCart]);

  function handlerMidtrans() {
    try {
      window.snap.pay("", {
        onSuccess: function (result) {
          /* You may add your own implementation here */

          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */

          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */

          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
        },
      });
    } catch (error) {
      console.log("🚀 ~ handlerMidtrans ~ error:", error);
    }
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Cart</h2>

      {myCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <input
                className="custom-switch"
                type="checkbox"
                id="selectAll"
                checked={isAllSelected}
                onChange={handleToggleAll}
              />
              <label htmlFor="selectAll" className="form-label m-0">
                {isAllSelected
                  ? "Batalkan Semua"
                  : "Pilih Semua untuk Checkout"}
              </label>
            </div>

            <div>
              <div className="mb-3 text-end">
                <button
                  className="btn btn-success px-5"
                  onClick={handlerMidtrans}
                >
                  Pay
                </button>
              </div>

              <h5 className="text-end">
                Total Checkout:{" "}
                <span className="text-success">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalCheckout)}
                </span>
              </h5>
            </div>
          </div>

          <div className="row g-4">
            {myCart.map((el) => (
              <div key={el.id} className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="row g-0">
                    <div className="col-md-6">
                      <img
                        src={el.posterPath}
                        alt={el.title}
                        className="img-fluid rounded-start object-cover"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body d-flex flex-column justify-content-between h-100">
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <input
                              className="custom-switch"
                              type="checkbox"
                              id={`select-${el.id}`}
                              checked={selectedItems.includes(el.id)}
                              onChange={() => {
                                const data = { id: el.id, userId };
                                dispatch(toggleSelectItem(data));
                              }}
                            />
                            <label
                              htmlFor={`select-${el.id}`}
                              className="form-label m-0"
                            >
                              Checkout film ini
                            </label>
                          </div>

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
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(el.price)}
                          </strong>
                        </div>

                        <div className="mt-2 text-end">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => dispatch(removeFromCart(el.id))}
                          >
                            🗑 Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
