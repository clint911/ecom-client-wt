import React from "react";
import AdminDashboard from "../components/AdminDashBoardComponent";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function AdminDashboardPage() {
  return (
    <div className="AdminDashboardPage">
      <NavBar />
      <AdminDashboardPage />
      <Footer />
    </div>

  );
}
