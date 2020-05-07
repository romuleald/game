import React, {SyntheticEvent, useState} from 'react';
import css from './Pasta.module.css';
import {useDispatch} from "react-redux";
import {addPoints} from "../redux/actions";

type AnimationPositions = {
    hStart: number;
    hEnd: number;
    vStart: number;
    vEnd: number;
};

const getRandomPos = () => {
    return (Math.random() * 110) - 10;
};

const getStartPosition = () => getRandomPos();

const getEndPosition = () => getRandomPos();

const injectAnimation = (pos: AnimationPositions, pastaId: number) => {
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
    pastaId: number;
}


export const Pasta = ({pastaId}: Props) => {
    const [pastaSrc, setPasta] = useState(pastaImg);
    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();

    const onUserAction = (event: SyntheticEvent) => {
        event.stopPropagation();
        setPasta(pastaCrushedImg)
        setTimeout(() => setIsVisible(false), 1000);
        dispatch(addPoints(100));
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
        isVisible ? <div
            onClick={onUserAction}
            onTouchStart={onUserAction}
            id={`pasta-${pastaId}`}
            onAnimationEnd={() => {
                setTimeout(() => setIsVisible(false), 1000);
                dispatch(addPoints(-50));
            }}
            className={css.pasta}
            style={{animationName: `pasta${pastaId}`}}>
            <img
                src={pastaSrc}
                alt="pate"/>
        </div> : null
    );
};
