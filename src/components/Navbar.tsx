import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

import DarkModeSwitcher from "./DarkModeSwitcher";
import LogoComponent from "./LogoComponent";

const menuItems = [
  { title: "תפריט", url: "/menu" },
  // { title: "אודות", url: "/about" },
  // { title: "צור קשר", url: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      // Check if the click is outside of the menuRef.current element
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return (): void => {
      // Remove the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Depend on an empty array to run the effect only once after initial

  const handleToggleHambugerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-accent-300 dark:bg-primary-darkest shadow-lg items-center min-h-[8.5vh] max-h-[8.5vh]">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="flex justify-between">
          {/* Logo and Title Section */}
          <Link to="/" className="flex items-center py-2">
            <LogoComponent />
          </Link>
          {/* Navigation and Hamburger Menu */}
          <div className="flex items-center space-x-4">
            {/* Main Menu for larger screens */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={`${item.title}-${item.url}`}
                  to={item.url}
                  className="py-2 px-2 text-primary-darker dark:text-primary-lightest font-semibold hover:text-secondary transition duration-300"
                >
                  {item.title}
                </Link>
              ))}
              <DarkModeSwitcher />
            </div>
            {/* Hamburger Menu Button - Ensure this div is always on the left */}
            <div className="md:hidden">
              <button
                onClick={handleToggleHambugerMenu}
                className="text-gray-800 text-2xl"
              >
                {isMenuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={clsx(
            "absolute z-50 top-[8.5vh] left-0 w-full bg-white dark:bg-slate-600 shadow-lg p-4 transition-all duration-300 md:hidden",
            { block: isMenuOpen, hidden: !isMenuOpen }
          )}
        >
          {menuItems.map((item) => (
            <Link
              key={`${item.title}-${item.url}`}
              to={item.url}
              className="py-4 px-2 text-primary-darker dark:text-primary-lightest font-semibold hover:text-secondary transition duration-300 block"
            >
              {item.title}
            </Link>
          ))}
          <div className="w-6 mr-5">
            <DarkModeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
