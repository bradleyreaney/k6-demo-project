import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
	stages: [
		{ duration: '30s', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
		{ duration: '8h', target: 100 }, // stay at 100 users for 8 hours!!!
		{ duration: '30s', target: 0 } // ramp-down to 0 users
	],
	thresholds: { http_req_duration: ['p(95)<2000'], http_req_failed: ['rate<0.90'] }
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
