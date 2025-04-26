import React, { useEffect, useState } from "react";
import { Params, Route, useNavigate, useParams } from "react-router-dom";
import { Video } from "../../types/Video";
import { useDispatch, useSelector } from "react-redux";
import styles from './Player.module.css';
import { AuthData } from "../../types/authData";
import { Comment } from "../../types/Comment";
import { ProfileInfo } from "../../types/ProfileInfo";
import DATA_METHODS from "../../classes/DATA_METHODS";

export const Player: React.FC<{ params: Readonly<Params<string>> }> = ({ params }) => {

    const [video, setVideo]: [Video, (video: Video) => void] = useState({} as Video);
    const [commentText, setCommentText]: [string, (text: string) => void] = useState("");

    const dispatcher = useDispatch();
    const authData: AuthData = useSelector((state: {authDataReducer: AuthData}) => state.authDataReducer);
    const selectedVideo: Video | null = useSelector((state: {selectedVideoReducer: Video | null}) => state.selectedVideoReducer);

    const navigate = useNavigate();

    async function getVideo() {
        const result: Video | null = await (await fetch(`${DATA_METHODS.API_IP}/api/video/${params.videoID}`)).json();


        if (result) setVideo({ ...result, url: DATA_METHODS.TRANSFORM_RUTUBE_URL(result.url) });
    }

    async function sendComment(text: string) {
        try {

            if (!authData.userID && !authData.APIKey) {
                throw new Error("Not authorized");
            }else {

                if (text.length == 0) {
                    throw new Error("Empty comment");
                }

                const uploader: ProfileInfo | null = await DATA_METHODS.GET_USER(authData.userID as string);

                if (uploader) {
                    const data = {
                        uploaderId: authData.userID,
                        uploaderName: uploader.name,
                        videoId: video.id,
                        text: text,
                        APIKey: authData.APIKey
                    };

                    const result = await fetch(`${DATA_METHODS.API_IP}/api/video/${video.id}/comment`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
                }else {
                    throw new Error("Something went wrong");
                }
            }
        }catch (e: any) {
            
            switch (e.message) {
                case "Not authorized":
                    navigate("/login");
                    break;
                case "Empty comment":
                    alert("Комментарий не может быть пустым");
                    break;
                default:
                    alert("Что-то пошло не так");
                    break;
            }
        }
    }

    async function rateVideo(rating: string) {

        try {
            if (authData.userID && authData.APIKey) {
                if ((await DATA_METHODS.GET_USER(authData.userID as string))?.ratedVideos?.filter(item => item.id === video.id).length === 0) { 
                    await DATA_METHODS.RATE_VIDEO(authData.APIKey, video.id, authData.userID, rating);
                }else {
                    throw new Error("Already liked");
                }
            }else {
                throw new Error("Not authorized");
            }
        }catch (e: any) {
            
            switch (e.message) {
                case "Not authorized":
                    navigate("/login");
                    break;
                case "Already liked":
                    alert("Вы уже оценили видео");
                    break;
                default:
                    alert("Что-то пошло не так");
                    break;
            }
        }
    }

    useEffect(() => {

        if (selectedVideo) {
            setVideo({...selectedVideo, url: DATA_METHODS.TRANSFORM_RUTUBE_URL(selectedVideo?.url)});
        }else {
            getVideo();
        }

    }, []);

    return (
        <div className={styles.player}>
            <div className={styles.videoContainer}>
                    <iframe src={video.url} className={styles.video} frameBorder={0} allow="clipboard-write; autoplay"></iframe>
            </div>
                <div className={styles.controlsContainer}>
                    <div className={styles.videoTitle}>{video.title}</div>
                        <div className={styles.ratingBtns}>
                            <button className={[styles.blobBtn, styles.emotionLike].join(' ')} onClick={async () => await rateVideo("like")}>
                                Нравится
                                <span className={styles.blobBtnInner}>
                                    <span className={styles.blobBtnBlobs}>
                                        <span className={styles.blobBtnBlob}></span>
                                        <span className={styles.blobBtnBlob}></span>
                                        <span className={styles.blobBtnBlob}></span>
                                        <span className={styles.blobBtnBlob}></span>
                                    </span>
                                </span>
                            </button>

                            <button className={[styles.blobBtn, styles.emotionDislike].join(' ')} onClick={async () => await rateVideo("dislike")}>
                                Не нравится
                                <span className={styles.blobBtnInner}>
                                    <span className={styles.blobBtnBlobs}>
                                        <span className={styles.blobBtnBlob}></span>
                                        <span className={styles.blobBtnBlob}></span>
                                        <span className={styles.blobBtnBlob}></span>
                                        <span className={styles.blobBtnBlob}></span>
                                    </span>
                                </span>
                            </button>
                        </div>
                </div>
                <div className={styles.videoDescription}>
                    {video.description}
                </div>
                <div className={styles.comments}>
                    <h3 className={styles.commentsBlockTitle}>Комментарии</h3>
                    <input className={styles.commentTextarea} placeholder="Добавьте комментарий..." onChange={(e) => setCommentText(e.target.value)} value={commentText}></input>
                    <button className={styles.commentButtonSubmit} onClick={() => sendComment(commentText)}>Отправить</button>
                    <div className={styles.usersComments}>
                        {video.comments ? video.comments.map((item: Comment) => (
                            <div key={item.id} className={styles.comment}>
                                <h2 className={styles.commentUploaderName}>{item.uploaderName}</h2>
                                <p className={styles.textComment}>{item.text}</p>
                            </div>
                        )) : ""}
                    </div>
                </div>
        </div>
    );
}