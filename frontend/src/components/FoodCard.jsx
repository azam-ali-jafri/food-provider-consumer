import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../util/getUser";
import FoodDetailModal from "./FoodDetailModal";

const FoodCard = ({ food, setFoodList }) => {
  const [loading, setLoading] = useState(false);
  const [detailModalOn, toggleDetailModal] = useState(false);

  /* This code is calculating whether a food item has expired or not. */
  const updatedTime = new Date(
    new Date().getTime() - food.expiry * 60 * 60 * 1000
  ).toLocaleString();
  const foodTime = food.createdAt;

  const isExpired = updatedTime > foodTime;

  const user = fetchUser();

  /*
   * This function sends a DELETE request to the server to delete a food item and updates the food list
   * state accordingly.
   */
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`/api/v1/food/delete/${food._id}`)
      .then((res) => {
        setFoodList(res.data.foodList);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <FoodDetailModal
        food={food}
        detailModalOn={detailModalOn}
        toggleDetailModal={toggleDetailModal}
      />
      <div
        className='flex flex-col rounded border bg-white m-4 p-4 relative cursor-pointer hover:scale-105 transition duration-300'
        onClick={() => toggleDetailModal(true)}
      >
        {isExpired && (
          <div className='absolute inset-0 bg-red-500/50 w-full h-full rounded flex items-center justify-center'>
            <h1 className='font-bold text-4xl text-red-700 rotate-45'>
              EXPIRED
            </h1>
          </div>
        )}
        <img
          src={food.image}
          className='w-full h-[10rem] object-cover rounded-lg'
        />
        <div className='flex flex-col gap-2 mt-4 w-3/4'>
          <h1 className='text-xl font-semibold text-black/80'>
            {food.name} - {food.quantity} {food.type == "Kilo" && "Kg"}
          </h1>
          <span className='font-medium'>provided by {food.providerName}</span>
        </div>
        {user?._id === food?.user && (
          <button
            onClick={(e) => {
              handleDelete();
              e.stopPropagation();
            }}
            disabled={loading ? true : false}
            className='absolute right-4 bottom-4 rounded-full bg-red-700/60 text-white text-xl p-2 cursor-pointer hover:bg-red-800 flex items-center justify-center'
          >
            <i class='bx bxs-trash'></i>
          </button>
        )}
      </div>
    </>
  );
};

export default FoodCard;
