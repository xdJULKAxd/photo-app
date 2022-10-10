import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPhotos = createAsyncThunk('photos/fetchAllPhotos', async thunkAPI => {
	try {
		const response = await axios.get('http://localhost:3001/photos?_expand=album');
		return response.data;
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const fetchPhotoById = createAsyncThunk('photos/fetchPhotoById', async (id, thunkAPI) => {
	try {
		if (id) {
			const response = await axios.get(`http://localhost:3001/photos?id=${id}&_expand=album`);
			console.log(response.data);
			return response.data;
		}
	} catch (err) {
		return isRejectedWithValue('error');
	}
});

export const fetchPhotoByUser = createAsyncThunk('photos/fetchPhotoByUser', async (id, thunkAPI) => {
	try {
		if (id) {
			const response = await axios.get(`http://localhost:3001/albums?userId=${id}&_embed=photos`);
			return response.data;
		}
	} catch (err) {
		return isRejectedWithValue('error');
	}
});

export const fetchPhotosByAlbum = createAsyncThunk('photos/fetchPhotosByAlbum', async (id, thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3001/photos?albumId=${id}&_expand=album`);
		return response.data;
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const fetchAllAlbums = createAsyncThunk('albums/fetchAllAlbums', async thunkAPI => {
	try {
		const response = await axios.get('http://localhost:3001/albums');
		return response.data;
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});
export const signIn = createAsyncThunk('users/login', async (username, thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3001/users?username=${username}`);
		if (response.data.length > 0) {
			return response.data[0];
		} else {
			const addUserResponse = await axios.post('http://localhost:3001/users', {
				username: username,
				name: ''
			});

			//tworzymy nowy album
			await axios.post('http://localhost:3001/albums', {
				author: addUserResponse.data.username,
				userId: addUserResponse.data.id
			});

			const user = await axios.get(`http://localhost:3001/users?username=${username}`);
			return user.data[0];
		}
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});
export const editUserData = createAsyncThunk('users/editUserData', async (user, thunkAPI) => {
	try {
		const response = await axios.put(`http://localhost:3001/users/${user.id}`, user);
		return response.data;
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});
export const fetchUsersByName = createAsyncThunk('users/fetchUsersByName', async (searchPhrase, thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3001/users?username_like=${searchPhrase}`);
		return response.data;
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const addPhoto = createAsyncThunk('photos/addPhoto', async (photo, thunkAPI) => {
	try {
		const state = thunkAPI.getState();
		const username = state.root.user.username;
		// pobieramy album uzytkownika
		const response = await axios.get(`http://localhost:3001/albums?author=${username}`);

		const album = response.data[0];
		const newPhoto = { ...photo, albumId: album.id };

		//tworzymy nowy album
		await axios.post('http://localhost:3001/photos', newPhoto);
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const addComments = createAsyncThunk('comments/addComments', async (comments, thunkAPI) => {
	try {
		const state = thunkAPI.getState();
		const username = state.root.user.username;

		const newComments = { ...comments, author: username };

		const response = await axios.post('http://localhost:3001/comments', newComments);
		return response.data;
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id, thunkAPI) => {
	try {
		await axios.delete(`http://localhost:3001/comments/${id}`);
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {
	try {
		await axios.delete(`http://localhost:3001/posts/${id}`);
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const deletePhoto = createAsyncThunk('photos/deletePhoto', async (id, thunkAPI) => {
	try {
		await axios.delete(`http://localhost:3001/photos/${id}`);
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const addPost = createAsyncThunk('posts/addPost', async (post, thunkAPI) => {
	try {
		const state = thunkAPI.getState();
		const id = state.root.user.id;
		const newPost = { ...post, userId: id };

		await axios.post('http://localhost:3001/posts', newPost);
	} catch (err) {
		console.log(err);
		return isRejectedWithValue('error');
	}
});

export const fetchAllPost = createAsyncThunk('posts/fetchAllPost', async (id, thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3001/posts?_expand=user&_embed=comments`);
		return response.data;
	} catch (err) {
		return isRejectedWithValue('error');
	}
});

export const fetchAllPostByUser = createAsyncThunk('posts/fetchAllPostByUser', async (id, thunkAPI) => {
	try {
		const response = await axios.get(`http://localhost:3001/posts?userId=${id}&_embed=comments&_expand=user`);
		return response.data;
	} catch (err) {
		return isRejectedWithValue('error');
	}
});

const initialState = {
	isLoading: true,
	user: null,
	photos: [],
	albums: [],
	users: [],
	posts: [],
	album: { photos: [] }
};

export const appSlice = createSlice({
	name: 'rootReducer',
	initialState,
	reducers: {
		logout: state => {
			return initialState;
		},
		setLoading: state => {
			state.isLoading = true;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchAllPhotos.fulfilled, (state, action) => {
			state.photos = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchPhotoByUser.fulfilled, (state, action) => {
			state.album = action.payload[0];
			state.isLoading = false;
		});

		builder.addCase(signIn.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(fetchAllAlbums.fulfilled, (state, action) => {
			state.albums = action.payload;
			state.isLoading = false;
		});
		builder.addCase(addPhoto.fulfilled, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addPost.fulfilled, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(addComments.fulfilled, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPhotosByAlbum.fulfilled, (state, action) => {
			state.photos = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchUsersByName.fulfilled, (state, action) => {
			state.users = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchPhotoById.fulfilled, (state, action) => {
			state.photos = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchAllPost.fulfilled, (state, action) => {
			state.posts = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchAllPostByUser.fulfilled, (state, action) => {
			state.posts = action.payload;
			state.isLoading = false;
		});
		builder.addCase(deleteComment.fulfilled, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deletePhoto.fulfilled, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(deletePost.fulfilled, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(editUserData.fulfilled, (state, action) => {
			state.isLoading = true;
		});
	}
});

export const { logout, setLoading } = appSlice.actions;

export default appSlice.reducer;
