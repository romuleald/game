import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import css from "./GameBoard.module.css";
import {Pasta} from "./Pasta";
import {StartButton} from "./StartButton";
import {
    getGameFinished, getGamePlayingState, getPastas, showPastas
} from "../redux/actions";
import {EndButton} from "./EndButton";
import {PastaState} from "../type";
import {INITIAL_PASTA_STATE, VISIBLE_PASTA_STATE} from "../redux/constants";

const getRefreshRandom = () => Math.random() * 2000 + 200;

let timer: any;

const getFirstInitialPasta = (pastaLists: PastaState) => pastaLists
    .find(([pastaId, pastaState]) =>
        pastaState === INITIAL_PASTA_STATE);

export const GameBoard = () => {
    const isGameFinish = useSelector(getGameFinished)
    const isGamePlaying = useSelector(getGamePlayingState)
    const pastaList = useSelector(getPastas);
    const pastaLists: PastaState = Object.entries(pastaList);

    const dispatch = useDispatch();

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const pastaToShow = getFirstInitialPasta(pastaLists);
            isGamePlaying && pastaToShow && dispatch(showPastas(pastaToShow[0]))
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
