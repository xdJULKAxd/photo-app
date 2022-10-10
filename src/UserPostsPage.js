import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, fetchAllPostByUser } from './appSlice';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';
import UserPostCardGroup from './UserPostCardGroup';

const UserPostsPage = () => {
	const [posts, setPosts] = useState([]);
	const dispatch = useDispatch();
	const { isLoading, user, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchAllPostByUser(user.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPosts(state.posts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return <MainTemplate>{isLoading ? <Spinner /> : <UserPostCardGroup posts={posts} />}</MainTemplate>;
};

export default UserPostsPage;
