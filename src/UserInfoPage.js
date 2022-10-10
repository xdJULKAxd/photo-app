import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData } from './appSlice';
import MainTemplate from './MainTemplate';

const UserInfoPage = () => {
	const [user, setUser] = useState({
		name: ''
	});

	const [isEdit, setIsEdit] = useState(false);
	const dispatch = useDispatch();
	const loggedUser = useSelector(state => state.root.user);
	useEffect(() => {
		setUser(loggedUser);
	}, []);
	const toggleBtnFn = e => {
		e.preventDefault();
		if (isEdit) {
			dispatch(editUserData(user));
		}
		setIsEdit(!isEdit);
	};

	const handleChangeValueFn = e => {
		const tmp = { ...user, username: loggedUser.username, id: loggedUser.id };
		tmp[e.target.id] = e.target.value;
		setUser(tmp);
	};

	return (
		<MainTemplate>
			<Form className=''>
				<Form.Group className='mb-3' controlId='id'>
					<Form.Label>Twoje ID</Form.Label>
					<Form.Control type='text' placeholder='ID' value={loggedUser.id} disabled={true} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control type='text' placeholder='Username' value={loggedUser.username} disabled={true} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='name'>
					<Form.Label>Imie</Form.Label>
					<Form.Control
						type='text'
						placeholder='Imie'
						value={user.name}
						onChange={e => handleChangeValueFn(e)}
						disabled={!isEdit}
					/>
				</Form.Group>
				<Button variant='primary' type='submit' onClick={e => toggleBtnFn(e)}>
					{isEdit ? 'Zapisz' : 'Edytuj'}
				</Button>
			</Form>
		</MainTemplate>
	);
};

export default UserInfoPage;
