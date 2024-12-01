import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../utils/toggleSideBarSlice";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../utils/constants";
import { formatSubscribers } from "../utils/constants";
import { ShimmerOverlay } from "./Shimmer";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";

function WatchPage() {
  const [searchParams] = useSearchParams();
  const [videoTitle, setVideoTitle] = useState("");
  const [channelLogo, setChannelLogo] = useState("");
  const [channelName, setChannelName] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const youtubeCommentsAPIKey = "AIzaSyAHcAcNXsmaeXaLpflgt0_bUzJkHoNuLn0";

  const fetchData = async () => {
    try {
      const videoId = searchParams.get("v");

      if (videoId) {
        // Fetch video details
        const googleApiKey = GOOGLE_API_KEY;
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${googleApiKey}`
        );
        const videoData = await videoResponse.json();

        const title = videoData.items[0]?.snippet?.title || "Untitled Video";
        setVideoTitle(title);

        const channelId = videoData.items[0]?.snippet?.channelId;
        if (channelId) {
          const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,statistics&key=${googleApiKey}`
          );
          const channelData = await channelResponse.json();

          const logoUrl =
            channelData.items[0]?.snippet?.thumbnails?.default?.url || "";
          const name = channelData.items[0]?.snippet?.title || "";
          setChannelLogo(logoUrl);
          setChannelName(name);

          const subsCount =
            channelData.items[0]?.statistics?.subscriberCount || 0;
          setSubscriberCount(subsCount);
        }

        // Fetch comments
        const commentsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${youtubeCommentsAPIKey}`
        );

        const commentsJson = await commentsResponse.json();
        setCommentsData(commentsJson.items || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    dispatch(closeSideBar());
  }, [dispatch]);

  return (
    <div className="flex flex-col ml-14 mt-2 w-full relative">
      <div className="flex">
        <div className="video_section pl-12 relative w-full lg:w-3/3 xl:w-[61%] sm:w-11/12">
          {loading && <ShimmerOverlay width={728} height={409.5} />}
          <iframe
            className="w-full rounded-xl"
            style={{ height: "409.5px" }}
            src={`https://www.youtube.com/embed/${searchParams.get("v")}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="video_description flex flex-col">
            <div className="my-3 font-semibold text-xl">
              {loading ? "" : videoTitle}
            </div>
            <div className="flex items-center">
              {loading ? (
                <ShimmerOverlay width={300} height={28} />
              ) : (
                channelLogo && (
                  <img
                    src={channelLogo}
                    alt="Channel Logo"
                    className="rounded rounded-full h-12 w-12"
                  />
                )
              )}
              <div className="ml-2">
                <div className="font-semibold">
                  {loading ? "" : channelName}
                </div>
                <div className="channel_name text-sm text-gray-700">
                  {loading ? (
                    <ShimmerOverlay width={100} height={48} className="mt-4" />
                  ) : (
                    <>{formatSubscribers(subscriberCount)} Subscribers</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recommendedVideos_section"></div>
      </div>
      <div className="comments-section ml-11 mt-5">
        {/* Render comments using commentsData */}
        <p className="text-2xl font-bold mt-7">Comments</p>
        <div className="border border-gray my-2"></div>
        {commentsData.map((comment) => (
          <div key={comment.id}>
            {/* Render comment content */}
            {comment.snippet &&
              comment.snippet.topLevelComment &&
              comment.snippet.topLevelComment.snippet && (
                <div className="comment mb-1">
                  <div className="comment-author flex ">
                    <div>
                      {comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl && (
                        <img
                          src={
                            comment.snippet.topLevelComment.snippet
                              .authorProfileImageUrl
                          }
                          alt="Author Logo"
                          className="rounded-full h-11 w-11"
                        />
                      )}
                    </div>
                    <div>
                      {comment.snippet.topLevelComment.snippet
                        .authorDisplayName && (
                        <span className="ml-2 text-sm font-semibold">
                          @
                          {
                            comment.snippet.topLevelComment.snippet
                              .authorDisplayName
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className="ml-[52px] -translate-y-5 text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        comment.snippet.topLevelComment.snippet.textDisplay,
                    }}
                  />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchPage;
