import { useState } from "react";
import ShieldSVG from "@/assets/Captain_America_Shield.svg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 bg-opacity-75 shadow-md backdrop-blur-lg text-white py-2 px-10 fixed w-screen top-0 left-0 z-50">
      <div className="container w-full flex justify-between items-center">
        <div className="text-2xl font-bold flex gap-2 items-center">
          <img
            src={ShieldSVG}
            alt="Marvelpedia"
            className="aspect-square h-10"
          />
          <a href="#" className="hover:text-gray-400">
            Marvelpedia
          </a>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
          <a href="#services" className="hover:text-gray-400">
            Services
          </a>
          <a href="#contact" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl"
            aria-label="Toggle mobile menu"
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
          <a href="#" className="block hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="block hover:text-gray-400">
            About
          </a>
          <a href="#services" className="block hover:text-gray-400">
            Services
          </a>
          <a href="#contact" className="block hover:text-gray-400">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
