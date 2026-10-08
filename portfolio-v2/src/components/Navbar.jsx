import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import "./Navbar.css";

const links = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" },
  { label: "GitHub", to: "/github" },
  { label: "Contact", to: "/contact" },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="header">
      <div className="container header-container">
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
          aria-label="Marvin Lavoe home"
        >
          MARVIN <span>LAVOE</span>
        </Link>
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav aria-label="Primary">
          <ul
            id="primary-navigation"
            className={isOpen ? "nav-menu active" : "nav-menu"}
          >
            {links.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-cta-item">
              <Link to="/contact" className="nav-cta" onClick={closeMenu}>
                Let’s talk <FaExternalLinkAlt />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
