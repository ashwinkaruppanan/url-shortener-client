import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between h-16 items-center px-5  sm:px-16 sm:py-16 lg:px-20">
      <div className="text-white text-2xl font-semibold  hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-500 to-purple-500">
        <Link to="/">REAGO</Link>
      </div>
      <div className="flex">
        <ul className="text-white hidden sm:flex  items-center ">
          <li className="mr-8 lg:mr-12 ">
            <Link to="/product">Product</Link>
          </li>
          <li className="mr-8 lg:mr-12 ">
            <Link to="/pricing">Pricing</Link>
          </li>
        </ul>
        <Link to="/login">
          <button className="text-white  px-3 py-1 sm:py-2.5 items-center  border-2 rounded-lg border-blue-500  sm:mr-8 sm:w-28  hover:-translate-y-1 hover:duration-200">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="text-white  hidden sm:block rounded-lg px-3 py-3 bg-gradient-to-r from-blue-600 to-purple-500 sm:w-28  hover:-translate-y-1 hover:duration-200">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
