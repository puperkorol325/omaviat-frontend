import React, { SetStateAction, useState, Dispatch as ReactDispatch, useEffect, useCallback } from 'react';
import styles from './Content.module.css';
import { Video } from '../../types/Video';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthData } from '../../types/authData';
import DATA_METHODS from '../../classes/DATA_METHODS';

export const Content: React.FC = () => {

    const [videos, setVideos]: [Video[] | undefined, ReactDispatch<SetStateAction<Video[] | undefined>>] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchVideos() {
            const result: Video[] = await (await fetch(`${DATA_METHODS.API_IP}/api/video/getPile/20`)).json();

            result.map((item: Video) => item.preview = DATA_METHODS.GET_THUMBNAIL(item.url));

            console.log(result);

            setVideos(result);
        };

        fetchVideos();

    }, []);

    return (
        <div className={styles.container}>
            {videos?.map((item: Video) => (
                <div key={item.id} className={styles.card} onClick={() => { navigate(`/video/${item.id}`); dispatch({ type: 'SET_SELECTED_VIDEO', payload: item }); }}>
                    <div className={styles.cardThumbnail} style={{ backgroundImage: `url(${item.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
            ))}
        </div>
    )
}