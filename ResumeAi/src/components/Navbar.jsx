import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-500 w-full shadow-sm shadow-pink-300 py-1 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px- py-1 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="robot.png" alt="Logo" className="h-15" />
          <h1 className="font-bold text-lg">Pinkyy Ai</h1>
        </div>

        {/* navbar links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/resume" className="hover:text-gray-300">Resume</Link>
          <Link to="/resources" className="hover:text-gray-300">Resources</Link>
          <Link to="/signup"> <button className='bg-pink-600/50  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-pink-400'>Sign Up</button> </Link>
          <Link to="/login"> <button className='border border-gray-700 text-gray-500 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black'>Login</button>  </Link>
          
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden cursor-pointer hover:text-gray-300 transition duration-200" onClick={() => setMenuOpen(true)} aria-label="Open Menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white text-gray-500 shadow-lg transform transition-transform duration-300 z-50  ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu" className='cursor-pointer hover:text-gray-300'>
            <X size={24} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 border-b border-pink-300 pb-2">Home</Link>
          <Link to="/resume" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 border-b border-pink-300 pb-2">Resume</Link>
          <Link to="/resources" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 border-b border-pink-300 pb-2">Resources</Link>
          <div className='flex gap-5'>
          <Link to="/signup"> <button className='bg-pink-600/50  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-pink-400'>Sign Up</button> </Link>
          <Link to="/login"> <button className='border border-gray-700 text-gray-500 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black'>Login</button>  </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
