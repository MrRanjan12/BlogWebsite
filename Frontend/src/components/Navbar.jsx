import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition"
      >
        MyBlog
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/create"
          className="text-gray-700 hover:text-blue-600 transition duration-200"
        >
          Create
        </Link>

        {!username ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Profile
            </Link>
            <span className="text-gray-800 hidden sm:inline">
              Welcome, <span className="font-semibold">{username}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
