import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';


export default function CourseCard({courseProp}) {

	// Checks to see if the data was successfully passed
	// Every component receives information in a form of an object
	// console.log(props);
	// console.log(typeof props);

	const {_id, name, description, price} = courseProp;


	// Use the state hook for this component to be able to store its state (data)
	// States are used to keep track of information related to individual components
	/*
		Syntax:
			const [getter, setter] = useState(initialGetterValue);

		Exaple:
			const [users, setUsers] = useState([]);
	*/
	// const [count, setCount] = useState(0);
	// const [seats, setSeats] = useState(30);

	// // console.log(useState(0));

	// function enroll(){

	// 	if(seats > 0) {
	// 		setCount(count + 1);
	// 		console.log('Enrollees: ' + count);
	// 		setSeats(seats - 1);
	// 		console.log('Seats: ' + seats)
	// 	} else {
	// 		alert("No more seats available");
	// 	}
	
	// }



	return (
		<Card>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>Description:</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text>{price}</Card.Text>
				{/*<Card.Text>Enrollees: {count}</Card.Text>*/}
				<Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
			</Card.Body>
		</Card>

	)
}

// Check if the CourseCard component is getting the correct prop types
CourseCard.propTypes = {
	// The "shape" method is used to check if a prop object conforms to a specific shape
	courseProp: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
