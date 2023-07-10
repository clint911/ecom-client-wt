import React from "react";
import { ProductRating, Support, helpType } from "../InterfacesAndTypes/ApiInterfaces";

export default function SupportForm() {

  async function createSupportRequest() {
    const _userId: number = 2;
    const _date = Date.now().toString();
    const _help = helpType.other;
    const _reason = "Order says completed but was not shipped";
    const url = "localhost:8080/reviewsApi/reviews";
    const _support: Support = { userId: _userId, date: _date, help: _help, reason: _reason }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_support),
    }
    try {
      await fetch(url, options);
      console.log("Your request for Support has been sent successfully, you will be contacted via email for further action");
    } catch (error) {
      console.error("Fatal errror occurred while making your request, please check your values and try again", error);
    }
  }
  function handleCreateSupportRequest(event: Event) {
    event.preventDefault();
    createSupportRequest();
  }
  return (
    <div className="SupportForm">
      <h1>Fill in the form below to File for support </h1>
      <form><input type="text" value="text" placeholder="Type why you need support" />
        <button type="radio" value={"return", "accountError", "other"}></button>
        <button onClick={handleCreateSupportRequest()}>Click to Submit Request</button>
      </form>
    </div >
  )
}
