import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiUser, FiMenu, FiX } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const allCategories = ["Discover", "Following", "News", "Entertainment", "Lifestyle", "Autos"];

  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSubnav, setShowSubnav] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("preferences");
    return saved
      ? JSON.parse(saved)
      : { categories: allCategories, darkMode: false };
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowSubnav(currentY < lastScrollY || currentY < 50);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [preferences.darkMode]);

  const logout = () => {
    localStorage.clear();
    setSidebarOpen(false);
    navigate("/");
  };

  const toggleCategory = (cat) => {
    setPreferences((prev) => {
      const isSelected = prev.categories.includes(cat);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat],
      };
    });
  };

  const toggleDarkMode = () => {
    setPreferences((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const savePreferences = () => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    setShowPreferences(false);
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo2.svg" alt="logo" className="h-10 w-auto" />
            <span className="text-2xl font-semibold text-gray-800 tracking-tight">SwaMarg</span>
          </Link>

          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full max-w-md w-full border border-gray-200 shadow-inner">
            <AiOutlineSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-transparent w-full focus:outline-none text-sm text-gray-800 placeholder:text-gray-500"
            />
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-700">
            <BsSun className="text-yellow-500" />
            <FiSettings className="hover:text-blue-600 cursor-pointer" />
            {username ? (
              <>
                <Link to="/create" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full shadow-sm transition">
                  + New
                </Link>
                <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600">
                  <FiUser className="text-lg" />
                  <span>{name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full transition">
                  Register
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-2xl text-gray-800" onClick={() => setSidebarOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* SUBNAVIGATION */}
      <div className={`bg-white/70 backdrop-blur-md px-4 md:px-8 py-2 text-sm transition-transform duration-300 sticky top-[65px] shadow-sm ${showSubnav ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-gray-600 font-medium">
            {preferences.categories.map((label, i) => (
              <Link
                key={i}
                to="#"
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  label === "News" ? "bg-blue-100 text-blue-600 font-semibold" :
                  label === "Entertainment" ? "text-yellow-600" :
                  label === "Lifestyle" ? "text-yellow-500" : "hover:bg-gray-100"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setShowPreferences(true)}
            className="border border-gray-300 px-4 py-1.5 rounded-full text-gray-700 hover:bg-gray-100"
          >
            🎯 Personalize
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg p-6 rounded-r-xl backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-2xl text-gray-500">
                <FiX />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-gray-800">
              <Link to="/" onClick={() => setSidebarOpen(false)}>🏠 Home</Link>
              <Link to="/create" onClick={() => setSidebarOpen(false)}>✍️ Create Post</Link>
              {username ? (
                <>
                  <Link to="/profile" onClick={() => setSidebarOpen(false)}>👤 {name}</Link>
                  <button onClick={logout} className="text-left text-red-600">🔒 Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setSidebarOpen(false)}>🔐 Login</Link>
                  <Link to="/register" onClick={() => setSidebarOpen(false)}>📝 Register</Link>
                </>
              )}
              <Link to="#" onClick={() => setSidebarOpen(false)}>⚙️ Settings</Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* PERSONALIZE MODAL */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 space-y-5 text-gray-800"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">🎯 Personalize Feed</h2>
                <button onClick={() => setShowPreferences(false)} className="text-2xl text-gray-400">
                  <FiX />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-md font-medium">Select Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-full border transition text-sm ${
                        preferences.categories.includes(cat)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.darkMode}
                    onChange={toggleDarkMode}
                    className="accent-blue-600"
                  />
                  Enable Dark Mode
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={savePreferences}
                  className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
