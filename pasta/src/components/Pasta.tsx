import React, {SyntheticEvent, useState} from 'react';
import css from './Pasta.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addPoints, getGamePlayingState, hidePastas} from "../redux/actions";
import {PastaId} from "../type";
import {LOSE_POINT, WIN_POINT} from "../redux/constants";

// @ts-ignore
import Tone from 'tone';
const winTone = new Tone.Synth().toMaster();
const lostTone = new Tone.Synth({
    "oscillator": {
        "type": "pwm",
        "modulationFrequency": 100
    },
    "envelope": {
        "attack": 0.01,
        "decay": 10.1,
        "sustain": 0.2,
        "release": 2.2,
    }
}).toMaster();

//play a middle 'C' for the duration of an 8th note
const notes = ['A', 'B', 'C', 'D', 'E', 'F']

const playWin = () => {
    let number = Math.round(Math.random() * 5);
    let note = notes[number] || 'A';
    winTone.triggerAttackRelease(note + "4", "8n");
};

const playLost = () => {
    lostTone.triggerAttackRelease("F2", ".2");
};

type AnimationPositions = {
    hStart: number;
    hEnd: number;
    vStart: number;
    vEnd: number;
};

const getRandomPos = () => {
    return (Math.random() * 105) - 5;
};

const getStartPosition = () => getRandomPos();

const getEndPosition = () => getRandomPos();

const injectAnimation = (pos: AnimationPositions, pastaId: PastaId) => {
    document.head.insertAdjacentHTML('beforeend', `
        <style id="style_pasta_${pastaId}">
            @keyframes pasta${pastaId} { 
                from { transform: translate3d(${pos.hStart}vw,   ${pos.vStart}vh,   1px); }
                to { transform:   translate3d(${pos.hEnd}vw, ${pos.vEnd}vh, 1px); }
            }
        </style>`
    );
};

const pastaImg = 'http://2.bp.blogspot.com/-KdqQ59OZ6b4/U7DdEh5iiHI/AAAAAAAAKSM/fl3U7pxNAdo/s1600/classici-farfalle-formato.png';
const pastaCrushedImg = 'http://4.bp.blogspot.com/-4Y-0SxTBlrI/T2KZrQwyleI/AAAAAAAAG1c/RTChXtRDXJE/s1600/IMG_2885.JPG';

type Props = {
    pastaId: PastaId;
}

export const Pasta = ({pastaId}: Props) => {
    const [pastaSrc, setPasta] = useState(pastaImg);
    const [isRemoving, setIsRemoving] = useState(false);
    const dispatch = useDispatch();
    const isGamePlaying = useSelector(getGamePlayingState);

    const onUserAction = (event: SyntheticEvent) => {
        playWin();
        event.stopPropagation();
        setPasta(pastaCrushedImg);
        setIsRemoving(true);
        setTimeout(() => dispatch(hidePastas(pastaId)), 1000);
        dispatch(addPoints(WIN_POINT));
    };

    if (!document.getElementById(`style_pasta_${pastaId}`)) {
        injectAnimation({
            hStart: getStartPosition(),
            hEnd: getEndPosition(),
            vStart: getStartPosition(),
            vEnd: getEndPosition()
        }, pastaId);
    }
    return (
        <div
            onClick={onUserAction}
            onTouchStart={onUserAction}
            id={`pasta-${pastaId}`}
            onAnimationEnd={() => {
                setTimeout(() => dispatch(hidePastas(pastaId)), 1000);
                dispatch(addPoints(LOSE_POINT));
                playLost();
            }}
            className={`${css.pasta} ${isRemoving ? css.pastaRemoving : ''} ${!isGamePlaying ? css.pastaPaused : ''}`}
            style={{animationName: `pasta${pastaId}`, animationPlayState: isGamePlaying ? 'running' : 'paused'}}>
            <img
                src={pastaSrc}
                alt="pate à cliquer"/>
        </div>
    );
};
