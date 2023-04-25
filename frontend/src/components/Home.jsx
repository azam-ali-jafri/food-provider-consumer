import React, { useEffect } from "react";
import Navbar from "./Navbar";
import banner from "../assets/banner1.png";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "Save food";
  }, []);
  return (
    <div>
      <Navbar />
      <div className='flex flex-col lg:flex-row px-4 py-4 items-center justify-center lg:px-20'>
        <div className='lg:w-1/2 flex flex-col justify-center items-center lg:items-start'>
          <h1 className='flex flex-col items-center lg:items-start font-bold text-2xl lg:text-[2rem] xl:text-[3rem] lg:w-[37rem]'>
            <span className='text-green-600 xl:mb-8'>
              You provide the food,
            </span>
            <span className=' text-orange-500'>we'll find the consumer</span>
          </h1>
          <div className=' my-10'>
            <h3 className='text-[1.5rem] font-semibold'>Continue as</h3>
            <div className='flex items-center gap-3 mt-4'>
              <Link
                to='/provider'
                className='px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700'
              >
                Provider
              </Link>
              <span>/</span>
              <Link
                to='/consumer'
                className='px-4 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700'
              >
                Consumer
              </Link>
            </div>
          </div>
        </div>
        <div className='lg:w-1/2'>
          <img src={banner} />
        </div>
      </div>
    </div>
  );
};

export default Home;
