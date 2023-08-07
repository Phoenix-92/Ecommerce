import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProfile, addUserId, login } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let UserId;

  const [userData, setUserData] = useState({
    uname: "",
    pass: "",
  });

  let userObj = {
    userName: userData.uname,
    password: userData.pass,
    firstName: userData.fname,
    lastName: userData.lname,
    mobile: userData.mobile,
    email: userData.email,
    address: userData.address,
    state: userData.state,
    country: userData.country,
    pincode: userData.pin,
  };

  const [formerror, setFormerror] = useState({});
  const [issubmit, setSubmit] = useState(false);

  const handlevalidation = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setFormerror(validationform(userData));

    let loginObj = {
      userName: userData.uname,
      password: userData.pass,
    };

    axios
      .post("https://localhost:7052/api/Checkout/Login", loginObj)
      .then((response) => {
        console.log(response.data);
        UserId = response.data;
        dispatch(addUserId(UserId));
        if (UserId != 0) {
          console.log(UserId);
          axios
            .get(
              `https://localhost:7052/api/Checkout/user-details?userId=${UserId}`
            )
            .then((res) => {
              userObj = res.data;
              console.log(userObj);
              dispatch(addProfile(userObj));
              navigate("/home");
            })
            .catch(function (error) {});
        } else {
          alert("Invalid Username or Password");
        }
      })
      .catch(function (error) {
        Error = error;
      });

    console.log(UserId);

    setSubmit(true);
  };

  const validationform = (value) => {
    const errors = {};

    if (!value.uname) {
      errors.uname = "Please Enter Username";
    }

    if (!value.pass) {
      errors.pass = "Please Enter Password";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formerror).length === 0 && issubmit) {
      dispatch(addUserId(UserId));
    }
  }, [formerror, userData, issubmit]);

  return (
    <div className="bodyOverride">
      <div className="box">
        <span className="borderLine"></span>
        <form onSubmit={handlesubmit}>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input
              type="text"
              name="uname"
              required="required"
              value={userData.uname}
              onChange={handlevalidation}
            />
            <span>Username</span>
            <span>{formerror.uname} </span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="pass"
              required="required"
              value={userData.pass}
              onChange={handlevalidation}
            />
            <span>Password</span>
            <span>{formerror.pass} </span>
            <i></i>
          </div>
          <div className="links">
            <a href="#">Forgot Password</a>
            <a href="./signup">Signup</a>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
