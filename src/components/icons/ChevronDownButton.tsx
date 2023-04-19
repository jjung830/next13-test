import React from "react";

const ChevronDownButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(90 24 24)"
      />
      <path
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M32.053 21.052c-4.423 0-8 3.578-8 8 0-4.422-3.578-8-8-8"
      />
    </svg>
  );
};

export default ChevronDownButton;
