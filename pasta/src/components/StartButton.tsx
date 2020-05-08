import React from "react";
import {useDispatch} from "react-redux";
import {playGame} from "../redux/actions";
import css from './StartGame.module.css';

type Props = {
    isStarted: boolean;
}
export const StartButton = () => {
    const dispatch = useDispatch();
    return <button
        className={css.startGameButton}
        onTouchStart={(event) => {
            event.stopPropagation();
            dispatch(playGame())
        }}
        onClick={() => dispatch(playGame())}
    >START
    </button>
};
