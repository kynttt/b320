// Import the mock data.
// import coursesData from '../data/coursesData';
// Import CourseCard component
import { useEffect, useState, useContext } from 'react';
import CourseCard from '../components/CourseCard';
import UserContext from '../UserContext'

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Courses() {

	// // Check to see if the mock data was captured
	// console.log(coursesData);

	const { user } = useContext(UserContext);

	const [courses, setCourses] = useState([]);

	const fetchData = () => {
		// get all active courses
		fetch(`${process.env.REACT_APP_API_URL}/courses/all`)
		.then(res => res.json())
		.then(data => {

			console.log("data", data);

			// Sets the "courses" state to the data retrieve from the fetch request
			setCourses(data);

		})
	}


	useEffect(() => {

		fetchData();

	}, [])



	return (
		<>
			{user.isAdmin === true ?
				<AdminView coursesData={courses} fetchData={fetchData} />
			:
				<UserView coursesData={courses} />

			}
		</>
	)
}