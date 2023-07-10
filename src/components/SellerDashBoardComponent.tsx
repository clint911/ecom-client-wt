import React, { useId } from "react";
import { userRole, Products } from "../InterfacesAndTypes/ApiInterfaces";
/* seller can basically send a post request to create product, kinda like a profile */
function SellerDashboard({ products }) {
  async function createProduct() {
    const currUser: string | null = localStorage.getItem(useId());
    let Seller: userRole | null;
    if (currUser.isLoggedIn as typeof Seller) {
      const _productId: number = 1;//refactor to be in a form
      const _price = 599;
      const _productName = "Watch";
      const _description = "A Smart watch";
      const _imageUrl = "Link to a real Image";
      const url = `localhost:8080/productsApi/products?product=${_productId}`;
      const _productDetails: Products = { productId: _productId, price: _price, productName: _productName, description: _description, imageUrl: _imageUrl }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_productDetails),

      }
      try {
        await fetch(url, options);
        console.log("Product successfully added to database");
      } catch (error) {
        console.error("Fatal error occured while making request", error);

      }
    }
  }
  function handleCreateProduct(event: Event) {
    event.preventDefault();
    createProduct();
  }
  return (
    <div>
      <h2>Seller Dashboard</h2>
      <form>
        <button onClick={handleCreateProduct}>Click to Add product</button>
      </form>
      <h3>Product Management</h3>
      {products.length === 0 ? (
        <p>You haven't added any products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
