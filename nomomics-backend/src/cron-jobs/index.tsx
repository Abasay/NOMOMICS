import cron from 'node-cron';

import axios from 'axios';

export async function startCronJobs() {
	cron.schedule('*/2 * * * *', async () => {
		try {
			const response = await axios.get(
				'https://nomomics.onrender.com'
			);
			console.log(`STATUS: ${response.status}`);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	});
}

startCronJobs();
