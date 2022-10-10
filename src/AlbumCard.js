import React from 'react';
import Card from 'react-bootstrap/Card';
import album from './album.jpg';
import { useNavigate } from 'react-router-dom';
const AlbumCard = ({ id, url, author }) => {
	const navigate = useNavigate();
	return (
		<Card style={{ width: '30%', margin: '15px', cursor: 'pointer' }} onClick={() => navigate(`/albums/${id}`)}>
			<Card.Img variant='top' src={album} />

			<Card.Body>
				<Card.Title>{`Album autorstwa: ${author}`}</Card.Title>
			</Card.Body>
		</Card>
	);
};
export default AlbumCard;
