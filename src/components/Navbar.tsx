import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return <nav className="absolute top-2 right-6">
    <Link className="text-lg hover:text-gray-100 transition-all ease-in-out duration-300" to="/races">Homepage</Link>
  </nav>;
};

export default Navbar;
