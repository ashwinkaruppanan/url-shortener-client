import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavBar = () => {
  const api = "https://reago.up.railway.app";
  const navigate = useNavigate();

  const ref = useRef();
  const [toggle, setToggle] = useState(false);

  let name = "";
  let email = "";

  if (localStorage.getItem("user_name") !== null) {
    name = localStorage.getItem("user_name");
  }

  if (localStorage.getItem("email") !== null) {
    email = localStorage.getItem("email");
  }

  const handleToggle = () => {
    setToggle((old) => !old);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://reago.up.railway.app/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 401) {
      //   try {
      //     const response = await axios.post(`${api}/refresh`, null, {
      //       withCredentials: true,
      //       headers: {
      //         "refresh-token": localStorage.getItem("refresh"),
      //       },
      //     });

      //     if (response.status === 200) {
      //       document.getElementById("logout").click();
      //     }
      //   } catch (error) {
      //     console.log(error);
      //     localStorage.clear();
      //     navigate("/login");
      //   }
      // }
    }
  };

  return (
    <div className="px-9 py-6 lg:py-4 shadow-md shadow-gray-500 lg:px-20 ">
      <div className="flex items-center justify-between ">
        <Link to="/dashboard">
          <h2 className=" cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-semibold md:text-4xl lg:text-2xl">
            REAGO
          </h2>
        </Link>
        <div className="flex items-center">
          <div className="mr-10 hidden sm:inline-block">
            <Link to="/create">
              <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg  p-2 font-medium  ">
                Create new
              </button>
            </Link>
          </div>
          <Link to="/create">
            <div className="sm:hidden h-10 w-10 mr-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <p className="text-white text-3xl ">+</p>
            </div>
          </Link>
          <div ref={ref}>
            <button>
              <div
                onClick={handleToggle}
                className="h-10 w-10 lg:h-12 lg:w-12 cursor-pointer  border-2 border-blue-400 rounded-full text-center flex justify-center items-center relative"
              >
                <p className="text-2xl font-medium text-white">{name[0]}</p>
              </div>
            </button>
            <div
              className={
                toggle
                  ? "bg-white px-4 py-2 absolute right-4 top-20 lg:right-28 rounded-lg dropdown"
                  : "bg-white px-4 py-2 absolute right-4 top-20 rounded-lg dropdown hidden"
              }
            >
              <ul>
                <li className="font-semibold text-lg">{name}</li>
                <li className="mb-2 text-lg">{email}</li>
                <hr />
                <li className="my-2  font-medium text-lg">
                  <button id="logout" className="w-full" onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
