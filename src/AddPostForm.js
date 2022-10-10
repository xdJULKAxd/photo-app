import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addPost, fetchAllPost } from './appSlice';
import { useNavigate } from 'react-router-dom';
import MainTemplate from './MainTemplate';

const AddPostForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [tilte, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleChangeValueFn = e => {
		if (e.target.id === 'title') {
			setTitle(e.target.value);
		} else if (e.target.id === 'content') {
			setContent(e.target.value);
		}
	};

	const addPhotoFn = async e => {
		e.preventDefault();
		dispatch(
			addPost({
				tilte,
				content
			})
		);
		await dispatch(fetchAllPost());
		navigate('/posts');
	};

	return (
		<MainTemplate>
			<Form className=''>
				<Form.Group className='mb-3' controlId='title'>
					<Form.Label>Tytuł posta</Form.Label>
					<Form.Control type='text' placeholder='tilte' value={tilte} onChange={e => handleChangeValueFn(e)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='content'>
					<Form.Label>Treść</Form.Label>
					<Form.Control as='textarea' rows={3} value={content} onChange={e => handleChangeValueFn(e)} />
				</Form.Group>
				<Button variant='primary' type='submit' onClick={e => addPhotoFn(e)}>
					Dodaj post
				</Button>
			</Form>
		</MainTemplate>
	);
};

export default AddPostForm;
