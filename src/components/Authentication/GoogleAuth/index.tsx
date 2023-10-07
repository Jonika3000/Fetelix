import { useGoogleLogin } from "@react-oauth/google";
import http from "../../../http";

const GoogleAuth = ({ text }: { text: string }) => {
    const onGoogleRequest = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("Auth token info", tokenResponse);
            http
                .post(
                    `api/account/google`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log("Google user info", res);
                });
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