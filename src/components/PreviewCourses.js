import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function PreviewCourses({data, breakPoint}){

    const { _id, name, description, price} = data;

	return(
		<Col xs={12} md={breakPoint}>
			<Card className="cardHighlight mx-2">
				<Card.Body>
					<Card.Title className="text-center">
						<Link to={`/courses/${_id}`}>{name}</Link>
					</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<h5 className="text-center">₱{price}</h5>
					<Link to={`/courses/${_id}`} className="btn btn-primary d-block">details</Link>
				</Card.Footer>
			</Card>
		</Col>

	)
}