import React from "react";
import { Products } from "../InterfacesAndTypes/ApiInterfaces";
/* fetching product by Id, this component is a little controversial */

function ProductDetails({ product, onAddToCart }) {
  async function fetchProductById() {
    const product_id: number = 1;
    const url = `localhost:8080/productsApi/products?product=${product_id}`;
    const fetchProduct = await fetch(url);
    const productFetched = await fetchProduct.json();
    return productFetched;
  }
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
