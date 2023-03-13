import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../redux/actions/productActions";

import { addToCart } from "../redux/actions/cartActions";
import Loading from "./Loading";
import "../styles/SingleProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct() {
  const item = useSelector((state) => state.items);
  console.log(item);
  const [productData, setProductData] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const product = useSelector((state) => state.product);
  console.log(product);
  const { id, image, title, price, rating, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();
  // console.log(productId);

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => {
        console.log("Error", err);
      });
    setProductData(response.data);
    dispatch(selectedProduct(response.data));
    // console.log(response.data);
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
    for (let i of item) {
      if (i.id == productId) {
        setDisableButton(true);
        setButtonText("Product added!");
      }
    }
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const addTC = () => {
    setDisableButton(true);
    setButtonText("Product added!");
    dispatch(addToCart(productData));
    console.log(id);
    toast("Item is added to cart", {
      position: "top-center",
    });
  };

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="wrapper-product">
          <img src={image} className="image" />
          <div className="">
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
            <p>
              <p className="price-rate">
                Price - <span>Rs.{price}</span>
              </p>
            </p>
            <p className="category">
              Category - <span>{category}</span>
            </p>
            {/* <p className="rating">
              Rating - <span>{rating}</span>
            </p> */}
            <div className="ui vertical animated button" tabIndex="0">
              <div className="hidden content">
                <i className="shop icon"></i>
              </div>
              <button
                className="btn-ATC"
                onClick={addTC}
                disabled={disableButton}
              >
                {buttonText}
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
