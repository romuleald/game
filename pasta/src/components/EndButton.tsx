import React from "react";
import css from './StartGame.module.css';
import {useSelector} from "react-redux";
import {getGameScore} from "../redux/actions";

export const EndButton = () => {
    const gameScore = useSelector(getGameScore);

    let uri = `Je viens de faire un score de ${gameScore} au jeu de pâtes http://pasta.asanchez.fr/`;
    return <div className={css.startGameWrapper}>
            <a
                target="_blank"
                href={`https://twitter.com/intent/tweet?status=${encodeURI(uri)}`}
                rel="noopener noreferrer"
                className={css.startGameButton}
            >
                Share on twitter!
            </a>
        </div>
};
