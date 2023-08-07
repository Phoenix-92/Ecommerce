import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  const uid = useSelector((state) => state.user.userID);
  console.log(uid);

  return (
    <>
      {uid == undefined || uid == 0 ? (
        <>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<ErrorPage />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route
              exact
              path="/product/:productId"
              element={<SingleProduct />}
            />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="*" element={<ErrorPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
