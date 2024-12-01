import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../utils/toggleSideBarSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import SearchResults from "./SearchResults";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleSideBar());
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const debouncing = setTimeout(() => {
        getSearchSuggestions();
      }, 200);

      return () => {
        clearTimeout(debouncing);
      };
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      if (!data.ok) {
        throw new Error(`Failed to fetch: ${data.status} - ${data.statusText}`);
      }

      const json = await data.json();
      setSearchSuggestions(json[1]);
    } catch (error) {
      console.error(error);
    }
  };


  const navigate = useNavigate();

  const handleSuggestionButtonClick = (suggestion) => {
    setShowSuggestions(false);
    setSearchQuery(suggestion);
    // navigate("/results?search_query=" + suggestion);
  };
  const handleSearchButtonClick = () => {
    // Handle the search button click, e.g., navigate to the search results page
    navigate("/results?search_query=" + searchQuery);
  };
  

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="flex justify-between items-center p-4 h-15">
        <div className="flex items-center space-x-2 flex-initial">
          <MenuIcon
            className="cursor-pointer"
            onClick={() => toggleMenuHandler()}
          />
          <a href="/" className="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
              alt="youtube-logo"
              className="h-6 pl-1"
            />
          </a>
        </div>

        <div className="flex items-center justify-center flex-1">
          <div className="flex items-center space-x-2 md:w-9/12 lg:w-7/12 border border-gray-300 rounded-full shadow-inner border-1 h-11 pl-2 xl:w-7/12">
            <input
              type="text"
              placeholder="Search"
              className="outline-none pl-2 flex-grow w-full input_field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />

            <button className="w-14 border border-gray bg-gray-100 p-2 rounded-full rounded-l-none"
              onClick={handleSearchButtonClick}
            >
              <SearchIcon />
            </button>
          </div>
          <MicIcon className="ml-2 hover:bg-gray-100 cursor-pointer rounded-full" />
        </div>

        <div className="flex items-center space-x-2 flex-initial gap-[6px] mr-2 ">
          <VideoCallIcon className="cursor-pointer" />
          <NotificationsIcon className="cursor-pointer" />
          <Avatar alt="user" className="cursor-pointer" />
        </div>
      </div>
      <div className="fixed w-screen lg:ml-40 md:ml-20 sm:ml-10 xl:pl-11 lg:pl-0 md:pl-0 sm:pl-0 translate-x-40">
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="-translate-y-3 bg-white py-2 px-5 xl:w-[35rem] lg:w-[30rem] md:w-[20rem] sm:w-[20rem] w-[14rem] rounded-xl shadow-3xl border border-gray-200">
            <ul>
              {searchSuggestions.map((suggestion) => (
                <Link
                  key={suggestion}
                  to={"/results?search_query=" + suggestion}
                >
                  <li
                    key={suggestion}
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded-md shadow-sm"
                    // onClick={() => {navigate("/results?search_query=" + searchQuery)}}
                  >
                    <SearchIcon className="mr-2" />
                    {suggestion}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
