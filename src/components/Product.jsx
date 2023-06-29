import { useEffect } from "react";
import lmImg from "../assets/lmImg.png";
import qrImg from "../assets/qrImg.png";
import { Link, useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  if (localStorage.getItem("isLoggedIn") === "true") {
    return null;
  }

  return (
    <>
      <div id="product" className="px-5 mt-8 lg:mt-4 sm:px-16 lg:px-28 ">
        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-center sm:text-4xl text-3xl font-bold mb-5 ">
          Our Products
        </h2>
        <div>
          <h2 className="text-white text-center text-xl font-semibold sm:text-3xl sm:font-bold">
            The Reago Connections Platform
          </h2>
          <p className="text-white text-center mt-5 lg:mt-10 sm:text-2xl lg:px-72 lg:leading-[2.3rem]">
            All the products you need to build brand connections, manage links
            and QR Codes, and connect with audiences everywhere, in a single
            unified platform.
          </p>
        </div>
        <div className="xl:flex xl:justify-center xl:px-80 ">
          <div className="sm:flex sm:justify-evenly sm:w-full ">
            <div className="mt-12 px-4 sm:w-1/2">
              <div className="text-white border-2 border-gray-300 rounded-xl p-5">
                <div className="flex items-center w-full justify-center ">
                  <img className="h-6" src={lmImg} alt="" />
                  <h3 className="text-white font-semibold text-lg ml-1 sm:text-xl lg:text-3xl">
                    Link Management
                  </h3>
                </div>
                <div className="bg-blue-500 h-0.5 rounded-xl w-full mt-2 lg:mt-5"></div>
                <div className="mt-4 text-lg sm:text-xl ">
                  <p className="text-white lg:leading-9">
                    A comprehensive solution to help make every point of
                    connection between your content and your audience more
                    powerful.
                  </p>
                </div>
                <div className="mt-4">
                  <ul className="list-disc ml-4 leading-8 sm:text-xl  lg:leading-[3rem]">
                    <li>URL shortening at scale</li>
                    <li>Custom links with your brand</li>
                    <li>URL redirects</li>
                    <li>Advanced analytics & tracking</li>
                  </ul>
                </div>
                <Link to="/signup">
                  <button className=" sm:text-xl bg-blue-500 hover:bg-blue-600 rounded-lg py-2 text-center w-full mt-6 ">
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>

            {/* 2rd div */}

            <div className="mt-12 px-4 sm:w-1/2 ">
              <div className="text-white border-2 border-gray-300 rounded-xl p-5 sm:h-full">
                <div className="flex items-center w-full justify-center ">
                  <img className="h-6" src={qrImg} alt="" />
                  <h3 className="text-white font-semibold text-lg ml-1 sm:text-xl lg:text-3xl">
                    QR Codes
                  </h3>
                </div>
                <div className="bg-blue-500 h-0.5 rounded-xl w-full mt-2 lg:mt-5"></div>
                <div className="mt-4 text-lg ">
                  <p className="text-white lg:leading-9 ">
                    QR Code solutions for every customer, business and brand
                    experience.
                  </p>
                </div>
                <div className="mt-4">
                  <ul className="list-disc ml-4 leading-8 sm:text-xl  lg:leading-[3rem]">
                    <li>Fully customizable QR Codes</li>
                    <li>Dynamic QR Codes</li>
                    <li>QR Code types & destination options</li>
                    <li>Advanced analytics & tracking</li>
                  </ul>
                </div>
                <Link to="/signup">
                  <button className="sm:text-xl  bg-blue-500 hover:bg-blue-600 rounded-lg py-2 text-center w-full mt-6 sm:mt-[3.3rem] lg:mt-[3.8rem]  ">
                    Get Started for Free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
