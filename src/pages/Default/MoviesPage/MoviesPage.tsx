import { Link, useParams } from "react-router-dom";
import http from "../../../http";
import "./MoviesPage.css"
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { APP_ENV } from "../../../env";
import { IMovieGet } from "../../../types/MovieType";

interface RouteParams {
    [key: string]: string | undefined;
    slug: string;
}

const MoviesPage = () => {
    const [allMovies, setAllMovies] = useState<IMovieGet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const { slug } = useParams<RouteParams>();

    useEffect(() => {
        const fetchData = async () => {
            http.get<IMovieGet[]>('api/movie').
                then(resp => {
                    setAllMovies(resp.data);
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

    const dataMovies = allMovies && allMovies.map((item, key) => {
        return (
            <div className="movieDiv" style={{ backgroundImage: `url(${APP_ENV.IMAGE_URL}1200_${item.image})` }}>
                <Link to={"/movie/" + item.slug} className="movieTitle">
                    <h4 className="movieTitle">{item.title}</h4>
                </Link >
            </div>
        );
    });

    if (loading == false && error == "") {
        return (
            <>
                <div className="container">
                    <div className="dataMovies">{dataMovies}</div>
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
export default MoviesPage;