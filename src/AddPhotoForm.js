import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addPhoto, fetchAllPhotos } from './appSlice';
import { useNavigate } from 'react-router-dom';
import MainTemplate from './MainTemplate';

const AddPhotoForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [url, setUrl] = useState('');
	const [category, setCategory] = useState('');

	const handleChangeValueFn = e => {
		if (e.target.id === 'url') {
			setUrl(e.target.value);
		} else if (e.target.id === 'category') {
			setCategory(e.target.value);
		}
	};

	const addPhotoFn = async e => {
		e.preventDefault();
		dispatch(
			addPhoto({
				url,
				category
			})
		);
		await dispatch(fetchAllPhotos());
		navigate('/');
	};

	return (
		<MainTemplate>
			<Form className=''>
				<Form.Group className='mb-3' controlId='url'>
					<Form.Label>URL do zdjęcia</Form.Label>
					<Form.Control type='text' placeholder='URL' value={url} onChange={e => handleChangeValueFn(e)} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='category'>
					<Form.Label>Kategoria zdjęcia</Form.Label>
					<Form.Control type='text' placeholder='Kategoria' value={category} onChange={e => handleChangeValueFn(e)} />
				</Form.Group>
				<Button variant='primary' type='submit' onClick={e => addPhotoFn(e)}>
					Dodaj zdjęcie
				</Button>
			</Form>
		</MainTemplate>
	);
};

export default AddPhotoForm;
