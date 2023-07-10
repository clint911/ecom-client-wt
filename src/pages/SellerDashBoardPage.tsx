import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SellerDashboard from "../components/SellerDashBoardComponent";

export default function SellerDashBoardPage() {
  return (
    <div className="SellerDashBoardPage">
      <NavBar />
      <SellerDashboard />
      <Footer />
    </div>
  )
}
