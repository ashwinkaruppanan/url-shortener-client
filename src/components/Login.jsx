import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api_url from "../api";

const Login = () => {
  const api = api_url;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  if (localStorage.getItem("isLoggedIn") === "true") {
    return null;
  }

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const hasSixOrMoreChars = /^.{6,}$/.test(loginData.password);
  const hasOneNumber = /.*\d.*/.test(loginData.password);
  const hasOneLetter = /.*[a-zA-Z].*/.test(loginData.password);
  const hasOneSpecialChar = /.*[^a-zA-Z0-9].*/.test(loginData.password);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    if (error !== "") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(loginData.email)) {
      setError("enter valid email");
      return;
    } else if (
      !hasSixOrMoreChars ||
      !hasOneNumber ||
      !hasOneLetter ||
      !hasOneSpecialChar
    ) {
      setError("enter valid password");
      return;
    } else {
      setError("");
    }

    try {
      const response = await axios.post(`${api}/login`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_name", response.data.full_name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("refresh", response.data.refresh_token);
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setError("connection error");
      } else if (
        error.response.status === 401 ||
        error.response.status === 500
      ) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="px-9 py-6 lg:px-44">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-semibold md:text-4xl lg:text-2xl mb-6">
          <Link to="/">REAGO</Link>
        </h2>
        <hr />
      </div>
      <div className="text-center">
        <h2 className="text-white text-4xl font-medium">
          Log in and start sharing
        </h2>
        <p className="text-white mt-5">Don't have an account?</p>
        <p className="text-blue-500 underline underline-offset-2">
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="sm:flex justify-center w-full">
          <div className="text-white px-9 mt-8">
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                className="w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                className="w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className=" text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg p-2 w-full text-lg font-medium "
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </form>
      {error !== "" ? (
        <div className="mt-6 text-center text-lg">
          <p className="text-red-500">{error}</p>
        </div>
      ) : undefined}
    </div>
  );
};
export default Login;
