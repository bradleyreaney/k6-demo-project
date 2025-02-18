import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
	stages: [
		{ duration: '2h', target: 10000 } // Give it everything
	]
};

export default function () {
	http.get('https://test-api.k6.io/');
	sleep(1);
}
