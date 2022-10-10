import LoginForm from './LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import HomePage from './HomePage';
import AlbumPage from './AlbumPage';
import './index.css';
import AddPhotoForm from './AddPhotoForm';
import AlbumView from './AlbumView';
import UsersView from './UsersView';
import PostPage from './PostPage';
import AddPostForm from './AddPostForm';
import UserPhotosPage from './UserPhotosPage';
import UserPostsPage from './UserPostsPage';
import UserInfoPage from './UserInfoPage';

const App = () => {
	return (
		<div className='container'>
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<LoginForm />} />
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/albums'
						element={
							<ProtectedRoute>
								<AlbumPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/add-photo'
						element={
							<ProtectedRoute>
								<AddPhotoForm />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/albums/:id'
						element={
							<ProtectedRoute>
								<AlbumView />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/users/:username'
						element={
							<ProtectedRoute>
								<UsersView />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/posts'
						element={
							<ProtectedRoute>
								<PostPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/add-post'
						element={
							<ProtectedRoute>
								<AddPostForm />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/user/photos'
						element={
							<ProtectedRoute>
								<UserPhotosPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/user/posts'
						element={
							<ProtectedRoute>
								<UserPostsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/user/info'
						element={
							<ProtectedRoute>
								<UserInfoPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
