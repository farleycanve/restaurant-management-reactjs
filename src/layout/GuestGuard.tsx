import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'store';
import { authSelector } from 'utils/selectors';

interface GuestGuardProps {
	children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
	const { isAuthenticated } = useSelector(authSelector);

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

GuestGuard.propTypes = {
	children: PropTypes.node,
};

export default GuestGuard;
