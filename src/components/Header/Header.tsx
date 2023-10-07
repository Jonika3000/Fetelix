import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import "./Header.css"
let Header = () => {
    return (
        <>
            <div className="Header">
                <div className="container-sm">
                    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            <img width={30} height={30} src={Logo} />
                        </a>
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to='/'  className="nav-link px-2 link-secondary">Home</Link></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Series</a></li>
                            <li><Link to="movies/all" className="nav-link px-2 link-dark">Movies</Link></li>
                            <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                            <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
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