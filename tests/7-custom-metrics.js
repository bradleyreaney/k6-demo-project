import http from 'k6/http';
import { sleep, group } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
	stages: [
		{ duration: '10s', target: 15 },
		{ duration: '15s', target: 15 },
		{ duration: '10s', target: 0 }
	],
	thresholds: {
		'group_duration{group:::Main page}': ['p(95)<7000'],
		main_counter: ['count>50'],
		assets_response_time: ['p(95)<3000', 'p(99)<150']
	}
};

let mainCounter = new Counter('main_counter');
let assetsResponseTrend = new Trend('assets_response_time');

export default function () {
	group('Main page', () => {
		http.get('https://test-api.k6.io/');
		mainCounter.add(1);
		sleep(1);

		group('Assets', () => {
			let res = http.get('https://test-api.k6.io/static/css/site.css');
			assetsResponseTrend.add(res.timings.duration);
			sleep(1);

			res = http.get('https://test-api.k6.io/static/js/prisms.js');
			assetsResponseTrend.add(res.timings.duration);
			sleep(1);

			res = http.get('https://test-api.k6.io/static/favicon.ico');
			assetsResponseTrend.add(res.timings.duration);
			sleep(1);
		});
	});
}
