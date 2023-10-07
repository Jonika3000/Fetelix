import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
 
const AddGenre = () => {
    const [validated, setValidated] = useState(false);
    const [genre, setGenre] = useState<string>("");

    const PostDataAsync = async () => {
        try {
            await axios
                .post<string>("http://localhost:8080/api/genre", genre, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
        }
        catch (error: any) {
            console.log(error);
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setGenre(value);
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
        setGenre("");
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
                        <Form.Control value={genre}
                            type="text"
                            placeholder="enter genre name"
                            name="name"
                            required
                            onChange={handleChange} />
                    </Form.Group>  
                    <Button type="submit" style={{ marginTop: "2rem" }}>Save</Button>
                </Form>
            </div>
        </>
    )
}

export default AddGenre;