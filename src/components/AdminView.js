// ----------AdminView.js----------
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditCourse from './EditCourse';
import ArchiveCourses from './ArchiveCourses';
 
export default function AdminView({ coursesData, fetchData }) {

	const [courses, setCourses] = useState([]);


	useEffect(() => {
		const courseArr = coursesData.map(course => {
			return (
				<tr>
					<td>{course._id}</td>
					<td>{course.name}</td>
					<td>{course.description}</td>
					<td>{course.price}</td>
					<td className={course.isActive ? "text-success" : "text-danger"}>{course.isActive ? "Available" : "Unavailable"}</td>
					<td><EditCourse course={course._id} fetchData={fetchData} /></td>
					<td><ArchiveCourses course={course._id} fetchData={fetchData} isActive={course.isActive} /></td>
				</tr>

			)
		})

		setCourses(courseArr);

	}, [coursesData])

	return (
		<>
			<h1 className="text-center my-4">Admin Dashboard</h1>
			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{courses}
				</tbody>
			</Table>
		</>
	)
}