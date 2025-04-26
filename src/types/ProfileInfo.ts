export type ProfileInfo = {
    id?: string;
    name: string;
    email?: string;
    ratedVideos?: {id: string, rating: 'like' | 'dislike'}[];
};