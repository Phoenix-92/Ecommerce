import React from "react";
import { BallTriangle } from "react-loader-spinner";

function Loading() {
  return (
    <div style={{ margin: "13% 44%" }}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="rgb(15, 74, 81)"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
