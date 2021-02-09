import React from "react";
import "./Loading.css";

const LoadingButton = () => {
  return (
    <>
      <button disabled className="buttonload">
        <i className="fa fa-circle-o-notch fa-spin"></i>Loading
      </button>
    </>
  );
};

export default LoadingButton;
