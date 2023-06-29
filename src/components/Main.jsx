import { Link } from "react-router-dom";
import img from "../assets/temp.png";

const Main = () => {
  return (
    <main className="px-5 my-6 sm:px-16 lg:px-28 xl:flex xl:justify-evenly xl:w-full xl:mt-2">
      <div className="xl:w-1/2">
        <div>
          <h1 className="text-white text-4xl font-extrabold leading-normal sm:text-7xl lg:text-8xl lg:leading-[7rem] sm:leading-[90px] ">
            Amplify Your Reach With Our <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 ">
              Advanced Link Management
            </span>
            <br />
            Platform
          </h1>
        </div>
        <div className="mt-5 sm:mt-10 lg:mt-2">
          <p className="text-gray-200 sm:text-2xl lg:leading-10">
            Unleash the potential of Data, Track Location, Maximize Engagement
            and Supercharge your Online Success
          </p>
          <Link to="/signup">
            <button className="text-white mt-6 sm:mt-10 lg:mt-6 font-semibold text-xl  rounded-lg px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-500 hover:-translate-y-1 hover:duration-200 sm:text-2xl sm:py-3 ">
              Try Free
            </button>
          </Link>
        </div>
      </div>
      <div className="xl:w-1/2 sm:flex lg:justify-end sm:justify-center">
        <img
          className="mt-12 px-3 sm:mt-16 lg:w-[85%] lg:h-[85%] "
          src={img}
          alt="main_img"
        />
      </div>
    </main>
  );
};
export default Main;
