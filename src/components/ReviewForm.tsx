import React, { useId } from "react";
import { Reviews, ProductRating } from "../InterfacesAndTypes/ApiInterfaces";

export default function ReviewForm() {
  async function sendReview() {
    /* all these should be obtained from the form */
    const _productId: number = 2;//refactor to function that fetches productId
    let userIdStored: number;
    const _userId: number = localStorage.getItem(userIdStored as Number);
    const _textContent: string = "Great Product for the price";
    const _productRating: ProductRating = ProductRating.five;
    const _dateOfReview: string = Date.now().toString();
    const reviewDetails: Reviews = { reviewId: 1, productRating: _productRating, productId: _productId, userId: _userId, textContent: _textContent, dateOfReview: _dateOfReview }
    const url = "localhost:8080/reviewsApi/reviews"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewDetails),
    }
    try {
      await fetch(url, options);
      console.log("Review created successfully");
    } catch (error) {
      console.error("Fatal Error occurred", error);
    }
  }
  function handleFormSubmit(event: Event) {
    event.preventDefault();
    sendReview();

  }

  return (
    <div className="ReviewForm">
      <form>
        <input type="text" placeholder="Review Text Goes Here" />
        <button onClick={handleFormSubmit}>Click to Submit Review</button>
      </form>
    </div>
  )
}
