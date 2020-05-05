import {combineReducers} from "redux";
import {score} from "./score";
import {pastas} from "./pastas";
import {game} from "./game";

export default combineReducers({score, pastas, game});
