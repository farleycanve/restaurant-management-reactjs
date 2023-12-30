import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import TrashIcon from 'assets/icons/Trash';
import ConfirmModal from 'components/ConfirmModal';
import { useDispatch } from 'store';
import toast from 'react-hot-toast';
import { deleteRestaurant } from 'slices/restaurant';
import { Restaurant } from 'types/restaurant';

interface IDeleteRestaurantProps {
	restaurant: Restaurant;
}

const DeleteRestaurant: React.FunctionComponent<IDeleteRestaurantProps> = props => {
	const { restaurant } = props;

	const dispatch = useDispatch();
	const [openConfirm, setOpenConfirm] = useState(false);

	const handleDeleteRestaurant = async (): Promise<void> => {
		setOpenConfirm(false);
		try {
			await dispatch(deleteRestaurant(restaurant.id));
			toast.success('Delete restaurant successfully');
		} catch (error) {
			if (error.statusCode === 403) {
				toast.error('You do not have permission.');
			} else {
				toast.error(`Error: ${error.message}`);
			}
		}
	};

	return (
		<>
			<IconButton onClick={() => setOpenConfirm(true)}>
				<TrashIcon fontSize="small" />
			</IconButton>
			<ConfirmModal
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
				onConfirm={handleDeleteRestaurant}
				title="Warning"
				content="Are you sure that you want to delete this restaurant?"
			/>
		</>
	);
};

export default DeleteRestaurant;
