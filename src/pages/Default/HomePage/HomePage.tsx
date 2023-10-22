import { useEffect, useState } from "react";
import Slider from "../../../components/Slider/Slider";
import "./HomePage.css"; 
import http from "../../../http";
import "bootstrap-icons/font/bootstrap-icons.css";

export interface IGenre{
    id: number;
    name: string;
}
const HomePage = () => {
    const [allGenres, setAllGenres] = useState<IGenre[]>([]);
    useEffect(()=>{
        http.get<IGenre[]>('api/genre').
        then(resp => {
            setAllGenres(resp.data);
        }).catch((error) => {
            console.log(error);
        });
    },[]);
    const dataGenres = allGenres.length > 0 && allGenres.map((item)=>(
        <li key={item.id}><i className="bi bi-caret-right-fill hidden-icon" />{item.name}<i className="bi bi-caret-left hidden-icon" /></li> 
    ))
    return (
        <>
            <div className="SliderHomePage">
                <Slider></Slider>
            </div>
            <div className="genresHome">
                <ul>
                    {dataGenres}
                </ul>
            </div> 
        </>
    )
}
export default HomePage;