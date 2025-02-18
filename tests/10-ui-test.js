import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
	scenarios: { ui: { executor: 'shared-iterations', options: { browser: { type: 'chromium' } } } }
};

export default async function () {
	const page = await browser.newPage();

	try {
		await page.goto('https://test.k6.io/my_messages.php');

		await check(page.locator('body > h2'), {
			loggedOutHeader: async (locator) => (await locator.textContent()) == 'Unauthorized'
		});

		await page.locator('input[name="login"]').type('admin');
		await page.locator('input[name="password"]').type('123');
		await page.locator('input[type=submit]').click();
		await page.waitForNavigation();

		await page.screenshot({ path: 'screenshots/1-authenticated.png' });

		await check(page.locator('h2'), {
			loggedInHeader: async (locator) => (await locator.textContent()) == 'Welcome, admin!'
		});
	} finally {
		await page.close();
	}
}
