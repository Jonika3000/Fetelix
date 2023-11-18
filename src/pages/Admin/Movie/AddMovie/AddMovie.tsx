import { ChangeEvent, useEffect, useState } from "react";
import http from "../../../../http";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../../components/Loading/Loading";
import Select from 'react-select';
import { countries } from "../../../../types/CountriesData";
import { IMovie } from "../../../../types/MovieType";

export interface IHuman {
    id: number;
    name: string;
    birthday: string;
    image: File | null;
    place_of_birth: string;
}
export interface IGenre {
    id: number;
    name: string;
}
const AddMovie = () => {
    let [selectedDirector, setSelectedDirector] = useState<IHuman>({
        id: 0,
        name: "",
        birthday: "",
        image: null,
        place_of_birth: ""
    });
    const countryOptions = countries.map(country => ({
        value: country.name,
        label: country.name
    }));
    const [allGenres, setAllGenres] = useState<IGenre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const handleChangeCountry = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    };
    let [images, setImages] = useState<File[]>([]);
    const [movie, setMovie] = useState<IMovie>({
        id: 0,
        title: "",
        image: null,
        country: "",
        description: "",
        releaseDate: "",
        time: 0,
        directorId: 0,
        slug: "",
        videoPath: null,
        actorsIds: [],
        genresIds: [],
        images: []
    });
    let [validated, setValidated] = useState(false);
    const [allActors, setActors] = useState<IHuman[]>([]);
    const [allDirectors, setDirectors] = useState<IHuman[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const [selectedActors, setSelectedActors] = useState<IHuman[]>([]);

    useEffect(() => {
        fetchData();
    }, []);
    const handleRemoveImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    let SelectedImages = images.map((img, index) => (
        <div
            key={index}
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
        >
            <img
                src={URL.createObjectURL(img)}
                style={{ maxHeight: "100px", maxWidth: "100px", objectFit: "cover" }}
                alt={`Image ${index + 1}`}
            />
            <Button
                variant="danger"
                size="sm"
                style={{ marginLeft: "10px" }}
                onClick={() => handleRemoveImage(index)}
            >
                Remove
            </Button>
        </div>
    ));
    const fetchData = async () => {
        http.get<IHuman[]>('api/actor').
            then(resp => {
                setActors(resp.data);

            }).catch((error) => {
                setErrorMessage(error);
            });
        http.get<IGenre[]>('api/genre').
            then(resp => {
                setAllGenres(resp.data);
            }).catch((error) => {
                setErrorMessage(error);
            });
        http.get<IHuman[]>('api/director').
            then(resp => {
                setDirectors(resp.data);

            }).catch((error) => {
                setErrorMessage(error);
            });
        setLoading(false);
    };

    function setErrorMessage(message: any) {
        const errorMessage =
            message.code === "ECONNABORTED"
                ? "Time out"
                : message.response && message.response.status === 404
                    ? "Not Found"
                    : "An unexpected error occurred";
        setError(errorMessage);
    }

    const dataComboBoxActors = allActors != undefined && allActors.length > 0 && allActors.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));
    const dataComboBoxDirectors = allDirectors != undefined && allDirectors.length > 0 && allDirectors.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));
    const dataComboBoxGenres = allGenres != undefined && allGenres.length > 0 && allGenres.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        const model = {
            ...movie,
            directorId: selectedDirector.id,
            country: selectedOption.value,
            actorsIds: selectedActors.map(actor => actor.id),
            images: images,
            genresIds: selectedGenres.map(genre => genre.id)
        };

        await PostDataAsync(model);
        form.reset();
    }

    const PostDataAsync = async (model: IMovie) => {
        try {
            await http
                .post<IMovie>("api/movie", model, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
        }
        catch (error: any) {
            console.log(error);
        }
    }
    function ComboBoxChangeDirector(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;
        if (selectedValue !== "") {
            setSelectedDirector({
                ...selectedDirector,
                id: parseInt(selectedValue),
            });
        }
    }

    function ComboBoxChangeActor(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;
        if (selectedValue !== "") {
            const selectedActor = allActors.find(actor => actor.id === parseInt(selectedValue));
            if (selectedActor) {
                if (!selectedActors.some(actor => actor.id === selectedActor.id)) {
                    setSelectedActors([...selectedActors, selectedActor]);
                }
            }
        }
    }
    function ComboBoxChangeGenres(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;
        if (selectedValue !== "") {
            const selectedGenre = allGenres.find(genre => genre.id === parseInt(selectedValue));
            if (selectedGenre) {
                if (!selectedGenres.some(genre => genre.id === selectedGenre.id)) {
                    setSelectedGenres([...selectedGenres, selectedGenre]);
                }
            }
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMovie((prevstate) => ({
            ...prevstate,
            [name]: value
        }))
    }
    if (!loading) {
        return (
            <div className="container">
                <div style={{ minHeight: "100vh" }}>
                    <div className="CenterContent">
                        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                            <Form.Group className="mb-3">
                                <Form.Label >Title</Form.Label>
                                <Form.Control as="textarea"
                                    type="text"
                                    placeholder="Enter movie title"
                                    name="title"
                                    value={movie.title}
                                    required
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback
                                    type="invalid">
                                    Please enter a movie item.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formItemDirector">
                                <Form.Label >Select director</Form.Label>
                                <Form.Select aria-label="Item director" onChange={ComboBoxChangeDirector} required name="FormSelectDirector">
                                    <option value="">Select...</option>
                                    {dataComboBoxDirectors}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Please select a actor.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >Select actors</Form.Label>
                                <Form.Select aria-label="Item category" onChange={ComboBoxChangeActor} required name="FormSelectActor">
                                    <option value="">Select...</option>
                                    {dataComboBoxActors}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Please select a actor.</Form.Control.Feedback>
                            </Form.Group>
                            <div>
                                <Form.Label>Selected Actors:</Form.Label>
                                <ul>
                                    {selectedActors?.map(actor => (
                                        <li key={actor.id}>{actor.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Select genres</Form.Label>
                                <Form.Select onChange={ComboBoxChangeGenres} required name="FormSelectGenres">
                                    <option value="">Select...</option>
                                    {dataComboBoxGenres}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Please select a genres.</Form.Control.Feedback>
                            </Form.Group>
                            <div>
                                <Form.Label>Selected Genres:</Form.Label>
                                <ul>
                                    {selectedGenres?.map(genre => (
                                        <li key={genre.id}>{genre.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label >Video</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    accept=".mp3,.mp4"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        const file = event.target.files?.[0];
                                        if (file) {
                                            setMovie({
                                                ...movie,
                                                videoPath: file
                                            });
                                        }
                                    }}
                                />
                                <Form.Control.Feedback
                                    type="invalid">
                                    Please select a movie video.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formItemImage">
                                <Form.Label >Image main</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    accept=".jpg,.png,.jpeg"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        const file = event.target.files?.[0];
                                        if (file) {
                                            setMovie({
                                                ...movie,
                                                image: file
                                            });
                                        }
                                    }}
                                />
                                <Form.Control.Feedback
                                    type="invalid">
                                    Please select a movie image.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Release date</Form.Label>
                                <Form.Control value={movie.releaseDate}
                                    type="date"
                                    placeholder="enter movie releaseDate"
                                    name="releaseDate"
                                    max={new Date().toISOString().slice(0, 10)}
                                    required
                                    onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time (min)</Form.Label>
                                <Form.Control value={movie.time}
                                    type="number"
                                    placeholder="enter movie time"
                                    name="time"
                                    max={new Date().toISOString().slice(0, 10)}
                                    required
                                    onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Slug</Form.Label>
                                <Form.Control value={movie.slug}
                                    type="text"
                                    placeholder="enter movie slug"
                                    name="slug"
                                    required
                                    onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formItemImages">
                                <Form.Label >Images</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    required
                                    accept=".jpg,.png,.jpeg"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        const files = event.target.files;
                                        if (files) {
                                            const newImages = [...images, ...Array.from(files)];
                                            setImages(newImages);
                                        }
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select at least one image.
                                </Form.Control.Feedback>
                            </Form.Group>
                            {SelectedImages}
                            <Form.Group className="mb-3">
                                <Form.Label >Description</Form.Label>
                                <Form.Control as="textarea"
                                    type="text"
                                    placeholder="Enter movie description"
                                    name="description"
                                    value={movie.description}
                                    required
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback
                                    type="invalid">
                                    Please enter a item description.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Label>Select country:</Form.Label>
                            <Select
                                value={selectedOption}
                                options={countryOptions}
                                onChange={handleChangeCountry}
                            />
                            <button type="submit" style={{ marginTop: "2rem" }}>Create</button>
                        </Form>

                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <Loading></Loading>
            </div>
        );
    }
}
export default AddMovie;