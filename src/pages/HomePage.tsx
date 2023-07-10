import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";
import SignUpForm from "../components/SignUpForm";

export default function HomePage() {
  return (
    <div className="HomePage">
      <NavBar />
      <SignUpForm />
      <ProductList />
      <Footer />
    </div>
  )
}
