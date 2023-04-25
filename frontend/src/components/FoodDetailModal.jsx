import React from "react";
import GoogleMapReact from "google-map-react";

const FoodDetailModal = ({ food, detailModalOn, toggleDetailModal }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/30 z-30 flex items-center justify-center ${
        !detailModalOn && "hidden"
      }`}
    >
      <div className='bg-white w-[95%] md:w-[80%] lg:w-1/2 h-[90%] overflow-scroll flex flex-col scrollbar-hide p-10 rounded relative'>
        <i
          class='absolute top-0 left-0 bx bx-x text-3xl p-2 cursor-pointer'
          onClick={() => toggleDetailModal(false)}
        ></i>
        <img
          src={food.image}
          className=' object-cover w-full h-40 rounded-lg'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 mt-8'>
          <div className='flex flex-col'>
            <h1 className='font-bold text-xl mb-4'>Food Detail:-</h1>
            <span className='font-medium my-1'>Name: {food.name}</span>
            <span className='font-medium my-1'>
              Quantity: {food.quantity} {food.type == "Kilo" && "Kg"}
            </span>
            <span className='font-medium my-1'>
              Posted time: {food.createdAt}
            </span>
            <span className='font-medium my-1'>
              Expiry time: {food.expiry} Hours
            </span>
          </div>
          <div className='flex flex-col mt-4 md:mt-0'>
            <h1 className='font-bold text-xl mb-4'>Provider Detail:-</h1>
            <span className='font-medium my-1'>Name: {food.providerName}</span>
            <span className='font-medium my-1'>
              Contact number: +91 {food.providerContact}
            </span>
            <span className='font-medium my-1'>Address: {food.address}</span>
          </div>
        </div>
        <div className='w-full'></div>
      </div>
    </div>
  );
};

export default FoodDetailModal;
