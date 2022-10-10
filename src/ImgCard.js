import React from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhoto, fetchAllPhotos } from './appSlice';
import Button from 'react-bootstrap/Button';
const ImgCard = ({ id, url, category, author }) => {
	const user = useSelector(state => state.root.user);
	const dispatch = useDispatch();

	const deletePhotoFn = async id => {
		dispatch(deletePhoto(id));
		await dispatch(fetchAllPhotos());
	};

	return (
		<Card style={{ width: '30%', margin: '15px' }}>
			<Card.Img variant='top' src={url} />
			<Card.Body>
				<Card.Title>{`Dodano przez: ${author}`}</Card.Title>
			</Card.Body>
			<Card.Footer style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
				<small className='text-muted'>{`Kategoria: ${category}`}</small>
				{author === user.username ? (
					<Button variant='danger' onClick={() => deletePhotoFn(id)}>
						Usuń zdjęcie
					</Button>
				) : null}
			</Card.Footer>
		</Card>
	);
};

export default ImgCard;
