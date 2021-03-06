//import { AuthActionCreators } from './action-creators';
import { AppDispatch } from "../../index";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";
import axios from 'axios';
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    SetIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    SetError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.SetIsLoading(true));
            setTimeout( async () => {
            const response = await UserService.getUsers()
            const mockUser = response.data.find(user => user.username === username && user.password === password);
            if (mockUser) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('username', mockUser.username);
                dispatch(AuthActionCreators.setUser(mockUser));
                dispatch(AuthActionCreators.setIsAuth(true));
            } else {
                dispatch(AuthActionCreators.SetError('Некорректный логин или пароль'));
            }
            dispatch(AuthActionCreators.SetIsLoading(false));
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.SetError('Произошла ошибка при логине'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));   
    }
}