import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
	const user = useSelector(state => state.root.user);

	if (user === null) {
		return <Navigate to='/login' />;
	}
	return children;
};
