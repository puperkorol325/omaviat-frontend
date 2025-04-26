import { AuthData } from "../types/authData";
import { ProfileInfo } from "../types/ProfileInfo";
import { Video } from "../types/Video";

export default class DATA_METHODS {

    static API_IP: string = "http://localhost:5001";

    static GET_THUMBNAIL(url: string): string {
        
        const splittedUrl: string[] = url.split('/');

        return splittedUrl[splittedUrl.length-1].length > 0 ? `https://rutube.ru/api/video/${splittedUrl[splittedUrl.length-1]}/thumbnail/?redirect=1` : `https://rutube.ru/api/video/${splittedUrl[splittedUrl.length-2]}/thumbnail/?redirect=1`;
    }

    static CHECK_IF_USER_LOGGED_IN(authData: AuthData): boolean {
    
        if (authData.userID && authData.APIKey) { 
            return true;
        }else {
            return false;
        }

    }

    static TRANSFORM_RUTUBE_URL(url: string): string {
        
        return url.replace('https://rutube.ru/video/', 'https://rutube.ru/play/embed/');
    }

    static async FETCH_VIDEOS(amount: number): Promise<Video[] | null> {
        try {
            const result: Video[] = await (await fetch(`${this.API_IP}/api/video/getPile/${amount}`)).json();

            result.map((item: Video) => item.preview = this.GET_THUMBNAIL(item.url));
        
            return result;
        }catch (e) {
            return null;
        }
    };

    static async GET_USER(userID: string, func?: ((profile: ProfileInfo) => void)): Promise<ProfileInfo | null> {
        try {    
            const result: ProfileInfo = await (await fetch(`${this.API_IP}/api/profile/info/${userID}`)).json();
    
            if (result) {
                if (func) func(result);
                return result;
            }else {
                throw new Error("User hasn't been found");
            }
        }catch (e) {
            return null;
        }
    }

    static async GET_VIDEO(videoID: string, func: (video: Video) => void): Promise<Video | undefined | null> {
        try {
            const result: Video | null = await (await fetch(`${DATA_METHODS.API_IP}/api/video/${videoID}`)).json();
    
            if (result) func({...result, preview: this.GET_THUMBNAIL(result.url)});

            return result;
        }catch (e) {

        }
    }

    static async RATE_VIDEO(APIKey:string, videoID: string, userID: string, rating: string) {
        try {

            const data = {
                APIKey: APIKey,
                videoID: videoID,
                userID: userID,
                rating: rating
            };

            const response = await fetch(`${DATA_METHODS.API_IP}/api/video/${videoID}/${rating}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }catch (e) {
        }
    }

}