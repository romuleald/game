import React from "react";
import {connect, useDispatch} from "react-redux";
import {playGame} from "../redux/actions";
import css from './StartGame.module.css';

type Props = {
    isStarted: boolean;
}
const _StartButton = ({isStarted}: Props): JSX.Element | null => {
    const dispatch = useDispatch();
    return !isStarted ?
        <div className={css.startGameWrapper}>
            <button
                className={css.startGameButton}
                onTouchStart={() => dispatch(playGame())}>START
            </button>
        </div> : null
};

const mapStateToProps = (state: { game: boolean; }) => {
    const {game} = state;
    return {isStarted: game};
};

export const StartButton = connect(mapStateToProps)(_StartButton);
