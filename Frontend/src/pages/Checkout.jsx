import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/actions/cartActions";
import tick from "../images/checked.png";
import "../styles/Checkout.css";
import axios from "axios";

function Contact() {
  const user = useSelector((state) => state.user);
  const {
    userID,
    firstName,
    lastName,
    mobile,
    email,
    state,
    country,
    address,
    pincode,
  } = user;
  const [paymentMode, setPaymentMode] = useState("");
  const item = useSelector((state) => state.items);
  console.log(item);
  const amount = item.reduce(
    (sum, curr) => sum + curr.price * curr.quantity,
    0
  );

  const res = null;

  const place = () => {
    let payment_details;
    if (paymentMode == "cash") {
      payment_details = "cash";
    } else if (paymentMode == "UPI") {
      payment_details = formvalue.UPI_ID;
    } else {
      payment_details =
        formvalue.cardNo + "|" + formvalue.cvv + "|" + formvalue.expDate;
    }
    console.log(userID);
    axios
      .post("https://localhost:7052/api/Checkout/Add-order-details", {
        userID: userID,
        paymentType: paymentMode,
        totalPayment: amount,
        paymentDetails: payment_details,
      })
      .then((response) =>
        axios
          .post("https://localhost:7052/api/Checkout/Add-order-products", {
            userID: userID,
            orderId: response.data[0].orderId,
          })
          .then(
            (res) =>
              axios.delete(
                "https://localhost:7052/api/Checkout/delete-user-cart",
                {
                  data: {
                    userID: userID,
                  },
                }
              ),
            console.log(res)
          )
      );
  };

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
    cardNo: "",
    cvv: "",
    expDate: "",
    UPI_ID: "",
  });
  const [formerror, setFormerror] = useState({});
  const [issubmit, setSubmit] = useState(false);

  const handlevalidation = (e) => {
    console.log(e.target);
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

    if (!value.cardNo) {
      errors.cardNo = "Please Enter Card No.";
    } else if (value.cardNo.length < 12) {
      errors.cardNo = "Invalid Card No.";
    }

    if (!value.cvv) {
      errors.cvv = "Please Enter CVV";
    } else if (value.cvv.length < 3) {
      errors.cvv = "Invalid CVV";
    }

    if (!value.expDate) {
      errors.expDate = "Please Enter expiry date";
    }

    return errors;
  };

  function addSlash() {
    if (formvalue.expDate.length == 2) {
      let temp = formvalue.expDate + "/";
      setFormvalue({ ...formvalue, ["expDate"]: temp });
    }
  }

  useEffect(() => {
    if (Object.keys(formerror).length === 0 && issubmit) {
      console.log(formvalue);
      dispatch(emptyCart());
    }
  }, [formerror, formvalue, issubmit]);
  const changeModeOfPayment = (e) => {
    setPaymentMode(e.target.value);
  };
  return (
    <React.Fragment>
      {!(Object.keys(formerror).length === 0 && issubmit) ? (
        <div>
          <h3 className="checkout-header">Checkout</h3>
          <div className="checkout-form">
            <form onSubmit={handlesubmit} className="check-form">
              <div className="first-name">
                <label className="first-name-label">
                  First Name<span className="astric">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  value={formvalue.fname}
                  onChange={handlevalidation}
                  placeholder={firstName}
                />
                <span className="text-span">{formerror.fname} </span>
              </div>
              <br />
              <div className="last-name">
                <label className="last-name-label">
                  Last Name<span className="astric">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  value={formvalue.lname}
                  onChange={handlevalidation}
                  placeholder={lastName}
                />
                <span className="text-span">{formerror.lname} </span>
              </div>
              <br />
              <div className="mobile">
                <label className="mobile-label">
                  Mobile No.<span className="astric">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={formvalue.mobile}
                  onChange={handlevalidation}
                  placeholder={mobile}
                />
                <span className="text-span">{formerror.mobile} </span>
              </div>
              <br />
              <div className="email">
                <label className="email-label">
                  Email<span className="astric">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formvalue.email}
                  onChange={handlevalidation}
                  placeholder={email}
                />
                <span className="text-span">{formerror.email} </span>
              </div>
              <br />
              <div className="address">
                <label className="address-label">
                  Address<span className="astric">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  value={formvalue.address}
                  onChange={handlevalidation}
                  placeholder={address}
                />
                <span className="text-span">{formerror.address} </span>
              </div>
              <br />

              <div className="select-pay">
                <label htmlFor="payment" className="payment">
                  Choose payment option*
                </label>
                <select
                  required
                  onChange={(e) => {
                    changeModeOfPayment(e);
                  }}
                >
                  <option value="Cash">Cash</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Online">UPI</option>
                </select>
                {paymentMode == "Debit Card" ? (
                  <>
                    <div className="card_details">
                      <div className="card-no">
                        <label className="card-no-label">
                          Card No.<span className="astriccolor">*</span>
                        </label>
                        <input
                          maxLength="12"
                          type="tel"
                          className="form-control"
                          name="cardNo"
                          value={formvalue.cardNo}
                          onChange={handlevalidation}
                          placeholder="Card Number"
                        />
                        <span className="text-span">{formerror.cardNo} </span>
                      </div>
                      <br />
                      <div className="cvv_expiry">
                        <div className="cvv">
                          <label className="cvv-label">
                            CVV<span className="astriccolor">*</span>
                          </label>
                          <input
                            maxLength="3"
                            type="tel"
                            className="form-control"
                            name="cvv"
                            value={formvalue.cvv}
                            onChange={handlevalidation}
                            placeholder="CVV"
                          />
                          <span className="text-span">{formerror.cvv} </span>
                        </div>
                        <br />

                        <div className="exp-date">
                          <label className="exp-date-label">
                            Expiry date<span className="astriccolor">*</span>
                          </label>
                          <input
                            maxLength="5"
                            type="tel"
                            className="form-control"
                            name="expDate"
                            value={formvalue.expDate}
                            onChange={handlevalidation}
                            onKeyPress={addSlash}
                            placeholder="Expiry Date"
                          />
                          <span className="text-span">
                            {formerror.expDate}{" "}
                          </span>
                        </div>

                        <br />
                      </div>
                    </div>
                  </>
                ) : null}
                {paymentMode == "Online" ? (
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    name="UPI_ID"
                    value={formvalue.UPI_ID}
                    onChange={handlevalidation}
                  />
                ) : null}
              </div>

              <button
                className="order-btn"
                name="button"
                onClick={() => place()}
              >
                Place Your Order
              </button>
            </form>
            <Order />
          </div>
        </div>
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
