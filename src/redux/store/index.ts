import { combineReducers, createStore } from "redux";
import userReducer from "../reducer/user-reducer";

const rootReducer = combineReducers({
    user: userReducer,
});

export const store = createStore(rootReducer);

export type StoreState = ReturnType<typeof store.getState>;