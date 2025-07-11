import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiUser } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");
  const navigate = useNavigate(); // ✅ for client-side navigation

  const [showSubnav, setShowSubnav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowSubnav(currentY < lastScrollY || currentY < 50);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logout = () => {
    localStorage.clear();
    navigate("/"); // ✅ fast logout
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav className="bg-white text-black sticky top-0 z-50 w-full shadow-md">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo2.svg" alt="logo" className="h-12 w-auto" />
            <span className="text-xl font-bold tracking-wide">SwaMarg</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full w-full max-w-md justify-self-center">
            <AiOutlineSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search the web"
              className="bg-transparent w-full focus:outline-none text-sm text-black placeholder:text-gray-500"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 justify-self-end text-md font-medium">
            <BsSun className="text-yellow-500" title="Weather" />
            <FiSettings className="hover:text-blue-600 cursor-pointer" />
            {username ? (
              <>
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center gap-1 hover:text-blue-600"
                >
                  <FiUser title="Account" />
                  <span>{name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* SLIDING SUB-NAVBAR */}
      <div
        className={`bg-white text-black px-6 py-2 text-sm transition-transform duration-300 z-40 sticky top-[65px] ${
          showSubnav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto">
            <button className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-black">
              ☰
            </button>
            <Link to="/" className="hover:text-blue-600">Discover</Link>
            <Link to="#" className="hover:text-blue-600">Following</Link>
            <Link to="#" className="text-blue-600 font-semibold">News</Link>
            <Link to="#" className="text-yellow-600">Entertainment</Link>
            <Link to="#" className="text-yellow-500">Lifestyle</Link>
            <Link to="#" className="hover:text-blue-600">Autos</Link>
          </div>
          <button className="border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-100 hover:text-black transition">
            Personalize
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
