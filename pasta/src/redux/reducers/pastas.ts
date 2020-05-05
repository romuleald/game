import { ADD_PASTAS, GET_PASTAS } from "../actionTypes";
import { PASTAS } from "../constants";

const initialState: number[] = [];

export const pastas = (state = initialState, action: { type: string; }) => {
    switch (action.type) {
        case ADD_PASTAS: {
            return state.push(state.length);
        }
        case GET_PASTAS: {
            return state;
        }
        default: {
            return state;
        }
    }
};
