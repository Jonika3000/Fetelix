import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import http from "../../../../http";

export interface Director {
    name: string,
    birthday: string,
    image: File | null,
    place_of_birth: string
}

const AddDirector = () => {
    const [validated, setValidated] = useState(false);
    const [director, setDirector] = useState<Director>({
        name: "",
        birthday: "",
        image: null,
        place_of_birth: ""
    });
    const PostDataAsync = async () => {
        try {
            await http
                .post<Director>("api/director", director, {
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
        const { name, value } = event.target;
        setDirector((prevstate) => ({
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
        setDirector({
            name: "",
            birthday: "",
            image: null,
            place_of_birth: "" 
        });
        form.reset();
    }

    return (
        <>
            <div className="container">
                <label>Add director</label>
                <p></p>
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={director.name}
                            type="text"
                            placeholder="enter director name"
                            name="name"
                            required
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control value={director.birthday}
                            type="date"
                            placeholder="enter director birthday"
                            name="birthday"
                            required
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Place Of Birth</Form.Label>
                        <Form.Control
                            type="text"
                            value={director.place_of_birth}
                            placeholder="enter director place of birth"
                            onChange={handleChange}
                            name="place_of_birth"
                            required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            required
                            accept=".jpg,.png,.jpeg"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    setDirector({
                                        ...director,
                                        image: file
                                    });
                                }
                            }}
                        />
                    </Form.Group>
                    <button type="submit" style={{ marginTop: "2rem" }}>Save</button>
                </Form>
            </div>
        </>
    )
}

export default AddDirector;