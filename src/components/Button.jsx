import React, { Children } from "react";

const Button = ({ onclick, disabled, classname = "", children }) => {
  return (
    <button
      className={`rounded-md px-2 border ${classname}`}
      onClick={onclick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
