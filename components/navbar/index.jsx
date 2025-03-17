"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const NavBar = () => {

    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => {
        setIsHidden(!isHidden);
      };

  return (
        <nav className="absolute w-full bg-gray-900 border-gray-800 dark:bg-black-2">
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src="/images/logo/logo.svg"  
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Walt Pixels</span>
            </a>
            <button onClick={() => handleClick()}
                data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-1 w-8 h-8 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className={` ${isHidden ? 'hidden' : ''} relative w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-2 md:p-0 mt-4 border border-gray-800 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-900">
                <li>
                <a href="/" className="block py-1 px-3 text-gray-100 text-sm rounded hover:bg-gray-600">Home</a>
                </li>
                <li>
                <a href="/about" className="block py-1 px-3 text-gray-100  text-sm rounded hover:bg-gray-600">About</a>
                </li>
                <li>
                <a href="#" className="block py-1 px-3 text-gray-100 rounded text-sm  hover:bg-gray-600">Services</a>
                </li>
                <li>
                <a href="#" className="block py-1 px-3 text-gray-100 rounded text-sm hover:bg-gray-600">Pricing</a>
                </li>
                <li>
                <a href="/signin" className="block py-1 px-3 text-gray-100 text-sm  rounded hover:bg-gray-600">Sign In</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
  )
}

export default NavBar