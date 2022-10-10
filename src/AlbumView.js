import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotosByAlbum, setLoading } from './appSlice';
import ImgCardGroup from './ImgCardGroup';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';

const AlbumView = () => {
	const { id } = useParams();
	const [photos, setPhotos] = useState([]);
	const dispatch = useDispatch();
	const { isLoading, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchPhotosByAlbum(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPhotos(state.photos);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return <MainTemplate>{isLoading ? <Spinner /> : <ImgCardGroup photos={photos} userView={false} />}</MainTemplate>;
};

export default AlbumView;
