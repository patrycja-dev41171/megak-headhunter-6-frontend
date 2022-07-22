import { userAction } from "../action-types/user";

interface User {
    id: string;
    accessToken: string;
    expirationTime: "";
    role: string
}

const initialState: User = {
    id: "",
    accessToken: "",
    expirationTime: "",
    role: "",
};

interface SetId {
    type: userAction.SET_ID;
    payload: string;
}

interface SetAccessToken {
    type: userAction.SET_ACCESS_TOKEN;
    payload: string;
}

interface SetExpirationTime {
    type: userAction.SET_EXPIRATION_TIME;
    payload: Date;
}

interface SetRole {
    type: userAction.SET_ROLE;
    payload: string;
}



type Action =
    | SetId
    | SetAccessToken
    | SetExpirationTime | SetRole;

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case userAction.SET_ID: {
            return {
                ...state,
                id: action.payload,
            };
        }
        case userAction.SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.payload,
            };
        }
        case userAction.SET_EXPIRATION_TIME: {
            return {
                ...state,
                expirationTime: action.payload,
            };
        }

        case userAction.SET_ROLE: {
            return {
                ...state,
                role: action.payload,
            };
        }
        default:
            return state;
    }
};