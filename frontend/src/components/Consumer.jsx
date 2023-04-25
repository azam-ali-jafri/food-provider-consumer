import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "../data";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
import FoodCard from "./FoodCard";
import Loader from "./loader/Loader";

const Consumer = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const [addressModal, toggleAddressModal] = useState(true);
  const [location, setLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [foodList, setFoodList] = useState(null);
  const [range, setRange] = useState(null);
  const [address, setAddress] = useState(null);

  const handleModalAddress = async () => {
    if (userAddress === "") return alert.error("enter address");
    else {
      setLoading(true);
      const addressCoordinates = await axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${userAddress}&key=10c17bb0cb1e4a76a50494ec2de3ac1a`
        )
        .catch(() => {
          return alert.error("enter valid address");
        });

      const long = addressCoordinates.data.results[0].geometry.lng;
      const lat = addressCoordinates.data.results[0].geometry.lat;

      setLocation({ type: "Point", coordinates: [long, lat] });

      window.localStorage.setItem("address", userAddress);
      window.localStorage.setItem(
        "location",
        JSON.stringify({ type: "Point", coordinates: [long, lat] })
      );

      toggleAddressModal(false);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    const coordinates = location.coordinates;
    axios
      .post(
        `/api/v1/user/consumer/list/?${range && `range=${range}`}&${
          address && `address=${address}`
        }`,
        { coordinates }
      )
      .then((res) => {
        setLoading(false);
        setFoodList(res.data.foodList);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    setLoading(true);
    document.title = "Consumer";

    const locationFromStorage = window.localStorage.getItem("location");
    if (locationFromStorage) setLocation(JSON.parse(locationFromStorage));
    const addressFromStorage = window.localStorage.getItem("address");
    if (addressFromStorage) setUserAddress(addressFromStorage);

    axios
      .post("/api/v1/user/consumer/list")
      .then((res) => {
        setFoodList(res.data.foodList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    if (locationFromStorage) toggleAddressModal(false);
    setLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className={`fixed inset-0 items-center justify-center bg-black/40 h-screen flex z-40 ${
              !addressModal && "hidden"
            }`}
          >
            <div className='w-[95%] md:w-3/4 lg:w-1/2 bg-white rounded px-3 md:px-6 py-4 flex flex-col gap-4 items-center'>
              <input
                type='text'
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder='enter proper address'
                className='outline-none border rounded px-4 py-2 w-full'
              />
              <div className='flex gap-4'>
                <button
                  onClick={handleModalAddress}
                  disabled={loading && true}
                  className='px-4 py-2 rounded text-white border-none bg-green-600 hover:bg-green-700'
                >
                  {!loading ? "Enter" : "Wait"}
                </button>
                <button
                  onClick={() => {
                    if (!location) return;
                    else toggleAddressModal(false);
                  }}
                  className='px-4 py-2 rounded text-white border-none bg-yellow-500 hover:bg-yellow-700'
                >
                  Close
                </button>
                <button
                  onClick={() => navigate("/")}
                  className='px-4 py-2 rounded text-white border-none bg-red-600 hover:bg-red-700'
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-6'>
            <input
              type='Number'
              placeholder='range (in km)'
              value={range}
              onChange={(e) => {
                if (e.target.value < 0) return;
                if (e.target.value === 0) setRange(null);
                else setRange(e.target.value);
              }}
              className='rounded px-4 py-2 bg-transparent border-b-2 border-black/20 outline-none'
            />
            <input
              type='text'
              placeholder='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='rounded px-4 py-2 bg-transparent border-b-2 border-black/20 outline-none'
            />

            <button
              onClick={handleSearch}
              className='font-semibold rounded px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 flex items-center gap-2 justify-center'
            >
              <i class='bx bx-search-alt-2'></i>Search
            </button>
            <button
              onClick={() => toggleAddressModal(true)}
              className='font-semibold rounded px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 flex items-center gap-2 justify-center'
            >
              <i class='bx bxs-edit-location'></i>Change Location
            </button>
          </div>
          <hr />
          <div>
            {foodList?.length === 0 ? (
              <div className='flex flex-col items-center justify-center pt-36'>
                <h2 className='text-xl lg:text-5xl text-center'>No result</h2>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
                {foodList?.map((item) => (
                  <FoodCard food={item} setFoodList={setFoodList} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Consumer;
