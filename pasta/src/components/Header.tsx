import css from "./Header.module.css";
import logo from "../logo.svg";
import React from "react";
import {connect, useDispatch} from "react-redux";
import {stopGame} from "../redux/actions";

let domRoot = document.getElementById('root');

const goFullScreen = () => {
    domRoot && domRoot.requestFullscreen();
};

const _Header = ({currentScore, isPlaying}: { currentScore: number, isPlaying: boolean, pauseGame: any }) => {
    const dispatch = useDispatch();
    return <header className={css.header}>
        <span className={css.logoWrapper}><img src={logo} className={css.headerLogo} alt="logo"/></span>
        <div className={css.counter}>counter {currentScore}</div>

        <button className={css.button}>test</button>
        {domRoot && domRoot.requestFullscreen && <button onClick={goFullScreen}>🖥</button>}
        {isPlaying && <button onClick={() => dispatch(stopGame())}>pause</button>}
    </header>
};

const mapStateToProps = (state: { score: number; game: boolean }) => {
    const {score, game} = state;
    return {currentScore: score, isPlaying: game};
};

export const Header = connect(mapStateToProps)(_Header);
