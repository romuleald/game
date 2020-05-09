import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import css from "./GameBoard.module.css";
import {Pasta} from "./Pasta";
import {StartButton} from "./StartButton";
import {
    getGameFinished, getGamePlayingState, getPastas, showPastas
} from "../redux/actions";
import {EndButton} from "./EndButton";
import {PastaState} from "../type";
import {VISIBLE_PASTA_STATE} from "../redux/constants";

const getRefreshRandom = () => Math.random() * 2000 + 200;

let timer: any;

export const GameBoard = () => {
    const isGameFinish = useSelector(getGameFinished)
    const isGamePlaying = useSelector(getGamePlayingState)
    const pastaList = useSelector(getPastas);
    const pastaLists: PastaState = Object.entries(pastaList);
    const dispatch = useDispatch();
    // todo need to find the last pasta initial
    const [lastPastaId, setLastPastaId] = useState(0);

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setLastPastaId(lastPastaId + 1);
            console.info({pastaLists, lastPastaId});
            isGamePlaying && dispatch(showPastas(pastaLists[lastPastaId][0]))
        }, getRefreshRandom());
    });


    return <section className={css.game}>
        <div className={css.startGameWrapper}>
            {!isGamePlaying && <StartButton/>}
            {isGameFinish && <EndButton/>}
        </div>
        {pastaLists.map(([key, pastaState]) => {
            return pastaState === VISIBLE_PASTA_STATE && <Pasta key={key} pastaId={key}/>
        })}
    </section>
};
