import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	console.log(user); //checking if we received the login token

	return (
		// JSX
		<Navbar bg="light" expand="lg">
		    <Container fluid>
		        <Navbar.Brand href="#home">Zuitt Booking</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
		        <Navbar.Collapse id="basic-navbar-nav">
		            <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
		            <Nav.Link as={NavLink} to="/courses" exact>Courses</Nav.Link>

		            {(user.id !== null) ?
		            	
		            	(user.isAdmin) ?
		            		<>
		            			<Nav.Link as={NavLink} to="/addCourse" exact>Add Course</Nav.Link>
		            			<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
		            		</>
		            		:
		            		<>
		            			<Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link>
		            			<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
		            		</>
		            	
		            	:
		            	<>
			            	<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
			            	<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
		            	</>
		            }

		            
		            
		            </Nav>
		        </Navbar.Collapse>
		    </Container>
		</Navbar>
	)
}