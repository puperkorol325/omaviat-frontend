import React, { SetStateAction, useEffect, useState, Dispatch as ReactDispatch } from "react";
import styles from './VideosCompilation.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DATA_METHODS from "../../classes/DATA_METHODS";
import { Video } from "../../types/Video";

export const VideosCompilation: React.FC = () => {

    const [videos, setVideos]: [Video[] | undefined, ReactDispatch<SetStateAction<Video[] | undefined>>] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchVideos() {
            const result: Video[] = await (await fetch(`${DATA_METHODS.API_IP}/api/video/getPile/20`)).json();

            result.map((item: Video) => item.preview = DATA_METHODS.GET_THUMBNAIL(item.url));

            setVideos(result);
        };

        fetchVideos();

    }, []);
    
    return (
        <div className={styles.container}>
            {videos?.map((item: Video) => (
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
    )
}