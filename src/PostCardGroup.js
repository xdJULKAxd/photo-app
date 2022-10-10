import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

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
				{posts.map(post => (
					<PostCard
						key={post.id}
						id={post.id}
						title={post.title}
						author={post.user.username}
						content={post.content}
						comments={post.comments}
					/>
				))}
			</div>
		</>
	);
};
export default PostCardGroup;
