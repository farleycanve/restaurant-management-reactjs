import axiosClient from 'lib/axios';

const prefixUrl = 'auth';

const authApi = {
	/* Login */
	login: (username: string, password: string) => {
		return axiosClient.post(`${prefixUrl}/login`, {
			username: username,
			password: password,
			role: 'Owner',
		});
	},

	/* Get Profile */
	profile: () => {
		return axiosClient.get(`${prefixUrl}/self`);
	},

	// /* Register */
	// register: (username: string, password: string, firstName: string = '', lastName: string = '') => {
	// 	return axiosClient.post(`${prefixUrl}/register`, {
	// 		username: username,
	// 		password: password,
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 	});
	// },
};

export default authApi;
