import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Pagination } from "react-bootstrap";

function RenderProducts() {
  let products = useSelector((state) => state.allProducts.products);
  console.log(products);
  const [pageNo, setPageNo] = useState(1);
  const [category, setCategory] = useState("all");

  const pagination = 6;
  const pageCount = Math.ceil(products.length / pagination);

  // useEffect(() => {
  //   // whenever page no changes
  // }, [pageNo, category]);

  const handlePrevios = () => {
    setPageNo(pageNo - 1);
  };
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  if (category !== "all") {
    products = products.filter((x) => x.category === category);
  } else {
    let lastItem = pageNo * pagination;
    products = products.slice(lastItem - pagination, lastItem);
  }

  return (
    <>
      <div className="buttons">
        <button
          className="btn"
          onClick={() => {
            setCategory("all");
          }}
        >
          All
        </button>
        <button className="btn" onClick={() => setCategory("men's clothing")}>
          Mens
        </button>
        <button className="btn" onClick={() => setCategory("women's clothing")}>
          Womens
        </button>
        <button className="btn" onClick={() => setCategory("jewelery")}>
          Jewelery
        </button>
        <button className="btn" onClick={() => setCategory("electronics")}>
          Electronic
        </button>
      </div>

      {products.map((product) => {
        const { productID, title, image, price, rating } = product;
        return (
          <div className="product-card" key={productID + title}>
            <Link to={`/product/${productID}`} className="nav-link">
              <Card className="d-flex flex-row  justify-content-center align-items-center">
                <Card.Img variant="top" src={image} className="image" />
                <Card.Body>
                  <Card.Title>
                    <h5 className="title">{title}</h5>
                  </Card.Title>
                  {/* <Card.Text>{props.description}</Card.Text> */}
                  <ListGroup>
                    <ListGroup.Item>Price - Rs. {price}</ListGroup.Item>
                    <ListGroup.Item>Rating - {rating}</ListGroup.Item>
                    {/* <ListGroup.Item>{rating}</ListGroup.Item> */}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}

      {category === "all" && (
        <Pagination size="lg">
          <Pagination.Prev onClick={handlePrevios} disabled={pageNo === 1} />
          {Array(pageCount)
            .fill(null)
            .map((ele, index) => (
              <Pagination.Item
                key={index}
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
  );
}

export default RenderProducts;
