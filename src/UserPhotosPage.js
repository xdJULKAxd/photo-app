import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoByUser, setLoading } from './appSlice';
import UserImgCardGroup from './UserImgCardGroup';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';

const UserPhotosPage = () => {
	const [album, setAlbum] = useState({ photos: [] });
	const dispatch = useDispatch();
	const { isLoading, user, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchPhotoByUser(user.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setAlbum(state.album);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return <MainTemplate>{isLoading ? <Spinner /> : <UserImgCardGroup album={album} />}</MainTemplate>;
};

export default UserPhotosPage;
