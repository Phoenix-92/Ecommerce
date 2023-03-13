import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/actions/cartActions";
import tick from "../images/checked.png";
import "../styles/Checkout.css";

function Contact() {
  const item = useSelector((state) => state.items);
  console.log(item);
  const amount = item.reduce(
    (sum, curr) => sum + curr.price * curr.quantity,
    0
  );

  const Order = () => {
    return (
      <div className="checkout-container">
        {item.length > 0 ? (
          <div className="order-summary">
            <h1 style={{ textAlign: "center" }}>Order Summary</h1>
            <hr />
            <div>
              {item.map((x) => (
                <>
                  <div className="Check-Items">
                    <div className="image-box">
                      <img src={x.image} style={{ height: "30px" }} />
                    </div>

                    <p className="checkout-title"> {x.title}</p>

                    <div className="check-amount">
                      <span>Rs. {x.quantity * x.price}</span>
                    </div>
                  </div>
                  <br />
                  <hr />
                </>
              ))}
              <br />

              <div className="check-total-amount">
                <span> Total - Rs. {amount}</span>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const dispatch = useDispatch();
  const [formvalue, setFormvalue] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [formerror, setFormerror] = useState({});
  const [issubmit, setSubmit] = useState(false);

  const handlevalidation = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setFormerror(validationform(formvalue));
    setSubmit(true);
  };

  const validationform = (value) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.fname) {
      errors.fname = "Please Enter first Name";
    }

    if (!value.lname) {
      errors.lname = "Please Enter last Name";
    }

    if (!value.mobile) {
      errors.mobile = "Please Enter Mobile Number";
    }
    if (value.mobile.length != 10) {
      errors.mobile = "Invalid Mobile Number";
    }

    if (!value.email) {
      errors.email = "Please Enter Email";
    } else if (!emailPattern.test(value.email)) {
      errors.email = "Enter Valid Email";
    }
    if (!value.address) {
      errors.address = "Please Enter Address";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formerror).length === 0 && issubmit) {
      console.log(formvalue);
      dispatch(emptyCart());
    }
  }, [formerror, formvalue, issubmit]);

  return (
    <React.Fragment>
      {!(Object.keys(formerror).length === 0 && issubmit) ? (
        <Container>
          <h3 className="checkout-header">Checkout</h3>
          <div className="form-order">
            <form onSubmit={handlesubmit} className="check-form">
              <div className="first-name">
                <label className="first-name-label">
                  First Name<span className="astriccolor">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  value={formvalue.fname}
                  onChange={handlevalidation}
                />
                <span className="text-span">{formerror.fname} </span>
              </div>
              <br />
              <div className="last-name">
                <label className="last-name-label">
                  Last Name<span className="astriccolor">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  value={formvalue.lname}
                  onChange={handlevalidation}
                />
                <span className="text-span">{formerror.lname} </span>
              </div>
              <br />
              <div className="mobile">
                <label className="mobile-label">
                  Mobile No.<span className="astriccolor">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={formvalue.mobile}
                  onChange={handlevalidation}
                />
                <span className="text-span">{formerror.mobile} </span>
              </div>
              <br />
              <div className="email">
                <label className="email-label">
                  Email<span className="astriccolor">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formvalue.email}
                  onChange={handlevalidation}
                />
                <span className="text-span">{formerror.email} </span>
              </div>
              <br />
              <div className="address">
                <label className="address-label">
                  Address<span className="astriccolor">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  value={formvalue.address}
                  onChange={handlevalidation}
                />
                <span className="text-span">{formerror.address} </span>
              </div>
              <br />
              <div className="select-pay">
                <label htmlFor="payment">Choose payment method</label>
                <br />
                <select required>
                  <option value="Cash">Cash</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Online">Net-banking</option>
                </select>
              </div>

              <button className="order-btn" name="button">
                Place Your Order
              </button>
            </form>
            <Order />
          </div>
        </Container>
      ) : (
        <div className="thanks-page">
          <h1>Thank you , {formvalue.fname} ! </h1>
          <img src={tick} alt="tick" style={{ width: "30px" }} />
          <p>Your order has been placed</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Contact;
