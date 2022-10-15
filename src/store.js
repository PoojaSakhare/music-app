import { createStore } from "redux";
import { combineReducers } from "redux";
import {allNoteReducer, userClickedNoteReducer} from "./reducer";

const rootReducer = combineReducers({allNoteReducer, userClickedNoteReducer})

const store = createStore(rootReducer);

export default store;