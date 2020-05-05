import {GET_POINTS, ADD_POINTS, GET_PASTAS, ADD_PASTAS, GAME_RUNNING, GAME_STOPPING} from "./actionTypes";

export const addPoints = (content: number) => ({
    type: ADD_POINTS,
    points: content
});

export const getPoints = () => ({
    type: GET_POINTS
});

export const addPastas = () => ({
    type: ADD_PASTAS
});

export const getPastas = () => ({
    type: GET_PASTAS
});

export const playGame = () => ({
    type: GAME_RUNNING
});
export const stopGame = () => ({
    type: GAME_STOPPING
});
