import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditCourse({ course, fetchData }){

	// state for courseId for the fetch URL
	const [courseId, setCourseId] = useState('');

	//Forms state
	// Add state for the forms of course
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	// state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false);


	// Function for opening the modal
	const openEdit = (courseId) => {

		console.log("courseId", courseId);

		// to still get the actual data from the from
		fetch(`${process.env.REACT_APP_API_URL}/products/${courseId}`)
		.then(res => res.json())
		.then(data => {
			// Populate all the input values with course info
			setCourseId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		});

		// Then, open the modal
		setShowEdit(true);

	}

	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	// Function to update the course
	const editCourse = (e, courseId) => {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${courseId}`, {
			method: "PUT",
			headers: {
				'Content-Type': "application/json",
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

			if(data === true){
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Course Successfully Updated'
				});

				closeEdit();
				// Trigger the fetchData function from the Courses component to render the changes created when updating the course.
				fetchData();
			} else {
				Swal.fire({
					title: "Error!",
					icon: 'error',
					text: 'Please try again'
				});

				closeEdit();
				fetchData();
			}

		})

	}



	return (
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(course)}>Edit</Button>

			{/*EDIT MODAL*/}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={ e => editCourse(e, courseId) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="courseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="courseDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
	                            type="text" 
	                            required
	                            value={description}
	                            onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="coursePrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
	                            type="number" 
	                            required
	                            value={price}
	                            onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

		</>

	)
}