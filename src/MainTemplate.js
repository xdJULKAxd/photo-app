import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { logout } from './appSlice';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Pomocniczy komponent opakowujacy inne w menu
const MainTemplate = ({ children }) => {
	const username = useSelector(state => state.root.user.username);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchPhrase, setSearchPhrase] = useState('');
	return (
		<>
			<Navbar bg='light' expand='lg'>
				<Container>
					<Navbar.Brand>React-APP</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<LinkContainer to='/'>
								<Nav.Link>Wszystkie zdjęcia</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/albums'>
								<Nav.Link>Albumy</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/posts'>
								<Nav.Link>Posty</Nav.Link>
							</LinkContainer>
						</Nav>
						<Form className='d-flex'>
							<Form.Control
								type='search'
								placeholder='Szukaj usera...'
								className='me-2'
								aria-label='Search'
								value={searchPhrase}
								onChange={e => setSearchPhrase(e.target.value)}
							/>
							<Button
								variant='outline-success'
								onClick={() => {
									if (searchPhrase) {
										navigate(`/users/${searchPhrase}`);
									}
								}}>
								Wyszukaj
							</Button>
						</Form>
					</Navbar.Collapse>
					<Navbar.Collapse className='justify-content-end'>
						<NavDropdown title={`Zalogowany jako ${username}`} id='basic-nav-dropdown'>
							<LinkContainer to='/user/info'>
								<NavDropdown.Item>Twoje dane</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to='/user/photos'>
								<NavDropdown.Item>Twoje zdjęcia</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to='/user/posts'>
								<NavDropdown.Item>Twoje posty</NavDropdown.Item>
							</LinkContainer>
						</NavDropdown>
						<Navbar.Text>
							<Button variant='link' onClick={() => dispatch(logout())}>
								wyloguj
							</Button>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div>{children}</div>
		</>
	);
};
export default MainTemplate;
