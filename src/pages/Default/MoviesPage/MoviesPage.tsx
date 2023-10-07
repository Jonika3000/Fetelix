import { useParams } from "react-router-dom";
import http from "../../../http";
import "./MoviesPage.css"
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";

export interface Movie {
    id: number,
    title: string,
    image: File | null,
    description: string,
    country_id: number,
    release_date: Date,
    time: number,
    director_id: number,
    slug: string,
    video_path: string
}

interface RouteParams {
    [key: string]: string | undefined;
    slug: string;
}

const MoviesPage = () => {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const { slug } = useParams<RouteParams>();

    useEffect(() => {
        const fetchData = async () => {
            http.get<Movie[]>('api/movie').
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
            <>
               
            </>
        );
    }); 

    if (loading == false && error == "") {
        return (
            <>
                {dataMovies}
            </>
        );
    } 
    else if (loading == false && error != "")
    {
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