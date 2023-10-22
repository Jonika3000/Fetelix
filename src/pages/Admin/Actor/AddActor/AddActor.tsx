import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import http from "../../../../http";

export interface IActor {
    name: string,
    birthday: string,
    image: File | null,
    place_of_birth: string
}

const AddActor = () => {
    const [validated, setValidated] = useState(false);
    const [actor, setActor] = useState<IActor>({
        name: "",
        birthday: "",
        image: null,
        place_of_birth: ""
    });
    const PostDataAsync = async () => {
        try {
            await http
                .post<IActor>("api/actor", actor, {
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
        setActor((prevstate) => ({
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
        setActor({
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
                <label>Add actor</label>
                <p></p>
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={actor.name}
                            type="text"
                            placeholder="enter actor name"
                            name="name"
                            required
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control value={actor.birthday}
                            type="date"
                            placeholder="enter actor birthday"
                            name="birthday"
                            max={new Date().toISOString().slice(0, 10)}
                            required
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Place Of Birth</Form.Label>
                        <Form.Control
                            type="text"
                            value={actor.place_of_birth}
                            placeholder="enter actor place of birth"
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
                                    setActor({
                                        ...actor,
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

export default AddActor;