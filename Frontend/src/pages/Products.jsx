import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import Loading from "../components/Loading";
import RenderProducts from "../components/RenderProducts";
import "../styles/Products.css";

function Products() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios
      .get("https://localhost:7052/api/Product/get-all-products")
      .catch((err) => {
        console.log("Error", err);
      });
    console.log(response.data);

    dispatch(setProducts(response.data));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <>{loading ? <Loading /> : <RenderProducts />}</>;
}

export default Products;
