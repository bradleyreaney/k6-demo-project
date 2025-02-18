import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
	stages: [
		{ duration: '10s', target: 15 }, // 10% of total run time
		{ duration: '15s', target: 15 },
		{ duration: '10s', target: 0 } // 10% of total run time
	],
	thresholds: {
		'group_duration{group:::Main page}': ['p(95)<5000'],
		'group_duration{group:::Main page::Assets}': ['p(95)<3000']
	}
};

export default function () {
	group('Main page', () => {
		http.get('https://test-api.k6.io/');
		sleep(1);

		group('Assets', () => {
			http.get('https://test-api.k6.io/static/css/site.css');
			sleep(1);

			http.get('https://test-api.k6.io/static/js/prisms.js');
			sleep(1);

			http.get('https://test-api.k6.io/static/favicon.ico');
			sleep(1);
		});
	});
}
