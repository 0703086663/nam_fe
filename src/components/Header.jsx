import { useState, StrictMode, useContext, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../auth/AuthContext";
const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a class="flex items-center">
            <img
              src="https://static.zerochan.net/Highschool.DxD.full.3600700.jpg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Hentai Management
            </span>
          </a>
          <div class="flex items-center lg:order-2">
            <a class=" bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              {currentUser?.name}
            </a>
            <button
              className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => logout()}
              type="submit"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
