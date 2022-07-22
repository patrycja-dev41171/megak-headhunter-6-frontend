import { userAction } from "../action-types/user";

export const setId = (id: string) => ({
    type: userAction.SET_ID,
    payload: id,
});


export const setAccessToken = (accessToken: string) => ({
    type: userAction.SET_ACCESS_TOKEN,
    payload: accessToken,
});

export const setExpirationTime = (expirationTime: Date) => ({
    type: userAction.SET_EXPIRATION_TIME,
    payload: expirationTime,
});

export const setRole = (role: string) => ({
    type: userAction.SET_ROLE,
    payload: role,
});

