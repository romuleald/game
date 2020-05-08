import { ADD_POINTS, GET_POINTS } from "../actionTypes";

const initialState = 0;

export const score = (state = initialState, action: { type: any; points: number }) => {
    switch (action.type) {
        case ADD_POINTS: {
            return action.points + state;
        }
        case GET_POINTS: {
            return state;
        }
        default: {
            return state;
        }
    }
};
