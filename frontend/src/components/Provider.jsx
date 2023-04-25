import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import FoodCard from "./FoodCard";
import Loader from "./loader/Loader";
import Navbar from "./Navbar";

const Provider = () => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOn, toggleModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.title = "Provider";

    axios
      .get("/api/v1/user/provider/list")
      .then((res) => {
        setLoading(false);
        setFoodList(res.data.list);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <div className='h-[calc(100%-5rem)]'>
          <CreateModal
            modalOn={modalOn}
            toggleModal={toggleModal}
            setFoodList={setFoodList}
          />
          <div
            className='fixed z-10 left-8 bottom-8 md:left-auto md:right-8 text-2xl md:text-5xl py-4 px-6 rounded-lg text-white bg-blue-500 hover:bg-blue-600 cursor-pointer'
            onClick={() => toggleModal(true)}
          >
            <i class='bx bxs-plus-circle'></i>
          </div>

          {foodList.length === 0 ? (
            <div className='flex flex-col items-center justify-center pt-36'>
              <h2 className='text-xl lg:text-5xl text-center'>
                You haven't provided any food currently
              </h2>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '>
              {foodList.map((item) => (
                <FoodCard food={item} setFoodList={setFoodList} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Provider;
