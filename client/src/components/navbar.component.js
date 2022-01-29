import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row flex-wrap justify-end items-center shadow-lg">
      <a href="" className="py-3 px-5 text-white hover:bg-white hover:text-blue-500 duration-300">Home</a>
      <a href="" className="py-3 px-5 text-white hover:bg-white hover:text-blue-500 duration-300">Profile</a>
      <a href="" className="py-3 px-5 text-white hover:bg-white hover:text-blue-500 duration-300">About</a>
      <button className="py-3 px-5 text-white hover:bg-white hover:text-red-500 duration-300">Logout</button>
    </div>
  );
}

export default Navbar;