import React, { useEffect, useState } from "react";
/*This is the component for the ordinary user, and as such functionality will be limited to*/
/* View all products when page loads, place order by productId, create a review, will only be possible if order status is completed.Other advanced functionality will be included on V2 */
export default function BuyerDashBoardComponent() {
  const [products, setProducts] = useState<products[]>([]);
  interface Products {
    productId: number;
    price: number;
    productName: string;
    description: string;
    imageUrl: string;
  }
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
  interface Order {
    orderId: number;
    noOfProducts: number;
    totalPrice: number;
    orderStatus: OrderStatus;
    date: string;//TODO: refactor implementation to use Date
    productsOrdered: string;//TODO: refactor implementation to use array
  }
  async function createOrderByProductId() {
    //first check if order exists if not place order
    const order = { orderId, noOfProducts, totalPrice, orderStatus, date };

    fetch("http://localhost:8080/ordersApi/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    const response = await Response.json();
    console.log(`Order successfully made ${response}`);
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
        products.length === 0 ? (
          <p>There are no products in the database.</p>
        ) : (
          <ul>
            {products.map((products) => (
              <li key={products.productId}>
                {products.imageUrl} - {products.productName}
                {products.price} - {products.description}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}
