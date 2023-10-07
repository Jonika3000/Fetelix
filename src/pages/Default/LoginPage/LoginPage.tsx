import { Link } from 'react-router-dom';
import './LoginPage.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleAuth from '../../../components/Authentication/GoogleAuth';

const LoginPage = () => { 
    return (
        <div className="page-container">
            <div className="card">
                <div className="container">
                    <div className="body d-md-flex align-items-center justify-content-between">
                        <div className="box-1 mt-md-0 mt-5">
                            <img src="https://i.pinimg.com/564x/65/86/95/6586952ded9a215c3d4ce954cb399d97.jpg"
                                className="imageLogin" alt="" />
                        </div>
                        <div className=" box-2 d-flex flex-column h-100">
                            <div className="mt-5">
                                <p className="mb-1 h-1">Login</p>
                                <p className="mb-2">Share your thouhts with the world form today.</p>
                                <div className="d-flex flex-column ">
                                    <p className="mb-2">Continue with...</p>
                                    <div className="d-flex align-items-center justify-content-center mt-5">
                                        <GoogleOAuthProvider clientId="905477583489-i2d7fktrqsr8jis0hggtsa9ecsf2i9j1.apps.googleusercontent.com">
                                          <GoogleAuth text="Login in with Google 🚀"></GoogleAuth>
                                        </GoogleOAuthProvider>
                                    </div>

                                    <div className="mt-3">
                                        <p className="mb-0">Dont have an account?</p>
                                        <Link to='/register' className="fas fa-chevron-right ms-1">Register</Link><span className="fas fa-chevron-right ms-1"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;