import { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../auth/AuthContext";
const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <header className="shadow-lg border-b-gray-200 border-b">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <a className="flex items-center" href="/">
            <img
              src="https://gba-vietnam.org/wp-content/uploads/Screenshot-2023-05-22-093745.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              FPT Management
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="/campaign"
              className="uppercase font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 text-gray-500 hover:text-black"
            >
              My campaigns
            </a>
            <a
              href="/profile"
              className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 text-gray-500 hover:text-black"
            >
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
