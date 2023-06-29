import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Product from "./components/Product";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import Protected from "./components/Protected";
import Redirect from "./components/Redirect";

const App = () => {
  // const navigate = useNavigate();

  let isLoggedIn = false;
  if (localStorage.getItem("isLoggedIn") === "true") {
    isLoggedIn = true;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/product"
        element={
          <>
            <Navbar />
            <Product />
            <Footer />
          </>
        }
      ></Route>
      <Route
        path="/pricing"
        element={
          <>
            <Navbar />
            <Pricing />
            <Footer />
          </>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <>
            <Login />
            <Footer />
          </>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <>
            <Signup />
            <Footer />
          </>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Dashboard />
          </Protected>
        }
      ></Route>
      <Route
        path="/create"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Create />
          </Protected>
        }
      ></Route>
      <Route path="*" element={<Redirect />}></Route>
    </Routes>
  );
};
export default App;
