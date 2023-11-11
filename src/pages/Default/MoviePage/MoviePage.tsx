import { useEffect, useState } from "react";
import { IMovieGet } from "../../../types/MovieType";
import { useParams } from "react-router-dom";
import http from "../../../http";
import Loading from "../../../components/Loading/Loading";
import ReactPlayer from "react-player";
import { APP_ENV } from "../../../env";
import "./MoviePage.css"

interface RouteParams {
    [key: string]: string | undefined;
    slug: string;
}
export interface IHuman {
    id: number;
    name: string;
    birthday: string;
    image: File | null;
    place_of_birth: string;
}
const MoviePage = () => {
    const [movie, setMovie] = useState<IMovieGet>({
        id: 0,
        title: "",
        image: "",
        country: "",
        description: "",
        releaseDate: "",
        time: 0,
        directorId: 0,
        slug: "",
        videoPath: "",
        actorsIds: [],
        genresIds: [],
        images: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const { slug } = useParams<RouteParams>();
    let [images, setImages] = useState<File[]>([]);
    const [actors, setActors] = useState<IHuman[]>([]);
    let [director, setDirector] = useState<IHuman>({
        id: 0,
        name: "",
        birthday: "",
        image: null,
        place_of_birth: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            http.get<IMovieGet>('api/movie/' + slug).
                then(resp => {
                    setMovie(resp.data);
                    setLoading(false);
                }).catch((error) => {
                    const errorMessage =
                        error.code === "ECONNABORTED"
                            ? "Time out"
                            : error.response && error.response.status === 404
                                ? "Not Found"
                                : "An unexpected error occurred";
                    setError(errorMessage);
                    setLoading(false);
                });
        };

        fetchData();
    }, [slug]);

    if (loading == false && error == "") {
        return (
            <>
                <div className="container">
                <h3>{movie.title}</h3>
                    <div className="movieInfo"> 
                            <img className="imageMovie"
                                src={`${APP_ENV.IMAGE_URL}1200_${movie.image}`} /> 
                        <div className="movieInfoData">
                           
                            <ul>
                                <li>{movie.releaseDate}</li>
                                <li>{movie.country}</li>
                                <li>{movie.time}</li> 
                            </ul>
                        </div>
                    </div>
                    <ReactPlayer url={`${APP_ENV.IMAGE_URL}${movie.videoPath}`}
                        width='100%'
                        height='100%'
                        controls={true} />
                </div> 
            </>
        );
    }
    else if (loading == false && error != "") {
        <div className="container">
            <h1>{error}</h1>
        </div>
    }
    else if (loading == true) {
        return (
            <>
                <div className="container">
                    <Loading></Loading>
                </div>
            </>
        );
    } 

}

export default MoviePage;