import React from "react";

function ProductList({ products, onProductClick }) {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => onProductClick(product.id)}>
              {product.name} - {product.price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
