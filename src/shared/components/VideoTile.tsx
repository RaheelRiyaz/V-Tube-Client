import { formatDistanceToNow } from "date-fns";
import { VideoResponse } from "../../models/Video";

interface IVideoTile {
  video: VideoResponse;
}

function VideoTile({ video }: IVideoTile) {
  return (
    <div
      key={video.id}
      className="max-w-md p-1 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a>
        <img
          className="rounded-t-lg w-full h-36 object-cover"
          src={video.thumbnail}
          alt="thumbnail"
        />
      </a>
      <div className="p-5 flex justify-between items-center">
        <img
          className="h-10 w-10 rounded-full"
          src={video.coverUrl}
          alt="Channel cover"
        />
        <a>
          <h6 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {video.title}
          </h6>
        </a>
      </div>
      <div className="channel-info">
        <p className="text-gray-600 font-semibold ms-5">{video.channelName}</p>
        <p className="text-gray-600 font-semibold ms-5">
          {video.totalViews} Views.{" "}
          {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

export default VideoTile;
