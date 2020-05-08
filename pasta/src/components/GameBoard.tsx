import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import css from "./GameBoard.module.css";
import {Pasta} from "./Pasta";
import {StartButton} from "./StartButton";
import {addPastas, getGameFinished, getGamePlayingState} from "../redux/actions";
import store from '../redux/store';
import {EndButton} from "./EndButton";

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

    for (let i = 0; i < maxPasta; i++) {
        store.dispatch(addPastas())
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
    const isGameFinish = useSelector(getGameFinished)
    const isGamePlaying = useSelector(getGamePlayingState)

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => setReRender(Date.now()), getRefreshRandom());
    });

    return <section className={css.game}>
        <div className={css.startGameWrapper}>
            {!isGamePlaying && <StartButton />}
            {isGameFinish && <EndButton />}
        </div>
        {list.map((item) => <Pasta key={item} pastaId={item}/>)}
    </section>
};

// very dirty 👇
const mapStateToProps = (state: { game: boolean; }) => {
    const {game} = state;
    game ? gameInstance.start() : gameInstance.pause();
    return {};
};

export const GameBoard = connect(mapStateToProps)(_GameBoard);
