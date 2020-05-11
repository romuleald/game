import css from "./Header.module.css";
import logo from "../logo.svg";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGamePlayingState, getGameScore, getPastasCount, stopGame} from "../redux/actions";
import {MAX_PASTA} from "../redux/constants";
import screenfull from "screenfull";

// @ts-ignore
import Tone from 'tone';

const setToneMute = (isMute: Boolean) => {
    Tone.Master.mute = isMute;
};

let domRoot = document.getElementById('root');

const goFullScreen = () => {
    if (domRoot && screenfull.isEnabled) {
        screenfull.toggle(domRoot);
    }
};

export const Header = () => {
    const dispatch = useDispatch();
    const pastasCount = useSelector(getPastasCount);
    const currentScore = useSelector(getGameScore);
    const isPlaying = useSelector(getGamePlayingState);
    const [mute, setMute] = useState(true);

    useEffect(() => {
        setToneMute(mute);
    }, [mute])

    return <header className={css.header}>
        <span className={css.logoWrapper}><img src={logo} className={css.headerLogo} alt="logo"/></span>
        <div className={css.counter}>counter {currentScore}</div>
        <div className={css.counter}>pastas: {MAX_PASTA - pastasCount}</div>

        {<button onClick={() => setMute(!mute)}>{mute ? '🔈' : '🔇'}</button>}
        {domRoot && screenfull.isEnabled && <button onClick={goFullScreen}>🖥</button>}
        {isPlaying && <button onClick={() => dispatch(stopGame())}>pause</button>}
    </header>
};
