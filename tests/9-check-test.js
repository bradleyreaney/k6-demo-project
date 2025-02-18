import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
	stages: [
		{ duration: '10s', target: 15 }, // 10% of total run time
		{ duration: '15s', target: 15 },
		{ duration: '10s', target: 0 } // 10% of total run time
	],
	thresholds: { checks: ['rate>=0.98'] }
};

export default function () {
	group('Main page', () => {
		let res = http.get('https://test-api.k6.io/');
		check(res, {
			'status is 200': (r) => r.status === 200,
			'page contains the correct text': (r) =>
				r.body.includes('Collection of simple web-pages suitable for load testing.')
		});
		sleep(1);

		group('Assets', () => {
			res = http.get('https://test-api.k6.io/static/css/site.css');
			check(res, { 'status is 200': (r) => r.status === 200 });
			sleep(1);

			res = http.get('https://test-api.k6.io/static/js/prisms.js');
			check(res, { 'status is 200': (r) => r.status === 200 });
			sleep(1);

			res = http.get('https://test-api.k6.io/static/favicon.ico');
			check(res, { 'status is 200': (r) => r.status === 200 });
			sleep(1);
		});
	});
}
