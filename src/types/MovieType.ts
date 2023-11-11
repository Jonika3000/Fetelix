export interface IMovieGet {
    id: number;
    title: string;
    image: string;
    country: string;
    description: string;
    releaseDate: string;
    time: number;
    directorId: number;
    slug: string;
    videoPath: string;
    actorsIds: number[];
    genresIds: number[];
    images: File[];
}

export interface IMovie {
    id: number;
    title: string;
    image: File | null;
    country: string;
    description: string;
    releaseDate: string;
    time: number;
    directorId: number;
    slug: string;
    videoPath: File | null;
    actorsIds: number[];
    genresIds: number[];
    images: File[];
}