import React from "react";
import { Player } from "../components/Player/Player";
import '../App.css';
import { useParams } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { VideosCompilation } from "../components/VideosCompilation/VideosCompilation";


function PlayerPage() {

    const params = useParams();

    return (
        <div className="player-page">
            <Header />
            <div className="player-page-main">
                <Player params={params}/>
                <VideosCompilation />
            </div>
        </div>
    )
};

export default PlayerPage;