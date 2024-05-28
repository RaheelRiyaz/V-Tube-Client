export interface VideoResponse {
  thumbnail: string;
  hasUserLiked: boolean;
  isOwner: boolean;
  commentsTurnedOff: boolean;
  url: string;
  createdAt: string;
  channelName: string;
  coverUrl: string;
  title: string;
  description: string;
  duration: string;
  totalLikes: number;
  totalDislikes: number;
  totalViews: number;
  durationInHistory: string;
  totalComments: number;
  totalReplies: number;
  totalCommentsAndReplies: number;
  id: string;
  channelId: string;
  playListId: string;
}

export interface VideoFilter {
    channelId?: string;
    term?: string;
    playListId?: string;
    pageNumber: number;
    pageSize: number;
    sortOrder?: number;
  }
  