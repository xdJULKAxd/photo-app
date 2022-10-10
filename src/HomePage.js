import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPhotos, setLoading, fetchPhotoById, fetchPhotosByAlbum } from './appSlice';
import ImgCardGroup from './ImgCardGroup';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';
const HomePage = () => {
	const [photos, setPhotos] = useState([]);
	const [searchPhotoId, setSearchPhotoId] = useState('');
	const [searchAlbumId, setSearchAlbumId] = useState('');
	const dispatch = useDispatch();
	const { isLoading, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchAllPhotos());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPhotos(state.photos);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		if (searchPhotoId) {
			dispatch(setLoading());
			dispatch(fetchPhotoById(searchPhotoId));
		}
		if (searchAlbumId) {
			dispatch(setLoading());
			dispatch(fetchPhotosByAlbum(searchAlbumId));
		}
	}, [searchAlbumId, searchPhotoId, dispatch]);

	const helpFn = e => {
		if (e.target.id === 'photoId') {
			setSearchPhotoId(e.target.value);
			setSearchAlbumId('');
		} else if (e.target.id === 'albumId') {
			setSearchPhotoId('');
			setSearchAlbumId(e.target.value);
		}
	};

	return (
		<MainTemplate>
			{isLoading ? (
				<Spinner />
			) : (
				<ImgCardGroup photos={photos} searchPhotoId={searchPhotoId} searchAlbumId={searchAlbumId} helpFn={helpFn} />
			)}
		</MainTemplate>
	);
};

export default HomePage;
