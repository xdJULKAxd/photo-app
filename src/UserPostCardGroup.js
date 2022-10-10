import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import UserPostCard from './UserPostCard';
import Alert from 'react-bootstrap/Alert';
const PostCardGroup = ({ posts }) => {
	const navigate = useNavigate();

	return (
		<>
			<Navbar bg='dark'>
				<Container>
					<Button variant='primary' onClick={() => navigate('/add-post')}>
						Dodaj post
					</Button>
				</Container>
			</Navbar>
			<div className='img-group'>
				{posts.length > 0 ? (
					posts.map(post => (
						<UserPostCard
							key={post.id}
							id={post.id}
							title={post.title}
							author={post.user.username}
							content={post.content}
							comments={post.comments}
						/>
					))
				) : (
					<Alert variant='danger'>Brak postów</Alert>
				)}
			</div>
		</>
	);
};
export default PostCardGroup;
