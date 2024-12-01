import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../utils/toggleSideBarSlice";
import { Link } from "react-router-dom";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const API_KEY = "AIzaSyAHcAcNXsmaeXaLpflgt0_bUzJkHoNuLn0";
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&key=${API_KEY}`;

  const getSearchResults = async () => {
    try {
      if (!searchQuery) {
        console.error("No search query provided.");
        return;
      }

      const data = await fetch(apiUrl);
      const json = await data.json();

      if (json.error) {
        console.error("Error in API response:", json.error.message);
      } else {
        setSearchResults(json.items);
        console.log("API Response:", json);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [searchQuery]);

  const closeMenubar = () => {
    dispatch(closeSideBar());
  };

  if (!searchResults || searchResults.length === 0) return <div>no videos</div>;

  return (
    <div className="w-screen p-2 m-2">
      {searchResults.map((result) => (
        <Link
          to={"/watch?v=" + result.id.videoId}
          key={result.id.videoId}
          onClick={closeMenubar}
        >
          <div className="flex h-56 px-4 py-2 m-2 hover:cursor-pointer">
            <img
              className="rounded-lg"
              src={result.snippet.thumbnails.medium.url}
              alt="youtube-thumbnail"
            />
            <div className="ml-4">
              <h1 className="font-semibold text-lg">{result.snippet.title}</h1>
              <br />
              <p>{result.snippet.channelTitle}</p>
              <p className="text-sm">{result.snippet.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
