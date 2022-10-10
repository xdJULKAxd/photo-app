import AlbumCard from './AlbumCard';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const AlbumCardGroup = ({ albums }) => {
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
			<div className='img-group'>
				{albums.map(album => (
					<AlbumCard key={album.id} id={album.id} url={album.imgUrl} author={album.author} />
				))}
			</div>
		</>
	);
};
export default AlbumCardGroup;
