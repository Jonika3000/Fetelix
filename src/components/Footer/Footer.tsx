import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';

const Footer = () => {
    return (
        <>
            <div className="container">
                <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 border-top">
                    <div className="col mb-3">
                        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                            <img width={30} height={30} src={Logo} />
                        </a>
                        <p className="text-muted">© 2023</p>
                    </div>
                    <div className="col mb-3">
                    </div>
                    <div className="col mb-3">
                        <h5>Fetelix</h5>
                        <ul className="nav flex-column">
                            <li><Link to='/' className="nav-link px-2 text-muted">Home</Link></li>
                            <li><a href="#" className="nav-link px-2 text-muted">Series</a></li>
                            <li><Link to="movies/all" className="nav-link px-2 text-muted">Movies</Link></li>
                            <li><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                            <li><a href="#" className="nav-link px-2 text-muted">About</a></li>
                        </ul>
                    </div>
                    <div className="col mb-3">
                        <h5>Social</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Twitter</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Instagram</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Facebook</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">TikTok</a></li> 
                        </ul>
                    </div>
                    <div className="col mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    )
}
export default Footer;