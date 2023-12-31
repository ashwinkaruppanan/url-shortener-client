import axios from "axios";
import { useEffect, useState } from "react";
import api_url from "../api";

const Redirect = () => {
  const [urlError, setUrlError] = useState(false);
  const api = api_url;

  useEffect(() => {
    const checkUrl = async () => {
      const currentURL = window.location.href;
      const lastPart = currentURL.substring(currentURL.lastIndexOf("/") + 1);
      try {
        const response = await axios.get(`${api}/${lastPart}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          window.location.href = response.data;
          return;
        }
      } catch (err) {
        setUrlError(true);
        console.log(err);
      }
    };
    checkUrl();
  }, []);

  return (
    <div className="text-white h-screen flex items-center justify-center">
      {urlError && (
        <div>
          <h1 className="text-4xl text-center">404 - Page Not Found</h1>
        </div>
      )}
    </div>
  );
};
export default Redirect;
