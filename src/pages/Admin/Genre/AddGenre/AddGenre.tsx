import { useState } from "react";
import { Form } from "react-bootstrap";
import http from "../../../../http";
 
export interface IGenre{
    id:number;
    name: string;
}

const AddGenre = () => {
    const [validated, setValidated] = useState(false);
    const [genre, setGenre] = useState<IGenre>({
        id:0,
        name: ""
    });

    const PostDataAsync = async () => {
        try {
            await http
                .post("api/genre", genre);
        }
        catch (error: any) {
            console.log(error);
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setGenre((prevstate) => ({
            ...prevstate,
            [name]: value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        await PostDataAsync();
        setGenre({
            id:0,
            name: ""
        });
        form.reset();
    }

    return (
        <>
            <div className="container">
                <label>Add genre</label>
                <p></p>
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                    <Form.Group>
                        <Form.Label>Genre name</Form.Label>
                        <Form.Control value={genre.name}
                            type="text"
                            placeholder="enter genre name"
                            name="name"
                            required
                            onChange={handleChange} />
                    </Form.Group>  
                    <button type="submit" style={{ marginTop: "2rem" }}>Save</button>
                </Form>
            </div>
        </>
    )
}

export default AddGenre;