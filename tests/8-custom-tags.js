import http from 'k6/http';
import { sleep, group } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
	stages: [
		{ duration: '10s', target: 15 },
		{ duration: '15s', target: 15 },
		{ duration: '10s', target: 0 }
	],
	thresholds: {
		'http_req_duration{page:main}': ['p(95)<5000'],
		'http_errors{page:assets}': ['count==0']
	}
};

let httpErrors = new Counter('http_errors');

export default function () {
	group('Main page', () => {
		let res = http.get('https://test-api.k6.io/', { tags: { page: 'main' } });
		sleep(1);

		group('Assets', () => {
			res = http.get('https://test-api.k6.io/static/css/site.css');
			if (res.error) {
				httpErrors.add(1, { page: assets });
			}
			sleep(1);

			res = http.get('https://test-api.k6.io/static/js/prisms.js');
			if (res.error) {
				httpErrors.add(1, { page: assets });
			}
			sleep(1);

			res = http.get('https://test-api.k6.io/static/favicon.ico');
			if (res.error) {
				httpErrors.add(1, { page: 'assets' });
			}
			sleep(1);
		});
	});
}
