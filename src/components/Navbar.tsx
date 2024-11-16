import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShieldSVG from "@/assets/Captain_America_Shield.svg";

const savedEmail = localStorage.getItem("userEmail");

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="bg-gray-900 bg-opacity-75 shadow-md backdrop-blur-lg text-white py-2 px-10 fixed w-screen top-0 left-0 z-50 flex justify-between">
      <div className="text-2xl font-bold flex gap-2 items-center cursor-pointer">
        <img
          src={ShieldSVG}
          alt="Marvelpedia"
          className="aspect-square h-10"
          onClick={() => navigate("/")}
        />
        <span onClick={() => navigate("/")} className="hover:text-gray-400">
          Marvelpedia
        </span>
      </div>

      {savedEmail && (
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => navigate("/characters")}
            className="hover:text-gray-400 font-bold"
          >
            Characters
          </button>
          <button
            onClick={() => navigate("/events")}
            className="hover:text-gray-400 font-bold"
          >
            Events
          </button>
        </div>
      )}

      {savedEmail && (
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl"
            aria-label="Toggle mobile menu"
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      )}

      {isMobileMenuOpen && savedEmail && (
        <div className="md:hidden rounded-b-md bg-gray-900  shadow-md fixed top-14 right-9 text-white p-4 space-y-4 z-50 ">
          <button
            onClick={() => {
              toggleMobileMenu();
              navigate("/characters");
            }}
            className="block hover:text-gray-400 p-2 font-bold"
          >
            Characters
          </button>
          <button
            onClick={() => {
              toggleMobileMenu();
              navigate("/events");
            }}
            className="block hover:text-gray-400 p-2 font-bold"
          >
            Events
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
