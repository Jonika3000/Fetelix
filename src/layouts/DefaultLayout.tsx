import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

let DefaultLayout = () => {
    return (
        <>
            <Header />
            <div style={{ minHeight: "40vh" }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
export default DefaultLayout;