import React, { useState } from "react";
/* admin: Checking all users, orders, products, reviews */
function AdminDashboard() {
  const [users, setUsersState] = useState<userData[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);
  enum userRole {
    admin,
    buyer,
    seller
  }
  interface userData {
    userId: number;
    email: string;
    userName: string;
    password: string;
    address: string;
    city: string;
    country: string;
    role: userRole
  }

  async function fetchAllUsers(): Promise<userData[]> {
    const apiRoute = "http://localhost:8080/usersApi/users";
    const response = await fetch(apiRoute);
    if (!response.ok) {
      throw new Error("Invalid response received");
    }
    const allUsers: userData[] = await response.json();
    return allUsers;
  }
  async function handleFetchUsersButton() {
    try {
      const _allUsers = await fetchAllUsers();
      setUsersState(_allUsers);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }
  enum ProductRating {
    one,
    two,
    three,
    four,
    five
  }
  interface Reviews {
    reviewId: number;
    productId: number;
    userId: number;
    productRating: ProductRating;
    textContent: string;
    dateOfReview: string;//TODO: refactor to use Date
  }
  async function fetchAllReviews(): Promise<Reviews[]> {
    const apiRoute = "http://localhost:8080/reviewsApi/reviews";
    const response = await fetch(apiRoute);
    if (!response.ok) {
      throw new Error("Invalid response received");
    }
    const allReviews: Reviews[] = await response.json();
    return allReviews;
  }
  async function handleFetchReviewsButton() {
    try {
      const _allReviews = await fetchAllReviews();
      setReviews(_allReviews);
    } catch (error) {
      console.error("Error fetching review", error);
    }
  }
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
    return allProducts;
  }
  async function handleFetchProductsButton() {
    try {
      const _allProducts = await fetchAllProducts();
      setProducts(_allProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }
  enum OrderStatus {
    pending,
    approved,
    shipped,
    completed,
    failed
  }
  interface Orders {
    orderId: number;
    noOfProducts: number;
    totalPrice: number;
    orderStatus: OrderStatus;
    date: string;//TODO: refactor implementation to use Date
    productsOrdered: string;//TODO: refactor implementation to use array
  }
  async function fetchAllOrders(): Promise<Orders[]> {
    const apiRoute = "http://localhost:8080/ordersApi/orders";
    const response = await fetch(apiRoute);
    if (!response.ok) {
      throw new Error("Invalid response received");
    }
    const allOrders: Orders[] = await response.json();
    return allOrders;
  }
  async function handleFetchOrdersButton() {
    try {
      const _allOrders = await fetchAllOrders();
      setOrders(_allOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  }
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>User Management</h3>
      <button onClick={handleFetchUsersButton}>Click to list all the Users</button>
      {users.length === 0 ? (
        <p>There are no users to manage.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.userId}>
              {user.email} - {user.role}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleFetchReviewsButton}> Click to list all the Reviews</button>
      {
        reviews.length === 0 ? (
          <p>There are no reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((reviews) => (
              <li key={reviews.userId}>
                {reviews.productId} - {reviews.dateOfReview}
                {reviews.productRating} - {reviews.textContent}
              </li>
            ))}
          </ul>
        )
      }
      <button onClick={handleFetchProductsButton}>Click to fetch all the products in the db</button>
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
      <button onClick={handleFetchOrdersButton}>Click to fetch and view all the orders</button>
      {
        orders.length === 0 ? (
          <p>There are no Orders placed</p>
        ) : (
          <ul>
            {orders.map((orders) => (
              <li key={orders.orderId}>
                {orders.productsOrdered} - {orders.noOfProducts}
                {orders.orderStatus} - {orders.totalPrice}
              </li>
            ))}
          </ul>
        )
      }
    </div >
  );
}

export default AdminDashboard;
