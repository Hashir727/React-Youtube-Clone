import React, { useState, useEffect } from "react";
import useTimePassedSince from "../utils/useTimePassedSince";
import useYoutubeApi from "../utils/useYoutubeApi";
import { GOOGLE_API_KEY } from "../utils/constants";

function VideoCard({ info }) {
  const googleApiKey = GOOGLE_API_KEY;

  const [channelLogo, setChannelLogo] = useState("");
  const channelId = info.snippet.channelId;

  const { data: channelData, error: channelError } = useYoutubeApi(
    `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet`,
    googleApiKey    
  );

  useEffect(() => {
    if (channelData) {
      const logoUrl = channelData.items[0]?.snippet?.thumbnails?.default?.url || "";
      setChannelLogo(logoUrl);
    }
  }, [channelData]);

  const timePassed = useTimePassedSince(info.snippet.publishedAt);

  return (
    <div className="flex flex-col">
      <img
        src={info.snippet.thumbnails.medium.url}
        alt={info.snippet.title}
        className="rounded rounded-xl hover:rounded-none transition-all duration-200"
      />
      <div className="vide_description flex gap-x-2 w-72 mt-2">
        <div className="channel_img">
          {channelLogo && (
              <img
                src={channelLogo}
                alt={`${info.snippet.channelTitle}'s Logo`}
                className="w-8 h-8 rounded-full"
              />
            )}
        </div>
        <div className="">
          <p className="font-semibold">{info.snippet.title}</p>
            <p className="text-gray-600 text-sm mt-1 font-semibold">
              {info.snippet.channelTitle}
            </p>
            <div className="flex font-semibold gap-x-2">
              <p className="text-gray-600 text-sm mt-1">
                {new Intl.NumberFormat("en-US").format(info.statistics.viewCount)}{" "}
                views
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {timePassed} ago
              </p>
            </div>
            
        </div>
      </div>
      
    </div>
  );
}

export default VideoCard;
