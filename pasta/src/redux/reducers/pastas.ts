import {ADD_PASTAS, DEL_PASTAS, GET_PASTAS} from "../actionTypes";

const initialState: number[] = [];

export const pastas = (state = initialState, action: { type: string; }) => {
    switch (action.type) {
        case ADD_PASTAS: {
            const pastas = [...state]
            pastas.push(pastas.length);
            return pastas;
        }
        case DEL_PASTAS: {
            const pastas = [...state]
            pastas.shift();
            return pastas;
        }
        case GET_PASTAS: {
            return state;
        }
        default: {
            return state;
        }
    }
};
