import { apiUrl } from '../config/api';
import jwtDecode from 'jwt-decode';
import { setAccessToken, setExpirationTime, setId, setIsLoggedIn, setRole } from '../redux-toolkit/features/user/user-slice';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from "../redux-toolkit/store";
import {useEffect} from "react";

export const useRefreshToken = async () => {
  const dispatch = useDispatch();
    const { accessToken, expirationTime } = useSelector((store: StoreState) => store.user);
    const currentDate = new Date();

    const refresh = async () => {
        if(accessToken === '' || expirationTime * 1000 < currentDate.getTime()){
            try {
                const res = await fetch(`${apiUrl}/refresh-token`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                const decoded: any = jwtDecode(data.accessToken);
                dispatch(setId(data.id));
                dispatch(setAccessToken(data.accessToken));
                dispatch(setExpirationTime(decoded.exp));
                dispatch(setRole(data.role));
                if (data) {
                    dispatch(setIsLoggedIn(true));
                }
            } catch (error) {
                console.log(error);
            }
        } else return;
    }


    useEffect(() => {
        refresh()
    }, [])

};
