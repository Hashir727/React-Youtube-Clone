import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";

function VideoSection() {
  const isMenuOpen = useSelector((store) => store.toggle.isSideBarOpen);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setVideos(json.items);
  };
  console.log(videos);

  // Define the gap class based on isMenuOpen value
  const gapClass = isMenuOpen ? 'gap-x-6' : 'gap-x-12';

  return (
    <div className={`flex flex-wrap gap-y-8 ${gapClass}`}>
      {videos.map((video) => (
        <Link to={"/watch?v=" + video.id} key={video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
}

export default VideoSection;
