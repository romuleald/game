import {
    ADD_POINTS, ADD_PASTAS, GAME_RUNNING, GAME_STOPPING, DEL_PASTAS
} from "./actionTypes";

export const addPoints = (content: number) => ({
    type: ADD_POINTS,
    points: content
});

export const getGamePlayingState = (store: { game: true }) => {
    return store.game;
};

export const addPastas = () => ({
    type: ADD_PASTAS
});

export const delPastas = () => ({
    type: DEL_PASTAS
});

export const getPastasCount = (state: { pastas: number[]; }) => {
    return state.pastas.length
};

export const getGameScore = (state: { score: number; }) => {
    return state.score
};

export const getGameFinished = (state: { pastas: number[]; }) => {
    return state.pastas.length === 0;
};

export const playGame = () => ({
    type: GAME_RUNNING
});
export const stopGame = () => ({
    type: GAME_STOPPING
});
