import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersByName, setLoading } from './appSlice';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const UsersView = () => {
	const { username } = useParams();
	const [users, setUsers] = useState([]);
	const dispatch = useDispatch();
	const { isLoading, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchUsersByName(username));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);

	useEffect(() => {
		setUsers(state.users);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<MainTemplate>
			{isLoading ? (
				<Spinner />
			) : users.length > 0 ? (
				<ListGroup>
					<Alert variant='success'>Liczba znalezionych userów: {users.length}</Alert>
					{users.map(user => (
						<ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
					))}
				</ListGroup>
			) : (
				<Alert>Nie znaleziono userów</Alert>
			)}
		</MainTemplate>
	);
};

export default UsersView;
