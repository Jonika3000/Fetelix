export interface ILogin {
    email: string;
    password: string;
}

export interface ITokenResponse {
    token: string;
}

export interface IGoogleAuth {
    access_token: string
}
export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}

export interface  IUser {
    image: string;
    name: string;
    roles: string[];
}

export interface IAuthUser {
    isAuth: boolean;
    user?: IUser;
} 

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResult {
    token: string;
}

export interface LoginSuccessAction {
    type: AuthUserActionType.LOGIN_USER,
    payload: IUser
}

export interface LogoutSuccessUser {
    type: AuthUserActionType.LOGOUT_USER
}

export type AuthUserActions = LoginSuccessAction | LogoutSuccessUser;