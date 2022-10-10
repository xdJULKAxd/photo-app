import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { signIn } from './appSlice';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

// Fake'owe logowanie, ustawiany jest user w celu poruszania sie po aplikacji i jej funkcjach
const LoginForm = () => {
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLoginFn = async e => {
		if (username) {
			e.preventDefault();
			await dispatch(signIn(username));
			navigate('/');
		}
	};

	const handleChangeValueFn = e => {
		setUsername(e.target.value);
	};

	return (
		<>
			<Form className=''>
				<Alert variant='warning'>Korzystanie z aplikacji wymaga podania username!</Alert>
				<Form.Group className='mb-3' controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control type='text' placeholder='Username' value={username} onChange={e => handleChangeValueFn(e)} />
				</Form.Group>
				<Button variant='primary' type='submit' onClick={e => handleLoginFn(e)}>
					Zaloguj
				</Button>
			</Form>
		</>
	);
};

export default LoginForm;
