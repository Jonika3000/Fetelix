import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux';
import { AuthUserActionType, IAuthUser } from '../Authentication/GoogleAuth/types'; 
import http from '../../http';

let Header = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
    }

    return (
        <>
            <div className="Header">
                <div className="container-sm">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            <img width={30} height={30} src={Logo} />
                        </a>
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to='/' className="nav-link px-2 link-secondary">Home</Link></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Series</a></li>
                            <li><Link to="movies/all" className="nav-link px-2 link-dark">Movies</Link></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                            <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
                            {isAuth ? (
                                <>
                                    <img src={`${user?.image}`} alt="avatar" width={50} />
                                    <li>
                                        <Link
                                            className="nav-link px-2 link-dark"
                                            aria-current="page"
                                            to="/profile"
                                        >
                                            {user?.name}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                        className="nav-link px-2 link-dark"
                                            aria-current="page"
                                            to="/logout"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                logout();
                                            }}
                                        >
                                            logout
                                        </Link>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                        <div className="col-md-3 text-end">
                            <button type="button" className="ButtonHeader"><Link to='login'>Login</Link></button>
                            <button type="button" className="ButtonHeader"><Link to='register'>Sign-up</Link></button>
                        </div>
                    </header>
                </div>
            </div>
        </>
    )
}
export default Header;