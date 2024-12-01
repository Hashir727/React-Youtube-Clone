import { useState, useEffect } from "react";
import GOOGLE_API_KEY from "./constants";

function useVideoDetails(videoId, apiKey) {
  const [videoDetails, setVideoDetails] = useState({ title: "Untitled Video", subscriberCount: "Subscribers unavailable" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${GOOGLE_API_KEY}`
        );
        const videoData = await videoResponse.json();

        console.log("Video Data:", videoData);

        if (videoData.items && videoData.items.length > 0) {
          const title = videoData.items[0]?.snippet?.title || "Untitled Video";
          const statistics = videoData.items[0]?.statistics;

          if (statistics && statistics.subscriberCount) {
            setVideoDetails({ title, subscriberCount: statistics.subscriberCount });
          } else {
            setVideoDetails({ title, subscriberCount: "Subscribers unavailable" });
          }
        } else {
          console.warn("No items found in the videoData response.");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId, apiKey]);

  return { ...videoDetails, loading };
}

export default useVideoDetails;
