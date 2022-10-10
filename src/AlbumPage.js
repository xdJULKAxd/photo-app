import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAlbums, setLoading } from './appSlice';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';
import AlbumCardGroup from './AlbumCardGroup';

const AlbumPage = () => {
	const [albums, setAlbums] = useState([]);
	const dispatch = useDispatch();
	const { isLoading, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchAllAlbums());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setAlbums(state.albums);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return <MainTemplate>{isLoading ? <Spinner /> : <AlbumCardGroup albums={albums} />}</MainTemplate>;
};

export default AlbumPage;
