import { useEffect, useState } from "react";
import Slider from "../../../components/Slider/Slider";
import "./HomePage.css"; 
import http from "../../../http";

export interface IGenre{
    id:number
    name: string
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
        <li key={item.id}>item.name</li>
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
            <h1>Hola amigo</h1>
        </>
    )
}
export default HomePage;