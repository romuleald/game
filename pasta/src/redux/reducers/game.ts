import {GAME_RUNNING, GAME_STOPPING} from "../actionTypes";

const initialState: boolean = false;

export const game = (state = initialState, action: { type: string; }) => {
    switch (action.type) {
        case GAME_RUNNING: {
            return true;
        }
        case GAME_STOPPING: {
            return false;
        }
        default: {
            return state;
        }
    }
};

export const getGamePlayingState = (store: { game: true }) => {
    return store.game;
};
