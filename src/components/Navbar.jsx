import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUtensils } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "text-primary"
        : "text-dark hover:text-primary"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold text-primary"
          onClick={() => setOpen(false)}
        >
          <FaUtensils />
          FoodHub
        </NavLink>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Главная
          </NavLink>
          <NavLink to="/menu" className={linkClass}>
            Меню
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            О нас
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-dark hover:text-primary transition-colors" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </NavLink>

          <button
            className="md:hidden text-2xl text-dark"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col bg-white border-t px-4 pb-4 gap-1">
          <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/menu" className={linkClass} onClick={() => setOpen(false)}>
            Меню
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
            О нас
          </NavLink>
        </nav>
      )}
    </header>
  );
}
