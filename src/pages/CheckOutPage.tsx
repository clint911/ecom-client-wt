import { ProductRating } from "../InterfacesAndTypes/ApiInterfaces";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ProductDetails from "../components/ProductDetails";

export default function CheckOutPage() {
  return (
    <div className="CheckOutPage">
      <NavBar />
      <Cart />
      <ProductDetails />
      <Footer />
    </div>
  )
}
