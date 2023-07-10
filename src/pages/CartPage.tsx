import React from "react";
import NavBar from "../components/NavBar";
import BuyerDashBoardComponent from "../components/BuyerDashBoardComponent";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

export default function CartPage() {
  return (
    <div className="CartPage">
      <NavBar />
      <BuyerDashBoardComponent />
      <ProductList />
      <Footer />
    </div>
  )
}
