import DashbordNavBar from "./DashboardNavBar";
import dashImg from "../assets/dashboard-empty-state.png";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Chart from "chart.js/auto";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [display, setDisplay] = useState("NoLinksToDisplay");
  const [allLinksData, setAllLinksData] = useState([]);
  const [propData, setPropData] = useState();
  let reverseData = allLinksData.reverse();

  const api = "https://reago-backend.up.railway.app";
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${api}/get-all-urls`, {
          withCredentials: true,
        });

        if (response.data.length > 0) {
          setAllLinksData(response.data);
          setDisplay("AllLinks");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const NoLinksToDisplay = () => (
    <>
      <div className="px-9 py-6 lg:px-44">
        <div className="flex justify-center p-3 ">
          <img src={dashImg} alt="" className="sm:h-[600px] lg:h-[500px]" />
        </div>
        <div className="text-white text-center">
          <h2 className="text-2xl font-semibold py-4">
            Every click tells a story
          </h2>
          <p className=" text-lg">
            See all your link data in one dashboard. View click metrics by
            location, device, referrers and more.
          </p>
        </div>
        <div className="flex justify-center mt-7">
          <button
            onClick={() => navigate("/create")}
            className="text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2 text-xl font-semibold"
          >
            Create a short link
          </button>
        </div>
      </div>
    </>
  );

  const Link = (prop) => {
    const [copy, setCopy] = useState("copy");

    const handleCopyClick = () => {
      setCopy("copied");
    };

    const date = new Date(prop.link.created_at);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    useEffect(() => {
      if (copy === "copied") {
        setTimeout(() => setCopy("copy"), 1000);
      }
    }, [copy]);

    return (
      <div className="bg-gray-800 p-3 lg:p-8 rounded-lg sm:flex justify-between my-4 w-full">
        <div
          className="sm:w-2/3 cursor-pointer"
          onClick={() => {
            setPropData(prop);
            setDisplay("LinkData");
          }}
        >
          <h2 className="text-lg font-medium truncate cursor-pointer">
            {prop.link.label}
          </h2>
          <p className="mt-2 text-blue-500  truncate ">
            https://reago.netlify.app/{prop.link.short_url_key}
          </p>
          <p className="mt-2  truncate">{prop.link.long_url}</p>
          <div className="flex mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>

            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center mt-4 sm:m-0">
          <button onClick={handleCopyClick}>
            <div className="flex mt-2 sm:m-0 border-2 border-gray-300 p-2  rounded-xl cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
              <p>{copy}</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const AllLinks = () => (
    <div className="text-white px-4 py-6 lg:px-44 sm:px-14 sm:mt-6">
      <h2 className="text-2xl font-semibold mb-2">Links</h2>
      {reverseData.map((l, index) => (
        <Link link={l} key={index} />
      ))}
    </div>
  );

  const LinkData = (prop) => {
    console.log(prop.data);
    const [copy, setCopy] = useState("copy");
    const qrRef = useRef();

    const handleCopyClick = () => {
      setCopy("copied");
    };

    useEffect(() => {
      if (copy === "copied") {
        setTimeout(() => setCopy("copy"), 1000);
      }
    }, [copy]);

    const date = new Date(prop.data.link.created_at);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // change the   link
    let qrUrl = ` ${prop.data.link.short_url_key}`;

    const qrcode = <QRCodeCanvas id="qrCode" value={qrUrl} size={180} />;

    const downloadQRCode = () => {
      let canvas = qrRef.current.querySelector("canvas");
      let image = canvas.toDataURL("image/png");
      let anchor = document.createElement("a");
      anchor.href = image;
      anchor.download = `qr-code.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };

    const PieChart = ({ data, title }) => {
      const chartRef = useRef(null);

      useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: data.labels,
            datasets: [
              {
                data: data.values,
                borderWidth: 1,
                animations: null,
              },
            ],
          },

          options: {
            plugins: {
              legend: {
                labels: {
                  color: "white",
                  font: {
                    size: 14,
                  },
                },
                title: {
                  display: true,
                  text: title,
                  color: "white",
                  font: {
                    size: 18,
                    family: "poppins",
                  },
                },
              },
            },
          },
        });
      }, [data]);

      return <canvas ref={chartRef}></canvas>;
    };

    let chartDataDevice = {
      labels: [],
      values: [],
    };

    chartDataDevice.labels = Object.keys(prop.data.link.device);
    chartDataDevice.values = Object.values(prop.data.link.device);

    let chartDataLocation = {
      labels: [],
      values: [],
    };

    chartDataLocation.labels = Object.keys(prop.data.link.location);
    chartDataLocation.values = Object.values(prop.data.link.location);

    return (
      <div className="px-4 py-6 lg:px-44 sm:px-14 sm:mt-6">
        <button>
          <div
            className="text-white font-semibold sm:text-xl flex items-center"
            onClick={() => setDisplay("AllLinks")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
            <h2 className="flex items-center">Back to list</h2>
          </div>
        </button>
        <div className="text-white bg-gray-800 p-4 lg:p-8 rounded-lg mt-4 sm:flex justify-between my-4 w-full">
          <div className="sm:w-2/3">
            <h2 className="text-lg font-medium break-all">
              {prop.data.link.label}
            </h2>
            <p className="mt-2 text-blue-500  break-all ">
              https://reago.netlify.app/{prop.data.link.short_url_key}
            </p>
            <p className="mt-2  break-all">{prop.data.link.long_url}</p>
            <div className="flex mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>

              <p>{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 sm:m-0">
            <button onClick={handleCopyClick}>
              <div className="flex mt-2 sm:m-0 border-2 border-gray-300 p-2  rounded-xl cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
                <p>{copy}</p>
              </div>
            </button>
          </div>
        </div>
        <div>
          <div className="bg-slate-800 p-6 mt-5 sm:flex justify-around items-center rounded-lg">
            <div className=" text-white text-center ">
              <h2 className="text-xl lg:text-2xl">Total Clicks</h2>
              <h2 className="text-2xl font-medium mt-2  sm:text-5xl">
                {prop.data.link.no_of_clicks}
              </h2>
            </div>
            <hr className="sm:hidden mt-6" />
            <div className="flex justify-center">
              <div>
                <div
                  ref={qrRef}
                  className="bg-gray-700 h-48 w-48 mt-8 sm:m-0 qrcontainer flex justify-center items-center"
                >
                  {qrcode}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="text-white border-2 p-1 rounded-lg font-medium"
                    onClick={downloadQRCode}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-slate-800 p-6 mt-5 sm:flex justify-around  items-center rounded-lg">
            <div className="flex justify-center">
              <div className="">
                <PieChart data={chartDataLocation} title={"Location"} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" mt-10 sm:m-0">
                <PieChart data={chartDataDevice} title={"Device"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let page = "";

  switch (display) {
    case "NoLinksToDisplay":
      page = <NoLinksToDisplay />;
      break;
    case "AllLinks":
      page = <AllLinks />;
      break;
    case "LinkData":
      page = <LinkData data={propData} />;
      break;
  }

  return (
    <>
      <DashbordNavBar create={setDisplay} />
      {page}
    </>
  );
};
export default Dashboard;
