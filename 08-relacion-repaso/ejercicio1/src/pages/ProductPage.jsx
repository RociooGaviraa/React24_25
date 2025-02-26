import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = ({ action }) => {
  const { id } = useParams();
  return (
    <div>
      ProductPage action: {action} id: {id}
    </div>
  );
};

export default ProductPage;
