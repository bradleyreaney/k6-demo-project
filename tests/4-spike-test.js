import http from 'k6/http';
import { sleep, group } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
	stages: [
		{ duration: '15s', target: 10 }, // Normal load
		{ duration: '45s', target: 200 }, // Sudden spike of traffic
		{ duration: '5s', target: 0 } // Sudden drop off
	],
	thresholds: { http_req_duration: ['p(95)<1500'], http_req_failed: ['rate<0.95'] }
};

export default function () {
	group('Main page', () => {
		http.get('https://test-api.k6.io/');
		sleep(randomIntBetween(1, 5)); // Random intervals between calls

		group('Assets', () => {
			http.get('https://test-api.k6.io/static/css/site.css');
			sleep(randomIntBetween(1, 5));

			http.get('https://test-api.k6.io/static/js/prisms.js');
			sleep(randomIntBetween(1, 5));

			http.get('https://test-api.k6.io/static/favicon.ico');
			sleep(randomIntBetween(1, 5));
		});
	});
}
