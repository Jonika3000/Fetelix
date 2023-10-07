import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../../http";

export interface IDeleteActor {
    id: number,
    name: string,
    birthday: string,
    image: File | null,
    placeOfBirth: string
}
const DeleteActor = () => {
    let [actor, setActor] = useState<IDeleteActor>({
        id: 0,
        name: "",
        birthday: "",
        image: null,
        placeOfBirth: ""
    });
    let [validated, setValidated] = useState(false);
    const [allActors, setActors] = useState<IDeleteActor[] | undefined>(undefined);

    useEffect(() => {
        http.get<IDeleteActor[]>('api/actor').
            then(resp => {
                setActors(resp.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    function ComboBoxChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedValue = event.target.value;
        if (selectedValue !== "") {
            setActor({
                ...actor,
                id: parseInt(selectedValue),
            });
        }
    }
    const DeleteDataAsync = async () => { 
        try{
          await http.delete('api/actor/delete' + actor.id);
            setActor({
                id: 0,
                name: "", 
                placeOfBirth: "",
                image: null, 
                birthday: ""
            });  
        }
        catch (error: any) {
          console.log(error);
        }   
    }
    const dataComboBox = allActors != undefined && allActors.length > 0 && allActors.map((item) => (
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
                            <Form.Label style={{ color: 'white', fontSize: "30px" }}>Select actor for delete</Form.Label>
                            <Form.Select aria-label="Item category" onChange={ComboBoxChange} required name="FormSelectCategory">
                                <option value="">Select...</option>
                                {dataComboBox}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a actor.</Form.Control.Feedback>
                        </Form.Group>
                        <Button style={{ margin: "0" }} type="submit">Delete</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default DeleteActor;