import { useEffect, useState } from "react";
import { IMovieGet } from "../../../types/MovieType";
import { useParams } from "react-router-dom";
import http from "../../../http";
import Loading from "../../../components/Loading/Loading";
import ReactPlayer from "react-player";
import { APP_ENV } from "../../../env";
import "./MoviePage.css"
import { IActor } from "../../Admin/Actor/AddActor/AddActor";
import { IDirector } from "../../Admin/Director/AddDirector/AddDirector";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

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
export interface IMovieFullGet {
    movie: IMovieGet | undefined;
    images: string[];
    genres: string[];
    actors: IActor[];
    director: IDirector | undefined;
}
const MoviePage = () => {
    // const [movie, setMovie] = useState<IMovieGet>({
    //     id: 0,
    //     title: "",
    //     image: "",
    //     country: "",
    //     description: "",
    //     releaseDate: "",
    //     time: 0,
    //     directorId: 0,
    //     slug: "",
    //     videoPath: "",
    //     actorsIds: [],
    //     genresIds: [],
    //     images: []
    // });
    const [movie, setMovie] = useState<IMovieFullGet>({
        movie: undefined,
        images: [],
        genres: [],
        actors: [],
        director: undefined
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
            http.get<IMovieFullGet>('api/movie/' + slug).
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

    const dataGenres = movie.genres && movie.genres.length > 0 && movie.genres.map((item) => (
        <a> {item}</a>
    ));

    let dataImages = movie.images && Array.isArray(movie.images) && movie.images.map((item) => (
        <div data-src={`${APP_ENV.IMAGE_URL}1200_${item}`} />
    ));

    if (loading == false && error == "") {
        return (
            <>
                <div className="container">
                    <h3>{movie.movie?.title}</h3>
                    <div className="movieInfo">
                        <div className="imageMovie">
                            <AwesomeSlider className="sliderImages" animation="fallAnimation">
                                {dataImages}
                            </AwesomeSlider>
                        </div> 
                        <div className="movieInfoData">
                            <ul>
                                <li>Release date: {movie.movie?.releaseDate}</li>
                                <li>Country: {movie.movie?.country}</li>
                                <li>Time: {movie.movie?.time}</li>
                                <li>Genres: {dataGenres}</li>
                                <li>Director: {movie.director?.name}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="DescriptionMovieDiv">
                        <h4>Description</h4>
                        <p>{movie.movie?.description}</p>
                    </div>
                    <ReactPlayer url={`${APP_ENV.IMAGE_URL}${movie.movie?.videoPath}`}
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