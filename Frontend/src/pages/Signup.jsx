import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Login.css";
import axios from "axios";
import { addProfile } from "../redux/actions/userActions";
import ECart from "../images/ecart.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formvalue, setFormvalue] = useState({
    uname: "",
    pass: "",
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    state: "",
    country: "",
    address: "",
    state: "",
    country: "",
    pin: null,
  });

  let userObj = {
    userName: formvalue.uname,
    password: formvalue.pass,
    firstName: formvalue.fname,
    lastName: formvalue.lname,
    mobile: formvalue.mobile,
    email: formvalue.email,
    address: formvalue.address,
    state: formvalue.state,
    country: formvalue.country,
    pincode: formvalue.pin,
  };

  const [formerror, setFormerror] = useState({});
  const [issubmit, setSubmit] = useState(false);

  const handlevalidation = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setFormerror(validationform(formvalue));

    axios
      .post("https://localhost:7052/api/Checkout", userObj)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setSubmit(true);
  };

  const validationform = (value) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.uname) {
      errors.uname = "Please Enter Username";
    }

    if (!value.pass) {
      errors.pass = "Please Enter Password";
    }

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

    if (!value.state) {
      errors.state = "Please Enter State";
    }

    if (!value.country) {
      errors.country = "Please Enter Country";
    }

    if (!value.pin) {
      errors.pin = "Please Enter PinCode";
    }

    return errors;
  };

  const loginpage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (Object.keys(formerror).length === 0 && issubmit) {
      console.log(formvalue);
      dispatch(addProfile(formvalue));
      navigate("/");
    }
  }, [formerror, formvalue, issubmit]);

  return (
    <div className="bodyOverride">
      <div className="box" id="signupBox">
        <span className="borderLine" id="signupBorderLine"></span>
        <form onSubmit={handlesubmit}>
          <h2>Sign up</h2>
          <div className="sameRow">
            <div className="inputBox">
              <input
                type="text"
                name="fname"
                required="required"
                value={formvalue.fname}
                onChange={handlevalidation}
              />
              <span>First Name</span>
              <span>{formerror.fname} </span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="text"
                name="lname"
                required="required"
                value={formvalue.lname}
                onChange={handlevalidation}
              />
              <span>Last Name</span>
              <span>{formerror.lname} </span>
              <i></i>
            </div>
          </div>

          <div className="sameRow">
            <div className="inputBox">
              <input
                type="text"
                name="uname"
                required="required"
                value={formvalue.uname}
                onChange={handlevalidation}
              />
              <span>Username</span>
              <span>{formerror.uname} </span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="text"
                name="email"
                required="required"
                value={formvalue.email}
                onChange={handlevalidation}
              />
              <span>Email</span>
              <span>{formerror.email} </span>
              <i></i>
            </div>
          </div>

          <div className="sameRow">
            <div className="inputBox">
              <input
                type="password"
                name="pass"
                required="required"
                value={formvalue.pass}
                onChange={handlevalidation}
              />
              <span>Create Password</span>
              <span>{formerror.pass} </span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="pass"
                required="required"
                value={formvalue.pass}
                onChange={handlevalidation}
              />
              <span>Confirm Password</span>
              <span>{formerror.pass} </span>
              <i></i>
            </div>
          </div>
          <br />
          <div className="sameRow">
            <input type="submit" value="Register" />
            <div className="links">
              <a href="./" className="signinLink" onClick={() => loginpage()}>
                Signin
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
