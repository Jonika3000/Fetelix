import { Link } from 'react-router-dom'; 

const RegisterPage = () => {
    return (
        <div className="page-container">
        <div className="card">
            <div className="container">
                <div className="body d-md-flex align-items-center justify-content-between">
                    <div className="box-1 mt-md-0 mt-5">
                        <img src="https://i.pinimg.com/736x/f9/56/c1/f956c16f4fae505ecb36118946ec2a45.jpg"
                            className="imageLogin" alt="" />
                    </div>
                    <div className=" box-2 d-flex flex-column h-100">
                        <div className="mt-5">
                            <p className="mb-1 h-1">Create Account.</p>
                            <p className="mb-2">Share your thouhts with the world form today.</p>
                            <div className="d-flex flex-column ">
                                <p className="mb-2">Continue with...</p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <a href="#" className="box me-2">
                                        <span className="fab fa-google mb-2"></span>
                                        <p className="mb-0">Google</p>
                                        <i className="bi bi-google fa-xs" style={{fontSize:"20px"}}></i>
                                    </a>
                                </div> 
                                <div className="mt-3">
                                    <p className="mb-0">Already have an account?</p>
                                   <Link to='/login' className="fas fa-chevron-right ms-1">Login</Link><span className="fas fa-chevron-right ms-1"></span> 
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <p className="footer mb-0 mt-md-0 mt-4">By register you agree with our
                                <span className="p-color me-1"> terms and conditions</span>and
                                <span className="p-color ms-1">privacy policy</span>
                            </p>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </div>
    );
};

export default RegisterPage;