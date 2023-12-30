import axiosClient from 'lib/axios';

const restaurantAPI = {
	create: (request: any) => {
		return axiosClient.post(`/restaurants`, request);
	},
	update: (id: string, request: any) => {
		return axiosClient.patch(`/restaurants/${id}`, request);
	},
	delete: (id: string) => {
		return axiosClient.delete(`/restaurants/${id}`);
	},

	getAll: (page: number = 1, limit: number = 10, filter?) => {
		return axiosClient.get(`/restaurants`, {
			params: { page: page, limit: limit, ...filter },
		});
	},
};

export { restaurantAPI };
