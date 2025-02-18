import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = { vus: 2, duration: '10s', cloud: { projectID: /*ADD ME*/ } };

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
