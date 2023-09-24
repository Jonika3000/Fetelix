import { Outlet } from "react-router-dom"; 
import Header from "../components/Header/Header";

let DefaultLayout = ()=>{
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}
export default DefaultLayout;