import axios, { formToJSON } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface IDeleteGenre {
    id: number,
    name: string 
}
const DeleteGenre = () => {
    let [genre, setGenre] = useState<IDeleteGenre>({
        id: 0,
        name: "" 
    });
    let [validated, setValidated] = useState(false);
    const [allGenres, setGenres] = useState<IDeleteGenre[] | undefined>(undefined);

    useEffect(() => {
        axios.get<IDeleteGenre[]>('api/genre').
            then(resp => {
                setGenres(resp.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    function ComboBoxChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;
        if (selectedValue !== "") {
            setGenre({
                ...genre,
                id: parseInt(selectedValue),
            });
        }
    }
    const DeleteDataAsync = async () => { 
        try{
          await  axios.delete('api/genre/delete' + genre.id);
            setGenre({
                id: 0,
                name: "" 
            });  
        }
        catch (error: any) {
          console.log(error);
        }   
    }
    const dataComboBox = allGenres != undefined && allGenres.length > 0 && allGenres.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;
        await DeleteDataAsync();
        form.reset();
    }

    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <div className="CenterContent">
                    <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
                        <Form.Group className="mb-3" controlId="formItemCategory">
                            <Form.Label style={{ color: 'white', fontSize: "30px" }}>Select genre for delete</Form.Label>
                            <Form.Select aria-label="Item category" onChange={ComboBoxChange} required name="FormSelectCategory">
                                <option value="">Select...</option>
                                {dataComboBox}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a genre.</Form.Control.Feedback>
                        </Form.Group>
                        <Button style={{ margin: "0" }} type="submit">Delete</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default DeleteGenre;