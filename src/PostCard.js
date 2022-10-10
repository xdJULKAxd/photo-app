import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addComments, fetchAllPost, deleteComment, deletePost } from './appSlice';

const PostCard = ({ id, title, content, author, comments }) => {
	const [isVisibleComments, setIsVisibleComments] = useState(false);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [commentContent, setCommentContent] = useState('');
	const dispatch = useDispatch();
	const user = useSelector(state => state.root.user);

	const addCommentFn = async e => {
		e.preventDefault();
		dispatch(
			addComments({
				postId: id,
				content: commentContent
			})
		);
		await dispatch(fetchAllPost());
	};

	const deleteCommentFn = async id => {
		dispatch(deleteComment(id));
		await dispatch(fetchAllPost());
	};

	const deletePostFn = async id => {
		dispatch(deletePost(id));
		await dispatch(fetchAllPost());
	};

	return (
		<>
			<Card style={{ margin: '10px', width: '100%' }}>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{content}</Card.Text>
					<Button variant='primary' onClick={() => setIsVisibleComments(!isVisibleComments)} className='text-center'>
						Komenatrze
					</Button>
				</Card.Body>
				{isVisibleComments ? (
					<div className='d-grid gap-2'>
						<ListGroup variant='flush'>
							{comments.length > 0 ? (
								comments.map(comment => (
									<>
										<ListGroup.Item
											variant='dark'
											key={comment.id}
											style={{ display: 'flex', flexDirection: 'column' }}>
											<span className='comment-author'>{comment.author}</span>
											{comment.content}
											{comment.author === user.username ? (
												<Button variant='danger' onClick={() => deleteCommentFn(comment.id)}>
													Usuń komenatrz
												</Button>
											) : null}
										</ListGroup.Item>
									</>
								))
							) : (
								<Alert variant='danger'>Brak komenatrzy</Alert>
							)}
						</ListGroup>
						<Button variant='info' onClick={() => setIsVisibleModal(true)}>
							Dodaj komenatrz
						</Button>
					</div>
				) : null}

				<Card.Footer style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
					Autor posta: {author}
					{author === user.username ? (
						<Button variant='danger' onClick={() => deletePostFn(id)}>
							Usuń post
						</Button>
					) : null}
				</Card.Footer>
			</Card>

			<Modal
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={isVisibleModal}
				onHide={() => setIsVisibleModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Dodawanie komenatrza do postu: {title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className='mb-3' controlId='content'>
						<Form.Label>Treść</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							value={commentContent}
							onChange={e => setCommentContent(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={e => addCommentFn(e)}>Dodaj</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PostCard;
