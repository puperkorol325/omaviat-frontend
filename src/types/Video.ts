import { Comment } from "./Comment";

export type Video = {
    id: string,
    uploaderId: string,
    url: string,
    title: string,
    description: string,
    likes: number,
    dislikes: number,
    comments: Comment[],
    preview?: string,
    uploader?: string
};