import React, { useState } from "react";
/* admin: Checking all users, orders, products, reviews */
function AdminDashboard({ users }) {
  const [usersState, setUsersState] = useState<userData[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);
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
  interface Reviews {
    userId: number;
    email: string;
    userName: string;
    password: string;
    address: string;
    city: string;
    country: string;
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
            <li key={user.id}>
              {user.email} - {user.role}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleFetchReviewsButton}> Click to list all the Reviews</button>
      {
        reviews.length === 0 ? (
          <p>There are no users to manage.</p>
        ) : (
          <ul>
            {reviews.map((reviews) => (
              <li key={reviews.id}>
                {reviews.email} - {reviews.role}
              </li>
            ))}
          </ul>
        )
      }
    </div >
  );
}

export default AdminDashboard;
