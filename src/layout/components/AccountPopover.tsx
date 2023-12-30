import { Avatar, Box, Button, ButtonBase, Divider, Popover, Typography } from '@material-ui/core';
import slice from 'features/Authentication/slice';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { configToken } from 'utils/config';
import { authSelector } from 'utils/selectors';

const AccountPopover: FC = () => {
	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const auth = useSelector(authSelector);
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const dispatch = useDispatch();

	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	const handleLogout = async (): Promise<void> => {
		try {
			handleClose();
			dispatch(slice.actions.logout());
			await configToken.remove();
			navigate('/');
		} catch (err) {
			console.error(err);
			toast.error('Unable to logout.');
		}
	};

	return (
		<>
			<Box
				component={ButtonBase}
				onClick={handleOpen}
				ref={anchorRef}
				sx={{
					alignItems: 'center',
					display: 'flex',
				}}
			>
				<Avatar
					src={auth.user.avatar}
					sx={{
						height: 32,
						width: 32,
					}}
				/>
			</Box>
			<Popover
				anchorEl={anchorRef.current}
				anchorOrigin={{
					horizontal: 'center',
					vertical: 'bottom',
				}}
				keepMounted
				onClose={handleClose}
				open={open}
				PaperProps={{
					sx: { width: 240 },
				}}
			>
				<Box sx={{ p: 2 }}>
					<Typography color="textPrimary" variant="subtitle2">
						{auth.user.name}
					</Typography>
				</Box>
				<Divider />

				<Box sx={{ p: 2 }}>
					<Button color="primary" fullWidth onClick={handleLogout} variant="outlined">
						Logout
					</Button>
				</Box>
			</Popover>
		</>
	);
};

export default AccountPopover;
