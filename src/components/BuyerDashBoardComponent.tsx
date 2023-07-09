import React, { useEffect, useState } from "react";
import { Reviews, Products, Orders, ProductRating, OrderStatus } from "../InterfacesAndTypes/ApiInterfaces";
/*This is the component for the ordinary user, and as such functionality will be limited to*/
/* View all products when page loads, place order by productId, create a review, will only be possible if order status is completed.Other advanced functionality will be included on V2 */
export default function BuyerDashBoardComponent() {
  const [product, setProducts] = useState<Products[]>([]);
  const [orderDetails, setOrderDetails] = useState<Orders[]>([]);
  async function fetchAllProducts(): Promise<Products[]> {
    const apiRoute = "http://localhost:8080/productsApi/products";
    const response = await fetch(apiRoute);
    if (!response.ok) {
      throw new Error("Invalid response received");
    }
    const allProducts: Products[] = await response.json();
    setProducts(allProducts);
    return allProducts;
  }
  async function createOrderByProductId() {
    //first check if order exists if not place order
    //Note that we are supposed to populate the values of the order of the product we want, we can use variables or give dummy data
    const orderDetails: Orders = { orderId: 1, noOfProducts: 1, totalPrice: 250, orderStatus: OrderStatus.pending, date: "6thJan2022", productsOrdered: "NoteBook" }
    const url = "http://localhost:8080/ordersApi/orders";
    const options = {
      method: 'POST',
      Headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails)
    }
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  function handleOrderSubmit(event: Event) {
    event.preventDefault();//prevent default form behavior
    setOrderDetails(someVariableFromTheForm); //this gets pretty complicated really fast, will be refactored to allow user to input order from the form or better, on button that is on product , on v2
    createOrderByProductId();
  }
  async function createProductReview() {
    const url = "http://localhost:8080/reviewsApi/reviews";
    //if user has bought product allow them to send request else dont
    const reviewBody: Reviews = { reviewId: 1, productId: 1, userId: 1, productRating: ProductRating.four, textContent: "Good for the money works as expected", dateOfReview: "10thfeb2022" }
    const options = {
      method: 'POST',
      Headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewBody),
    }
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  function handleReviewSubmit(event: Event) {
    event.preventDefault();//preventing default submit behavior so we can call our function
    setReviewDetails(someVariableFromTheFormAlso);
    createProductReview();
  }
  useEffect(() => {
    try {
      fetchAllProducts();
    } catch (error) {
      console.error("Error fetching products");
    }
  })
  return (
    <div className="BuyerDashBoardComponent">
      <h1>Here is the list of all available products</h1>
      {
        product.length === 0 ? (
          <p>There are no products in the database.</p>
        ) : (
          <ul>
            {product.map((product) => (
              <li key={product.productId}>
                {product.imageUrl} - {product.productName}
                {product.price} - {product.description}
              </li>
            ))}
          </ul>
        )
      }
      <h1>This is the Form you will use to create an order</h1>
      <form>
        <input type="text" placeholder="OrderId" />
        <input type="text" placeholder="noOfProducts" />
        <input type="text" placeholder="totalPrice" />
        <input type="text" placeholder="OrderStatus" />
        <input type="text" placeholder="date" />
        <input type="text" placeholder="productsOrdered" />
        <button onClick={handleOrderSubmit}>Click to Submit Order</button>
      </form>
      <form className="createProductReview">
        <input type="text" placeholder="reviewId" />
        <input type="text" placeholder="productId" />
        <input type="text" placeholder="userId" />
        <input type="text" placeholder="productRating" />
        <input type="text" placeholder="textContent" />
        <input type="text" placeholder="dateOfReview" />
        <button onClick={handleReviewSubmit}>Click to Submit your review</button>
      </form>
    </div>
  )
}
