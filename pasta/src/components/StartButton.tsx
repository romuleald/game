import React from "react";
import {useDispatch} from "react-redux";
import {playGame} from "../redux/actions";
import css from './StartGame.module.css';

// @ts-ignore
import Tone from 'tone';

type Props = {
    isStarted: boolean;
}
const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

const playStartSound = () => {
    polySynth.triggerAttackRelease(["C4", "E4", "G4", "B4"], .5);
};

export const StartButton = () => {
    const dispatch = useDispatch();
    return <button
        className={css.startGameButton}
        onTouchStart={(event) => {
            event.stopPropagation();
            dispatch(playGame())
            playStartSound();
        }}
        onClick={() => {
            playStartSound();
            dispatch(playGame())
        }}
    >START
    </button>
};
