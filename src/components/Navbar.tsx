import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const menuItems = [
  { title: "תפריט", url: "/menu" },
  // { title: "אודות", url: "/about" },
  // { title: "צור קשר", url: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-accent-300 shadow-lg items-center min-h-[8.5vh] max-h-[8.5vh]">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="flex justify-between">
          {/* Logo and Title Section */}
          <Link to="/" className="flex items-center py-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 flex-none" />
            <div className="grid justify-items-stretch mr-2 flex-grow">
              <p className="text-lg font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-primary via-stone-400 to-secondary-darker">
                Go Fresh
              </p>
              <p className="text-xs text-secondary-darker justify-self-start">
                Be Your Self
              </p>
            </div>
          </Link>
          {/* Navigation and Hamburger Menu */}
          <div className="flex items-center space-x-4">
            {/* Main Menu for larger screens */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={`${item.title}-${item.url}`}
                  to={item.url}
                  className="py-2 px-2 text-primary-darker font-semibold hover:text-secondary transition duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            {/* Hamburger Menu Button - Ensure this div is always on the left */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 text-2xl"
              >
                {isMenuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu with clsx */}
        <div
          className={clsx(
            "absolute z-50 top-[8.5vh] left-0 w-full bg-white shadow-lg p-4 transition-all duration-300 md:hidden",
            { block: isMenuOpen, hidden: !isMenuOpen }
          )}
        >
          {menuItems.map((item) => (
            <Link
              key={`${item.title}-${item.url}`}
              to={item.url}
              className="py-4 px-2 text-primary-darker font-semibold hover:text-secondary transition duration-300 block"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
