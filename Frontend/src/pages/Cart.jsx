import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  removeFromCart,
  subtractQuantity,
} from "../redux/actions/cartActions";
import "../styles/Cart.css";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import EmptyCart from "../images/empty-cart.png";
import axios from "axios";

function Cart() {
  const item = useSelector((state) => state.items);
  const { productID, quantity } = item;
  const dispatch = useDispatch();
  const amount = item.reduce(
    (sum, curr) => sum + curr.price * curr.quantity,
    0
  );

  const user = useSelector((state) => state.user);
  const { userID } = user;

  const add = (x) => {
    dispatch(addQuantity(x.id));
    axios.put("https://localhost:7052/api/Cart/edit-in-cart", {
      userID: userID,
      productID: x.productID,
      quantity: x.quantity + 1,
      totalAmount: (x.quantity + 1) * x.price,
    });
  };

  const sub = (x) => {
    dispatch(subtractQuantity(x.id));
    console.log(x.quantity);
    if (x.quantity > 1) {
      axios.put("https://localhost:7052/api/Cart/edit-in-cart", {
        userID: userID,
        productID: x.productID,
        quantity: x.quantity - 1,
        totalAmount: (x.quantity - 1) * x.price,
      });
    }
  };

  const remove = (x) => {
    dispatch(removeFromCart(x.id));
    console.log(x.productID);
    console.log(userID);
    axios.delete("https://localhost:7052/api/Cart/delete-from-cart", {
      data: {
        userID: userID,
        productID: x.productID,
      },
    });
  };

  // console.log(amount);
  return (
    <div className="car-conatiner">
      <h1 className="cart-head">Cart</h1>
      {item.length > 0 ? (
        <div>
          {item.map((x) => (
            <>
              <div className="Cart-Items">
                <div className="image-box">
                  <img src={x.image} style={{ height: "120px" }} />
                </div>

                <h5 className="cart-title"> {x.title}</h5>
                <div className="about">
                  <div className="counter">
                    <button className="cart-btn" onClick={() => sub(x)}>
                      -
                    </button>
                    <div className="count"> {x.quantity}</div>
                    <button className="cart-btn" onClick={() => add(x)}>
                      +
                    </button>
                    <button className="remove" onClick={() => remove(x)}>
                      <RiDeleteBinFill />
                    </button>
                  </div>

                  <div className="price">
                    <div className="amount">Rs. {x.quantity * x.price}</div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <br />
          <hr />

          <div className="check">
            <div className="total">
              <div className="total-amount">
                Total - Rs. <span>{amount}</span>
              </div>
            </div>
            <Link to={"/checkout"}>
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <img src={EmptyCart} />
        </div>
      )}
    </div>
  );
}

export default Cart;
