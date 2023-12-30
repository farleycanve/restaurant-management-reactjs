import { Dialog, IconButton } from '@material-ui/core';
import PencilAltIcon from 'assets/icons/PencilAlt';
import React, { useState } from 'react';
import { Restaurant } from 'types/restaurant';
import RestaurantForm from '../RestaurantForm';

interface IEditRestaurantProps {
	restaurant: Restaurant;
}

const EditRestaurant: React.FunctionComponent<IEditRestaurantProps> = props => {
	const { restaurant } = props;
	const [openForm, setOpenForm] = useState(false);

	const handleCloseForm = () => {
		setOpenForm(false);
	};

	return (
		<>
			<IconButton onClick={() => setOpenForm(true)}>
				<PencilAltIcon fontSize="small" />
			</IconButton>

			<Dialog open={openForm} fullWidth maxWidth="lg" onClose={handleCloseForm}>
				<RestaurantForm restaurant={restaurant} onClose={handleCloseForm} />
			</Dialog>
		</>
	);
};

export default EditRestaurant;
