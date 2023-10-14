import { useGoogleLogin } from "@react-oauth/google";
import http from "../../../http";
import { useDispatch } from "react-redux"; 
import { IGoogleAuth, ITokenResponse } from "./types";
import { useNavigate } from "react-router-dom";
import { LoginUserAction } from "../../../store/actions/AuthActions";
 
const GoogleAuth = ({ text }: { text: string }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onGoogleRequest = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const { access_token } = tokenResponse;
            const googleAuth: IGoogleAuth = {
                access_token
            }; 
            try {
                const result = await http
                    .post<ITokenResponse>("/api/account/google", googleAuth);
                const { token } = result.data;
                LoginUserAction(dispatch, token);
                navigate('/');
            } catch (e) {
                console.log("Server is bad", e);
            } 
        },
    });
    return (
        <>
            <div onClick={() => onGoogleRequest()}
                className="d-flex align-items-center justify-content-center mb-3" role="button" style={{ color: "#980C33" }}>
                <p>{text}</p>
            </div>
        </>
    )
}

export default GoogleAuth;