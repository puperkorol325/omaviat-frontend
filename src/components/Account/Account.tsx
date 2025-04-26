import React, { useEffect, useState } from "react";
import styles from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import arrow from "../../images/arrow-left.png";
import DATA_METHODS from "../../classes/DATA_METHODS";
import { ProfileInfo } from "../../types/ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import { AuthData } from "../../types/authData";
import { Video } from "../../types/Video";

export const Account: React.FC = () => {

    const navigate = useNavigate();
    const [profile, setProfile] = useState<ProfileInfo | null>(null);
    const [ratedVideos, setRatedVideos] = useState<Video[]>([]);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    const dispatcher = useDispatch();
    const authData: AuthData = useSelector((state: { authDataReducer: AuthData }) => state.authDataReducer);

    function pushRatedVideo(video: Video) {
        setRatedVideos(prevState => [...prevState, video]);
    }

    useEffect(() => {
        if (authData.userID) {
            DATA_METHODS.GET_USER(authData.userID as string, setProfile);
        }
    }, [authData.userID]); 

    useEffect(() => {
        if (profile?.ratedVideos) {
            for (let i of profile?.ratedVideos) {
                DATA_METHODS.GET_VIDEO(i.id, pushRatedVideo);
            }
        }
    }, [profile]);

    function isRutubeVideo(url: string): boolean {
        const rutubeRegex:RegExp = new RegExp("^(https?:\/\/)?(www\.)?(rutube\.ru)\/video\/([a-zA-Z0-9\-]+)/");
        return rutubeRegex.test(url);
    }

    async function handleUploadVideo(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        try {

            if (!isRutubeVideo(url)) throw new Error("Видео не из Rutube");

            const data = {
                APIKey: authData.APIKey,
                userID: authData.userID,
                title: title,
                description: description,
                url: url
            }

            const response = await fetch(`${DATA_METHODS.API_IP}/api/video/upload`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Видео успешно опубликовано!");
                window.location.reload();
            }else {
                throw new Error("Что-то пошло не так");
            }
        }catch (e: any) {
            alert(e.message);
        }
    }

    return (
        <div className={styles.account}>
            <div className={styles.exitButton} onClick={() => navigate('/')}>
                <img src={arrow} alt="" className={styles.arrow}/>
            </div>
            <div className={styles.infoBlock}>
                <div className={styles.data}>
                    <h1 className={styles.name}>{profile?.name}</h1>
                    <h3 className={styles.email}>{profile?.email}</h3>
                </div>
                <div className={styles.ratedVideos}>
                    <h2 className={styles.ratedVideosTitle}>Оцененные видео</h2>
                    <div className={styles.videos}>
                        {ratedVideos.map(item => (
                            <div className={styles.card} key={item.id} onClick={() => {
                                    navigate(`/video/${item.id}`);
                                    window.location.reload();
                                }}>
                                <img src={item.preview} alt="Video Thumbnail"></img>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.uploadBlock}>
                <h1 className={styles.uploadTitle}>Загрузите ваше видео</h1>
                <form className={styles.uploadForm} onSubmit={handleUploadVideo}>
                    <div className={styles.inlineBlock}>
                        <input type="text" id="title" name="title" className={styles.input} required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название видео"/>
                        <input type="text" id="url" className={styles.input} name="url" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL"/>
                        <textarea className={styles.textarea} id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание видео"></textarea>
                    </div>
                    <input type="submit" className={styles.commentButtonSubmit} value="Загрузить видео"/>
                </form>
            </div>
        </div>
    )
}