import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import Loading from "./Loading";
import "../styles/Products.css";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Pagination } from "react-bootstrap";

function Products() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let apiData = products;
  const [pageNo, setPageNo] = useState(1);
  const [category, setCategory] = useState(null);
  let componentMounted = true;
  const pagination = 6;
  const pageCount = Math.ceil(20 / pagination);
  console.log(pageCount);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Error", err);
      });
    if (componentMounted) {
      dispatch(setProducts(response.data));
      setLoading(false);
    }
    return () => {
      componentMounted = false;
    };
  };
  const handlePrevios = () => {
    setPageNo(pageNo - 1);
  };
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  if (category !== null) {
    apiData = apiData.filter((x) => x.category === category);
  } else {
    let lastItem = pageNo * pagination;
    apiData = apiData.slice(lastItem - pagination, lastItem);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log("PRODUCTS", products);

  const renderProducts = apiData.map((product) => {
    const { id, title, image, price, category, rating } = product;

    return (
      <div className="product-card" key={id}>
        <NavLink to={`/product/${id}`} className="nav-link">
          <Card className="d-flex flex-row  justify-content-center align-items-center">
            <Card.Img variant="top" src={image} className="image" />
            <Card.Body>
              <Card.Title>
                <h5 className="title">{title}</h5>
              </Card.Title>
              {/* <Card.Text>{props.description}</Card.Text> */}
              <ListGroup>
                <ListGroup.Item>Price - Rs. {price}</ListGroup.Item>
                <ListGroup.Item>Rating - {rating.rate}</ListGroup.Item>
                {/* <ListGroup.Item>{rating}</ListGroup.Item> */}
              </ListGroup>
            </Card.Body>
          </Card>
        </NavLink>
      </div>
    );
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="buttons">
            <button
              className="btn"
              onClick={() => {
                setCategory(null);
              }}
            >
              All
            </button>
            <button
              className="btn"
              onClick={() => setCategory("men's clothing")}
            >
              Mens
            </button>
            <button
              className="btn"
              onClick={() => setCategory("women's clothing")}
            >
              Womens
            </button>
            <button className="btn" onClick={() => setCategory("jewelery")}>
              Jewelery
            </button>
            <button className="btn" onClick={() => setCategory("electronics")}>
              Electronic
            </button>
          </div>
          {renderProducts}
          {category === null && (
            <Pagination size="lg">
              <Pagination.Prev
                onClick={handlePrevios}
                disabled={pageNo === 1}
              />
              {Array(pageCount)
                .fill(null)
                .map((ele, index) => (
                  <Pagination.Item
                    active={pageNo === index + 1 ? true : false}
                    onClick={() => setPageNo(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}{" "}
              <Pagination.Next
                onClick={handleNext}
                disabled={pageNo === pageCount}
              />
            </Pagination>
          )}
        </>
      )}
    </>
  );
}

export default Products;
