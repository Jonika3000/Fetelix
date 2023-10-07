import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import http from "../../../../http";
import Select from 'react-select';
import { countries } from "../../../../types/CountriesData";

const countryOptions = countries.map(country => ({
    value: country.name,
    label: country.name
}));

const AddCountry = () => {
    const [validated, setValidated] = useState(false);
    const [genre, setGenre] = useState<string>("");

    const PostDataAsync = async () => {
        try {
            await http
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
    const [selectedOption, setSelectedOption] = useState<any>(null);
    
      
    console.log(selectedOption);
    const  handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption); 
      };
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
                <Select
                    value={selectedOption}
                    options={countryOptions} // Передаем массив объектов с опциями
                    onChange={handleChange}
                />
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

export default AddCountry;