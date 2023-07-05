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

  // Get the stored expiry time from localStorage
  const storedTime = localStorage.getItem("time_expiry");

  // Convert the stored time back to a Date object
  const expiryTime = new Date(storedTime);

  // Get the current time
  const currentTime = new Date();

  // Compare the current time with the expiry time
  if (currentTime > expiryTime) {
    // Current time is less than the expiry time
    localStorage.clear();
  }

  const loggedIn = localStorage.getItem("isLoggedIn");
  if (loggedIn === "true") {
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
