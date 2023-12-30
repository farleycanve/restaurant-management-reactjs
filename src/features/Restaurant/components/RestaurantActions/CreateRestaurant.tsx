import React, { useState } from 'react';
import PlusIcon from 'assets/icons/Plus';
import { Button, Dialog } from '@material-ui/core';
import RestaurantForm from '../RestaurantForm';

interface ICreateRestaurantProps {}

const CreateRestaurant: React.FunctionComponent<ICreateRestaurantProps> = props => {
	const [openForm, setOpenForm] = useState(false);

	const handleCloseForm = () => {
		setOpenForm(false);
	};

	return (
		<>
			<Button startIcon={<PlusIcon />} color="primary" onClick={() => setOpenForm(true)}>
				Create restaurant
			</Button>
			<Dialog open={openForm} fullWidth maxWidth="lg" onClose={handleCloseForm}>
				<RestaurantForm restaurant={null} onClose={handleCloseForm} />
			</Dialog>
		</>
	);
};

export default CreateRestaurant;
