import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddCourse() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState(0);
    const [isActive, setIsActive] = useState(true);
 
    function addCourse(e) {

        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_API_URL}/courses/`, {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data) {
                Swal.fire({
                    title: "Course added.",
                    icon: "success"
                })
                navigate("/courses");
            } else {
                Swal.fire({
                    title: "Failed to add course.",
                    icon: "error"
                })
            }
            
        })
        setName("");
        setDescription("");
        setPrice(0);
    }
     
    useEffect(() => {
        if (
            (name !== "" &&
            description !== "" &&
            price !== "")
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, description, price]);

    return (
        (user.isAdmin == false) ?
        <Navigate to ="/courses" />
    :
    <Form onSubmit={(e) => addCourse(e)} >
        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
                type="text" 
                placeholder="Enter Name:" 
                required 
                value={name}
                onChange={e => {setName(e.target.value)}}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter Description:" 
                required 
                value={description}
                onChange={e => {setDescription(e.target.value)}}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control 
                type="number" 
                placeholder="Enter Price:" 
                required 
                value={price}
                onChange={e => {setPrice(e.target.value)}}
            />
        </Form.Group>

        {isActive ?
            <Button variant="primary" type="submit" >Submit</Button>
            :
            <Button variant="danger" type="submit" >Submit</Button>
        }
    </Form>
    )
}