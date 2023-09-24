import Logo from '../../assets/images/Logo.png';
import "./Header.css"
let Header = () => {
    return (
        <>
            <div className="Header">
                <div  className="container">
                    <header  className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                        <a href="/"  className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                           <img width={30} height={30} src={Logo}/>
                        </a> 
                        <ul  className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#"  className="nav-link px-2 link-secondary">Home</a></li>
                            <li><a href="#"  className="nav-link px-2 link-dark">Series</a></li>
                            <li><a href="#"  className="nav-link px-2 link-dark">Movies</a></li>
                            <li><a href="#"  className="nav-link px-2 link-dark">Pricing</a></li> 
                            <li><a href="#"  className="nav-link px-2 link-dark">About</a></li>
                        </ul> 
                        <div  className="col-md-3 text-end">
                            <button type="button"  className="ButtonHeader">Login</button>
                            <button type="button"  className="ButtonHeader">Sign-up</button>
                        </div>
                    </header>
                </div>
            </div>
        </>
    )
}
export default Header;