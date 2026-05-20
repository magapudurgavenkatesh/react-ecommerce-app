import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const totalPrice = cart.reduce(

  (total, item) =>

    total + item.price * item.quantity,

  0
);
  return (
    <>
      <div className="container my-5" style={{ maxWidth: "750px" }}>

        {cart.length == 0 ? (

          <div className="text-center">

            <h1>Your Cart is Empty</h1>

            <Link to="/" className="btn btn-warning">
              Continue Shopping...
            </Link>

          </div>

        ) : (

          cart.map((product) => {
            return (
              <div key={product.id} className="card mb-3 my-3 cart-card">
                <div className="row g-2 align-items-center">
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      src={product.imgSrc}
                      className="img-fluid rounded-start"
                      alt={product.title}
                      style={{

                        height: "220px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius:"10px",
                      }}
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body text-center   ">
                      <h5 className="card-title">{product.title}</h5>

                      <p className="card-text">{product.description}</p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button className="btn btn-primary">
                          {product.price} ₹
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            const updatedCart = cart

                              .map((item) =>
                                item.id === product.id
                                  ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                    }
                                  : item,
                              )

                              .filter((item) => item.quantity > 0);

                            setCart(updatedCart);
                          }}
                        >
                          -
                        </button>

                        <h5>{product.quantity}</h5>

                        <button
                          className="btn btn-success"
                          onClick={() => {
                            const updatedCart = cart.map((item) =>
                              item.id === product.id
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                  }
                                : item,
                            );

                            setCart(updatedCart);
                          }}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            const updatedCart = cart.filter(
                              (item) => item.id !== product.id,
                            );

                            setCart(updatedCart);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {cart.length != 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h3 className="mx-5">
              Total: ₹ {totalPrice}
          </h3>
          <button className="btn btn-warning mx-5" onClick={()=>alert("Order Placed")}>
            CheckOut
          </button>

          <button
            onClick={() => setCart([])}
            className="btn btn-danger"
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;