import { useState } from "react";
import DashboardNavBar from "./DashboardNavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const navigate = useNavigate();
  const api = "https://reago.up.railway.app";

  const [error, setError] = useState("");

  const [createLinkData, setCreateLinkData] = useState({
    destination: "",
    label: "",
    back_half: "",
  });

  const handleChange = (e) => {
    setCreateLinkData({
      ...createLinkData,
      [e.target.name]: e.target.value,
    });

    if (error !== "") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
        createLinkData.destination
      )
    ) {
      setError("invalid destination link");
      return;
    } else if (!/^\w+( \w+)?$/.test(createLinkData.label)) {
      setError("ivalid label");
      return;
    } else if (createLinkData.back_half.length < 4) {
      setError("back-half must contain 4 characters");
      return;
    }

    try {
      const data = {
        label: createLinkData.label,
        long_url: createLinkData.destination,
        short_url_key: createLinkData.back_half.replace(/\s/g, ""),
      };
      const response = await axios.post(`${api}/create-url`, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <DashboardNavBar />
      <div className="flex justify-center">
        <div className="px-4 py-6 lg:px-44  sm:mt-6 text-white">
          <div>
            <h1 className="text-2xl font-semibold">Create new</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="sm:inline-block  text-white mt-7 sm:text-lg">
              <div>
                <label htmlFor="destination">Destination link</label>
                <input
                  className="mt-2 w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="destination"
                  id="destination"
                  value={createLinkData.destination}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="label">Label</label>
                <input
                  className="mt-2 w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="label"
                  id="label"
                  value={createLinkData.label}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="back-half">Custom back-half</label>
                <input
                  className="mt-2 w-full border border-white bg-[#11101d] rounded-md p-2 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="back_half"
                  id="back_half"
                  value={createLinkData.back_half}
                  onChange={handleChange}
                />
              </div>
              <div className="sm:hidden">
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-blue-500 w-full p-2 rounded-lg hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-400 hover:text-blue-600 w-full p-2 rounded-lg "
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex justify-end">
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-400 hover:text-blue-600  p-2 px-4 mr-4 rounded-lg "
                  >
                    Cancel
                  </button>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-blue-500 p-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Create
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
      </div>
    </>
  );
};
export default Create;
