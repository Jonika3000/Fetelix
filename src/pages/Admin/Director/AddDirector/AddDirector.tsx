import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../../http";

export interface Director {
    name: string,
    birthday: string,
    image: File | null,
    placeOfBirth: string
}

const AddDirector = () => {
    const [validated, setValidated] = useState(false);
    const [director, setDirector] = useState<Director>({
        name: "",
        birthday: "",
        image: null,
        placeOfBirth: ""
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
            placeOfBirth: "" 
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
                            placeholder="enter actor name"
                            name="name"
                            required
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control value={director.birthday}
                            type="date"
                            placeholder="enter actor birthday"
                            name="birthday"
                            required
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Place Of Birth</Form.Label>
                        <Form.Control
                            type="text"
                            value={director.placeOfBirth}
                            placeholder="enter actor place of birth"
                            onChange={handleChange}
                            name="placeOfBirth"
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
                    <Button type="submit" style={{ marginTop: "2rem" }}>Save</Button>
                </Form>
            </div>
        </>
    )
}

export default AddDirector;