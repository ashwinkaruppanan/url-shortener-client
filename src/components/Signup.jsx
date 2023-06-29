import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const api = "https://reago-backend.up.railway.app";

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  if (localStorage.getItem("isLoggedIn") === "true") {
    return null;
  }

  const [signupData, setSignupDate] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignupDate({
      ...signupData,
      [e.target.name]: e.target.value,
    });

    if (error !== "") {
      setError("");
    }
  };

  const hasSixOrMoreChars = /^.{6,}$/.test(signupData.password);
  const hasOneNumber = /.*\d.*/.test(signupData.password);
  const hasOneLetter = /.*[a-zA-Z].*/.test(signupData.password);
  const hasOneSpecialChar = /.*[^a-zA-Z0-9].*/.test(signupData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      signupData.full_name.length < 2 ||
      !/^\w+( \w+)?$/.test(signupData.full_name)
    ) {
      setError("enter valid name");
      return;
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(signupData.email)
    ) {
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
      const instance = axios.create({
        withCredentials: true,
      });
      const response = await instance.post(
        "https://reago-backend.up.railway.app/signup",
        signupData
      );

      if (response.status === 201) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_name", response.data.full_name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("refresh", response.data.refresh_token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setError("connection error");
      } else if (
        error.response.status === 409 ||
        error.response.status === 500
      ) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="px-9 py-6 lg:px-44">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-2xl md:text-4xl mb-6">
          <Link to="/">REAGO</Link>
        </h2>
        <hr />
      </div>
      <div className="text-center">
        <h2 className="text-white text-4xl font-medium">
          Sign up and start shortening
        </h2>
        <p className="text-white mt-5">Already have an account?</p>
        <p href="" className="text-blue-500 underline underline-offset-2">
          <Link to="/login">Log in</Link>
        </p>
      </div>
      <div className="sm:flex justify-center w-full">
        <div className="text-white px-9 mt-8 ]">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full_name">Full Name</label>
              <input
                className="w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                type="text"
                name="full_name"
                value={signupData.full_name}
                id="full_name"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                className="w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                type="email"
                name="email"
                id="email"
                value={signupData.email}
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
                value={signupData.password}
                onChange={handleChange}
              />
            </div>
            <div className="px-7 mt-4">
              <ul className="list-disc">
                <li
                  className={hasSixOrMoreChars ? "text-green-500" : undefined}
                >
                  6 or more characters
                </li>
                <li className={hasOneNumber ? "text-green-500" : undefined}>
                  One number
                </li>
                <li className={hasOneLetter ? "text-green-500" : undefined}>
                  One letter
                </li>
                <li
                  className={hasOneSpecialChar ? "text-green-500" : undefined}
                >
                  One special character
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <button
                className=" text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg p-2 w-full text-lg font-medium"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          {error !== "" ? (
            <div className="mt-6 text-center text-lg">
              <p className="text-red-500">{error}</p>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};
export default Signup;
