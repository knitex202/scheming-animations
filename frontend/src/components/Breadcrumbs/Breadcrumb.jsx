import React from "react";
import "../Breadcrumbs/Breadcrumb.css";


const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m6.5 17.5l8.25-5.5L6.5 6.5l1-1.5L18 12L7.5 19z"
    />
  </svg>
);

export default function Breadcrumb(props) {
    const {product} = props;
   return (
    <div className="Breadcrumb">
      HOME {arrowIcon} SHOP {arrowIcon} {product.category} {arrowIcon} {product.name}
    </div>
  );
}
