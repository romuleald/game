import {
    ADD_POINTS, GAME_RUNNING, GAME_STOPPING, HIDE_PASTAS, SHOW_PASTAS
} from "./actionTypes";
import {PastaId, PastaState} from "../type";
import {MAX_PASTA, REMOVED_PASTA_STATE} from "./constants";

export const addPoints = (content: number) => ({
    type: ADD_POINTS,
    points: content
});

export const getGamePlayingState = (store: { game: true }) => {
    return store.game;
};

export const showPastas = (id: PastaId) => ({
    type: SHOW_PASTAS,
    id
});

export const hidePastas = (id: PastaId) => ({
    type: HIDE_PASTAS,
    id
});

export const getPastas = (state: any) => {
    return state.pastas
};

export const getPastasCount = (state: { pastas: PastaState; }) => {
    return Object.values(state.pastas)
        // @ts-ignore
        .filter(item => item === REMOVED_PASTA_STATE)
        .length;
};

export const getGameScore = (state: { score: number; }) => {
    return state.score
};

export const getGameFinished = (state: { pastas: number[]; }) => {
    return Object.values(state.pastas)
        // @ts-ignore
        .filter(item => item === REMOVED_PASTA_STATE)
        .length === MAX_PASTA;
};

export const playGame = () => ({
    type: GAME_RUNNING
});
export const stopGame = () => ({
    type: GAME_STOPPING
});
