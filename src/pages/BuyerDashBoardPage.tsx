import React from "react";
import NavBar from "../components/NavBar";
import BuyerDashBoardComponent from "../components/BuyerDashBoardComponent";
import Footer from "../components/Footer";
export default function BuyerDashBoardPage() {

  return (
    <div className="BuyerDashBoardPage">
      <NavBar />
      <BuyerDashBoardComponent />
      <Footer />
    </div>
  )
}
