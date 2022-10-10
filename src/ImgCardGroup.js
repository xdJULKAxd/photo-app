import ImgCard from './ImgCard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const ImgCardGroup = ({ photos, searchPhotoId, searchAlbumId, helpFn }) => {
	const navigate = useNavigate();

	return (
		<>
			<Navbar bg='dark'>
				<Container>
					<Button variant='primary' onClick={() => navigate('/add-photo')}>
						Dodaj zdjęcie
					</Button>
				</Container>
				<Form className='d-flex'>
					<Form.Control
						id='photoId'
						type='search'
						placeholder='Id zdjecia'
						className='me-2'
						aria-label='Search'
						value={searchPhotoId}
						onChange={e => helpFn(e)}
					/>
				</Form>
				<Form className='d-flex'>
					<Form.Control
						id='albumId'
						type='search'
						placeholder='Id albumu'
						className='me-2'
						aria-label='Search'
						value={searchAlbumId}
						onChange={e => helpFn(e)}
					/>
				</Form>
			</Navbar>

			{photos.length > 0 ? (
				<div className='img-group'>
					{photos.map(photo => (
						<ImgCard
							key={photo.id}
							id={photo.id}
							category={photo.category}
							url={photo.url}
							author={photo.album.author}
						/>
					))}
				</div>
			) : (
				<Alert variant='danger'>Brak zdjęć</Alert>
			)}
		</>
	);
};

export default ImgCardGroup;
