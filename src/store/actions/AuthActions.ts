import { Dispatch } from "react";
import jwtDecode from "jwt-decode";
import http from "../../http";
import { LoginSuccessAction, IUser, AuthUserActionType } from "../../components/Authentication/GoogleAuth/types";

export const LoginUserAction = (dispatch: Dispatch<LoginSuccessAction>, token: string) => {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.token = token;
    const user = jwtDecode(token) as IUser;
    console.log('user',user);
    
    dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: {
            image: user.image,
            name: user.name,
            roles: user.roles
        }
    });
}