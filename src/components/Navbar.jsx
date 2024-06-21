import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { FaBars, FaNewspaper, FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import countries from "../api/countries.json";
import { useCountry } from "../context/countryContext";
import { PiNewspaper } from "react-icons/pi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [urlParams] = useSearchParams();
  const [menuOn, setMenuOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useCountry();
  const { cart } = useSelector((state) => state);

  const showMenu = () => {
    setMenuOn(!menuOn);
  };

  const links = [
    { to: "/health", label: "Health" },
    { to: "/science", label: "Science" },
    { to: "/technology", label: "Technology" },
    { to: "/sports", label: "Sports" },
    { to: "/entertainment", label: "Entertainment" },
    { to: "/business", label: "Business" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="w-full bg-gray-900">
      <nav className="flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700 bg-[#000c23] transition-all duration-200 top-0 w-screen z-20 p-6 relative">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-auto lg:flex-row flex-row-reverse overflow-hidden">
          <div className="w-max flex items-center flex-shrink-0 text-white mr-6 gap-5">
            <a
              href="/"
              className="w-[20%] flex items-center gap-1 font-semibold text-xl"
            >
              <div>India</div>
              <div className="text-green-500">Insight</div>
            </a>

            <div className="w-[80%] hidden lg:flex items-center gap-x-7">
              <label
                className="mx-auto relative h-11 bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                htmlFor="search"
              >
                <input
                  type="text"
                  id="search"
                  className="w-[750px] px-6 py-2 rounded-md flex-1 outline-none bg-white text-black mr-[100px]"
                  placeholder="Search News..."
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="w-full md:w-auto px-6 h-1 pb-8 pt-2 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                >
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </button>
              </label>
              <div
                className="bg-slate-900 ml-[6px]"
                hidden={urlParams.has("query")}
              >
                <select
                  className="bg-slate-900 cursor-pointer px-1"
                  hidden={urlParams.get("query")}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                >
                  <option value="in" defaultValue={"in"}>
                    IN
                  </option>
                  {countries &&
                    countries.map((con, i) => (
                      <option value={`${con}`} key={i}>
                        {con.toUpperCase()}
                      </option>
                    ))}
                </select>


              </div>
              <NavLink to="/cart">
                  <div className="relative">
                    <PiNewspaper className="text-2xl" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-whilte">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </NavLink>
            </div>
          </div>

          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
              onClick={showMenu}
            >
              {menuOn ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
        <div
          className={`menu absolute left-0 top-16 w-full flex flex-col gap-2 lg:hidden p-3 transition-all duration-300 bg-slate-900 z-[5] ${
            menuOn ? "translate-y-0" : "translate-y-[-150%]"
          }`}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              onClick={() => setMenuOn(!menuOn)}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full flex items-center">
            <input
              type="search"
              className="border border-teal-200 rounded-lg p-2 w-[90%] text-black"
              placeholder="Search News..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link
              to={`/search?query=${searchQuery}`}
              onClick={() => setMenuOn(!menuOn)}
              className="p-2 ml-2 rounded-full text-xl bg-teal-200 text-slate-900 hover:scale-95 hover:opacity-90"
              hidden={searchQuery === ""}
            >
              <FaSearch />
            </Link>
            <div
              className="bg-slate-900 ml-[6px] text-white"
              hidden={urlParams.has("query")}
            >
              <select
                className="bg-slate-900 cursor-pointer px-1"
                hidden={urlParams.get("query")}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setMenuOn(!menuOn);
                }}
              >
                <option value="in" defaultValue={"in"}>
                  IN
                </option>
                {countries &&
                  countries.map((con, i) => (
                    <option value={`${con}`} key={i}>
                      {con.toUpperCase()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-[800px] mx-auto mt-2 text-black flex justify-between items-center">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="text-white border-2 border-gray-700 rounded-md font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
