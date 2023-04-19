import React from "react";

const BackArrow = () => {
  return (
    <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="24"
        cy="24"
        r="23"
        transform="rotate(90 24 24)"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M29.656 18.343 18.343 29.657M29.656 29.657 18.343 18.343"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  );
};

export default BackArrow;
