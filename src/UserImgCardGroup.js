import UserImgCard from './UserImgCard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';

const UserImgCardGroup = ({ album }) => {
	const navigate = useNavigate();

	return (
		<>
			<Navbar bg='dark'>
				<Container>
					<Button variant='primary' onClick={() => navigate('/add-photo')}>
						Dodaj zdjęcie
					</Button>
				</Container>
			</Navbar>

			{album.photos.length > 0 ? (
				<div className='img-group'>
					{album.photos.map(photo => (
						<UserImgCard key={photo.id} id={photo.id} category={photo.category} url={photo.url} />
					))}
				</div>
			) : (
				<Alert variant='danger'>Brak zdjęć</Alert>
			)}
		</>
	);
};

export default UserImgCardGroup;
