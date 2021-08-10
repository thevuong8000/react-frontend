interface IGetMokeRequestOptions {
	type?: 'success' | 'failure';
	data?: any;
	howLong?: number;
}

/**
 * Get mock API request
 * @param IGetMokeRequestOptions
 * @returns mock request
 */
export const getMockRequest = ({
	type = 'success',
	data,
	howLong = 1000
}: IGetMokeRequestOptions) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (type === 'success') resolve(data);
			else reject(data);
		}, howLong);
	});
