import { useEffect, useState } from "react";
import Input from "../../shared/components/Input";
import { BASE_SERVICE } from "../../services/BaseService";
import { VideoFilter, VideoResponse } from "../../models/Video";
import VideoTile from "../../shared/components/VideoTile";
import VideoSkelton from "../../shared/components/VideoSkelton";
import ErrorMessage from "../../shared/components/ErrorMessage";

function Home() {
  const [videos, setVideos] = useState<VideoResponse[]>([]);
  const [loading, setloading] = useState(true);
  const [showLimitMessage, setShowLimitMessage] = useState<boolean>(false);
  const [videoFilter, setVideoFilter] = useState<VideoFilter>({
    pageNumber: 1,
    pageSize: 3,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight &&
        !loading
      ) {
        setloading(true);
        setVideoFilter((prevFilter) => {
          return { ...prevFilter, pageNumber: prevFilter.pageNumber + 1 };
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    if (showLimitMessage) {
      setloading(false);
      return;
    }

    setloading(true);
    BASE_SERVICE.Post<VideoFilter, VideoResponse[]>(
      "Videos/fetch-videos",
      videoFilter
    )
      .then((res) => {
        if (res.isSuccess) {
          if (res.result && res.result.length > 0) {
            setVideos((videos) => [...videos, ...res.result!]);
          } else {
            setShowLimitMessage(true);
            console.log("Limit crossed");
          }
        }
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setloading(false));
  }, [videoFilter, showLimitMessage]);

  return (
    <div className="flex h-full">
      <div className="sidebar w-[15%] border border-black h-full"></div>
      <div className="main w-[85%]">
        <div className="top border border-black h-16 flex justify-evenly items-center fixed w-full bottom-0 top-0 z-50 bg-gray-50">
          <Input
            showLabel={false}
            type="search"
            placeholder="Search a video"
            classes="lg:w-[300px] md:w-[300px] w-[200px] mt-5"
          />
          <div className="h-8 me-1 w-8 border border-black rounded-full flex justify-center items-center p-2">
            1
          </div>
        </div>
        <div className="content border p-5 border-red-600 overflow-y-auto absolute w-[85%] flex gap-5 flex-wrap top-[64px] -z-0">
          {!loading
            ? videos &&
              videos.map((video, i) => {
                return <VideoTile video={video} key={i} />;
              })
            : Array(7)
                .fill(0)
                .map((_, i) => {
                  return <VideoSkelton key={i} />;
                })}
          {showLimitMessage && (
            <ErrorMessage message="You have reached the limit no more videos to fetch" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
