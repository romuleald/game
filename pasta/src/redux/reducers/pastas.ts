import {SHOW_PASTAS, HIDE_PASTAS} from "../actionTypes";
import {PastaId} from "../../type";
import {INITIAL_PASTA_STATE, MAX_PASTA, REMOVED_PASTA_STATE, VISIBLE_PASTA_STATE} from "../constants";

const END = MAX_PASTA;
const START = 0;
const fakeFilledArray = Array.from({length: END - START}, (x, i) => i + START)

const initialState: any = fakeFilledArray.reduce((prev, curr) => {
    // @ts-ignore
    prev['pasta' + curr] = INITIAL_PASTA_STATE;
    return prev;
}, {});

export const pastas = (state = initialState, action: { type: string; id: PastaId }) => {
    switch (action.type) {
        case SHOW_PASTAS: {
            console.info(action.id);
            const pastas = {...state};
            pastas[action.id] = VISIBLE_PASTA_STATE;
            return pastas;
        }
        case HIDE_PASTAS: {
            const pastas = {...state};
            pastas[action.id] = REMOVED_PASTA_STATE;
            return pastas;
        }
        default: {
            return state;
        }
    }
};
