import React from "react";

const Button2 = ({ text, onClick }) => {
  return (
    <div>
      <button className="custom-btn btn-1" onClick={onClick}>{text}</button>
    </div>
  );
};

export default Button2;
