import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
export interface IEditActor {
    id: number,
    name: string,
    birthday: string,
    image: File | null,
    placeOfBirth: string
}

const EditActor = () => {
    const [AllItems, SetAllItems] = useState<IEditActor[]>([]);
    const [EditItem, setEditItem] = useState<IEditActor>({
        id: 0,
        name: "",
        birthday: "",
        image: null,
        placeOfBirth: ""
    });
    const [image, setImage] = useState<File | null>(null);
    const [validated, setValidated] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        axios
            .get<IEditActor[]>("api/actor/")
            .then((response) => {
                SetAllItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const EditDataAsync = async () => {
        const formData = new FormData();
        if (image != null) {
            formData.append("image", image, image.name);
        }
        formData.append("id", EditItem.id.toString());
        formData.append("name", EditItem.name);
        formData.append("birthday", EditItem.birthday);
        formData.append("placeOfBirth", EditItem.placeOfBirth);
        try {
            await axios
                .post("api/actor/edit/" + EditItem.id, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            setEditItem({
                id: 0,
                name: "",
                birthday: "",
                image: null,
                placeOfBirth: ""
            });
            setImage(null);
            setSelectedItemId(null);
        }
        catch (error: any) {
            console.log(error);
        }

    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form = event.currentTarget;
        if (event.currentTarget.checkValidity() === true) {
            await EditDataAsync();
            form.reset();
        }
    };

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        setEditItem({ ...EditItem, [event.target.name]: event.target.value });
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    }

    function ComboBoxChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedId = Number(event.target.value);
        setSelectedItemId(selectedId);
        const selectedItem = AllItems.find((item) => item.id === selectedId);
        if (selectedItem) {
            setEditItem(selectedItem);
        } else {
            setEditItem({
                id: 0,
                name: "",
                birthday: "",
                image: null,
                placeOfBirth: ""
            });
        }
    }

    const dataItems = AllItems.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        );
    }); 
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="CenterContent">
                <div className="Padding">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Select actor</Form.Label>
                            <Form.Select
                                aria-label="actor"
                                onChange={ComboBoxChange}
                                required
                                name="FormSelectItem"
                                value={selectedItemId || ""}
                            >
                                <option value="">Choose...</option>
                                {dataItems}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter actor name"
                                name="name"
                                value={EditItem.name}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter actor birthday"
                                name="birthday"
                                value={EditItem.birthday}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Place Of Birth</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter actor place of birth"
                                name="placeOfBirth"
                                value={EditItem.placeOfBirth}
                                required
                                onChange={handleChange}
                                disabled={!selectedItemId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{
                                color: "white",
                                fontSize: "24px"
                            }}>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <div style={{ width: "100%" }}>
                            {/* {EditItem.image && image == null && (
                                <img src={`${APP_ENV.BASE_URL_IMAGES}/${EditItem.image}`}
                                    style={{ width: "100px", height: "100px", margin: "10px" }}></img>
                            )} */}
                            {image != null && (
                                <img src={URL.createObjectURL(image)} style={{ maxHeight: "100px", maxWidth: "100px", objectFit: "cover" }} /> 
                            )}
                        </div>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form> 

                </div>
            </div>
        </div>
    );
} 

export default EditActor;