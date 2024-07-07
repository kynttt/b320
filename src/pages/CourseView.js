import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function CourseView() {

	const { courseId } = useParams();
	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	// Enroll user
	const enroll = (courseId) => {

		fetch(`${ process.env.REACT_APP_API_URL }/users/enroll`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then( data => {

			console.log(data)

			if(data.message === "Enrolled Successfully.") {
				Swal.fire({
					title: "Successfully enrolled",
					icon: "success",
					text: "YOu have successfully enrolled for this course."
				})

				navigate("/courses");

			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}

		})

	}


	// Retrieve course details
	useEffect(() => {

		console.log(courseId);

		fetch(`${ process.env.REACT_APP_API_URL }/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);

		})

	}, [courseId])

	return (
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							<Card.Subtitle>Class Schedule</Card.Subtitle>
							<Card.Text>8 am - 5 pm</Card.Text>
							{(user.id !== null) ?
								<Button variant="primary" block onClick={() => enroll(courseId)} >Enroll</Button>
							:
								<Link className="btn btn-danger btn-block" to="/login" >Log in to Enroll</Link>

							}
							
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}