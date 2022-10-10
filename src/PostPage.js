import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, fetchAllPost } from './appSlice';
import MainTemplate from './MainTemplate';
import Spinner from 'react-bootstrap/Spinner';
import PostCardGroup from './PostCardGroup';

const PostPage = () => {
	const [posts, setPosts] = useState([]);
	const dispatch = useDispatch();
	const { isLoading, ...state } = useSelector(state => state.root);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(fetchAllPost());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPosts(state.posts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return <MainTemplate>{isLoading ? <Spinner /> : <PostCardGroup posts={posts} />}</MainTemplate>;
};

export default PostPage;
