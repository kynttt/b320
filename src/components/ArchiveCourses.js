import {Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveCourse({course, isActive, fetchData}){

	const archiveToggle = (courseId) => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/archive`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Course successfully disabled"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please Try Again"
				})
				fetchData()
			}

		})
	}

	const activateToggle = (courseId) => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}/activate`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Course successfully enabled"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please Try Again"
				})
				fetchData()
			}

		})
	}

	return (
		<>
			{isActive ?
				<Button variant="danger" size="sm" onClick={() => archiveToggle(course)} >Archive</Button>
			:
				<Button variant="success" size="sm" onClick={() => activateToggle(course)} >Activate</Button>
			}
		</>

	)
}