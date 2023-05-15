import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../util/getUser";
import axios from "axios";

const activeStyle =
  "flex items-center gap-4 py-2 px-4 rounded bg-gradient-to-r from-green-500 to-green-600 text-white ";
const nonActiveStyle =
  "flex items-center gap-4 py-2 px-4 rounded  hover:text-green-600  ";

const Navbar = () => {
  const [isNavOn, toggleNav] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    axios.get("/api/v1/user/logout").then(() => {
      toggleNav(false);
      navigate("/", { replace: true });
    });
  };

  const user = fetchUser();
  return (
    <div className='flex whitesmoke shadow-md sticky top-0 z-20 items-center justify-between py-4 px-6 lg:px-10 h-[5rem]'>
      <div className='w-28 self-center'>
        <img src={logo} />
      </div>
      <div className='text-[2.5rem] lg:hidden' onClick={() => toggleNav(true)}>
        <i class='uil uil-bars'></i>
      </div>
      <div
        className={`absolute z-50 p-4 top-0 right-0 h-screen bg-white sm:3/4 md:w-2/5 ${
          !isNavOn && "hidden"
        }`}
      >
        <i
          class='bx bx-x text-[3rem] mb-4'
          onClick={() => toggleNav(false)}
        ></i>
        <div className='flex flex-col gap-4'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? activeStyle : nonActiveStyle
            }
            onClick={() => toggleNav(false)}
          >
            <i class='bx bx-home-alt-2'></i> Home
          </NavLink>
          <NavLink
            to='/provider'
            className={({ isActive }) =>
              isActive ? activeStyle : nonActiveStyle
            }
            onClick={() => toggleNav(false)}
          >
            <i class='bx bxs-bowl-rice'></i> Provider
          </NavLink>
          <NavLink
            to='/consumer'
            className={({ isActive }) =>
              isActive ? activeStyle : nonActiveStyle
            }
            onClick={() => toggleNav(false)}
          >
            <i class='bx bx-restaurant'></i> Consumer
          </NavLink>
          {/* <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive ? activeStyle : nonActiveStyle
            }
            onClick={() => toggleNav(false)}
          >
            <i class='bx bxs-user'></i> About us
          </NavLink> */}
          {user ? (
            <Link
              className='flex items-center gap-2 py-2 px-4 bg-red-600 rounded-lg text-white hover:bg-red-400'
              onClick={handleLogout}
            >
              <i class='bx bx-power-off'></i> Logout
            </Link>
          ) : (
            <Link
              to='/login'
              className='flex items-center gap-2 py-2 px-4 bg-green-600 rounded-lg text-white hover:bg-green-400'
              onClick={() => toggleNav(false)}
            >
              Login <i class='bx bx-right-arrow-alt'></i>
            </Link>
          )}
        </div>
      </div>
      <div className='hidden lg:flex gap-2 xl:gap-7 text-lg font-medium '>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? activeStyle : nonActiveStyle
          }
        >
          <i class='bx bx-home-alt-2'></i> Home
        </NavLink>
        <NavLink
          to='/provider'
          className={({ isActive }) =>
            isActive ? activeStyle : nonActiveStyle
          }
        >
          <i class='bx bxs-bowl-rice'></i> Provider
        </NavLink>
        <NavLink
          to='/consumer'
          className={({ isActive }) =>
            isActive ? activeStyle : nonActiveStyle
          }
        >
          <i class='bx bx-restaurant'></i> Consumer
        </NavLink>
        {/* <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive ? activeStyle : nonActiveStyle
          }
        >
          <i class='bx bxs-user'></i> About us
        </NavLink> */}
        {user ? (
          <Link
            onClick={handleLogout}
            className='flex items-center gap-2 py-2 px-4 bg-gradient-to-br from-red-500 to-red-600 rounded text-white hover:bg-gradient-to-tl hover:from-red-600 hover:to-red-700'
          >
            <i class='bx bx-power-off'></i> Logout
          </Link>
        ) : (
          <Link
            to='/login'
            className='flex items-center gap-2 py-2 px-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded text-white hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-700'
          >
            Login <i class='bx bx-right-arrow-alt'></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
