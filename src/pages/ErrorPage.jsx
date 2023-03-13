import React from "react";
import Error from "../images/error.png";

function ErrorPage() {
  return (
    <div style={{ display: "flex" }}>
      <img
        src={Error}
        alt="404 error"
        style={{ width: "50em", height: "35em", margin: "auto" }}
      />
    </div>
  );
}

export default ErrorPage;
