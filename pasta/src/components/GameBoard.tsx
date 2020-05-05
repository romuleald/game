import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import css from "./GameBoard.module.css";
import {Pasta} from "./Pasta";
import {StartButton} from "./StartButton";

const list: number[] = [];

const getRefreshRandom = () => Math.random() * 3000 + 500;

const startGame = (maxPasta = 100) => {
    let isPlaying = false;
    const play = () => {
        isPlaying = true;
    }
    const pause = () => {
        isPlaying = false;
    }

    const loop = () => {
        if (maxPasta > list.length) {
            isPlaying && list.push(list.length);
            setTimeout(loop, 1000);
        }
    };
    loop();
    return {
        start: play,
        pause: pause
    }
};

let timer: any;

const gameInstance = startGame(100);

const _GameBoard = () => {
    const [, setReRender] = useState(0);
    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => setReRender(Date.now()), getRefreshRandom());
    });
    return <section className={css.game}>
        <StartButton/>
        {list.map((item) => <Pasta key={item} pastaId={item}/>)}
    </section>
};

const mapStateToProps = (state: { game: boolean; }) => {
    const {game} = state;
    game ? gameInstance.start() : gameInstance.pause();
    return {isStarted: game};
};

export const GameBoard = connect(mapStateToProps)(_GameBoard);
