import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
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
    <div className="px-5 mt-16 sm:mt-4 sm:px-16 lg:px-28">
      <h2
        id="pricing"
        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-3xl sm:text-4xl font-bold text-center lg:mb-8"
      >
        Pricing
      </h2>
      <h3 className="text-white text-center text-[19px] mt-5  sm:text-3xl font-semibold">
        Pricing for brands and individuals
      </h3>
      <p className="text-white text-center sm:text-2xl mt-5 lg:mt-8 sm:mb-10 lg:mb-20">
        Connect to your audience with branded links and QR Codes that will get
        their attention.
      </p>
      <div className="sm:flex sm:justify-evenly sm:w-full lg:px-96 ">
        <div className="relative sm:w-1/2 sm:px-4 ">
          <div className=" h-28 w-28 bg-gradient-to-br from-blue-500 to-purple-500 absolute z-0 -left-8 -top-10 sm:-top-3 rounded-3xl rotate-[20deg]"></div>
          <div className=" bg-gray-100 glass-card mt-10 sm:h-[91.5%] ">
            <h2 className="text-white text-center py-4 text-2xl font-semibold sm:text-3xl">
              FREE
            </h2>
            <hr />
            <p className="text-white text-lg pl-3 mt-4 font-semibold sm:text-xl lg:text-2xl">
              10 links with QR Codes per month
            </p>
            <ul className="text-white pl-5 leading-10 mt-4 lg:text-xl lg:leading-[3rem]">
              <li>Link & QR Code redirects</li>
              <li>Custom back-half</li>
              <li>QR Codes</li>
              <li>Track Locations</li>
            </ul>
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-5xl font-extrabold text-center my-5 lg:mt-14">
              $0 <span className="text-lg">/month</span>
            </h2>
          </div>
        </div>

        {/* next */}

        <div className="relative sm:w-1/2 sm:px-4 ">
          <div className=" h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-500 absolute z-0 -bottom-10 -right-1 rounded-full"></div>
          <div className=" bg-gray-100 glass-card mt-10  ">
            <h2 className="text-white text-center py-4 text-2xl font-semibold sm:text-3xl">
              PREMIUM
            </h2>
            <hr />
            <p className="text-white text-lg pl-3 mt-4 font-semibold sm:text-xl lg:text-2xl">
              3,000 branded links with QR Codes per month
            </p>
            <ul className="text-white pl-4 leading-10 mt-4 lg:text-xl lg:leading-[3rem]">
              <li>Advanced performance dashboard</li>
              <li>Location and device type data</li>
              <li>Campaigns</li>
              <li>Additional data formats</li>
            </ul>
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-5xl font-extrabold text-center mt-5">
              $9 <span className="text-lg">/month</span>
            </h2>
            <h2 className="text-red-400 text-center mb-5">coming soon</h2>
          </div>
        </div>
      </div>
      <div className="mt-20 sm:mt-28 lg:mt-36">
        <h2 className=" lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-cyan-500 text-4xl font-bold text-center">
          More than a free link shortener
        </h2>
        <div className="flex justify-center mt-6">
          <Link to="/signup">
            <button className=" lg:text-4xl text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-xl font-semibold px-4 py-3">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Pricing;
