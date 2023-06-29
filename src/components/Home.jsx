import Navbar from "./Navbar";
import Main from "./Main";
import Product from "./Product";
import Pricing from "./Pricing";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (localStorage.getItem("isLoggedIn") === "true") {
    return null;
  }

  return (
    <div>
      <Navbar />
      <Main />
      <div className="sm:hidden">
        <Product />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
};
export default Home;
