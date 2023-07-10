import React, { useEffect, useState } from "react";
import { Products } from "../InterfacesAndTypes/ApiInterfaces";
function ProductList({ products, onProductClick }) {
  const [allProducts, setAllProducts] = useState<Products[]>([]);

  async function getAllProducts() {
    const url = "localhost:8080/productsApi/products";
    const getProducts = await fetch(url);
    const _allProducts = await getProducts.json();
    setAllProducts(_allProducts);
    return _allProducts;
  }
  useEffect(() => {
    getAllProducts();
  }, [])
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
