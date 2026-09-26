import { expect, test, type Page, type TestInfo } from '@playwright/test';

const runtimeErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
	const errors: string[] = [];
	runtimeErrors.set(page, errors);
	page.on('pageerror', (error) => errors.push(error.message));
});

test.afterEach(async ({ page }) => {
	expect(runtimeErrors.get(page), 'The page should not raise JavaScript errors').toEqual([]);
});

async function visit(page: Page, route: string) {
	const response = await page.goto(route);
	expect(response?.ok(), `${route} should load successfully`).toBeTruthy();
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

async function loadVisibleImages(page: Page) {
	const images = page.locator('img');
	for (let index = 0; index < (await images.count()); index += 1) {
		const image = images.nth(index);
		// Collapsed screenshot galleries intentionally defer their images until opened.
		if (!(await image.isVisible())) continue;
		await image.scrollIntoViewIfNeeded();
		await expect
			.poll(
				() =>
					image.evaluate(
						(element: HTMLImageElement) => element.complete && element.naturalWidth > 0
					),
				{ message: `Image should load: ${await image.getAttribute('alt')}` }
			)
			.toBe(true);
	}
}

async function capture(page: Page, testInfo: TestInfo, name: string, fullPage = false) {
	await page.screenshot({
		path: testInfo.outputPath(name),
		fullPage,
		animations: 'disabled'
	});
}

test('current research is visible and earlier research can be expanded and collapsed', async ({
	page
}) => {
	await visit(page, '/');
	const section = page.getByRole('region', { name: 'Research', exact: true });
	await expect(section.getByText('Xlabs', { exact: true })).toBeVisible();
	await expect(
		section.getByText('ModLab, University of Pennsylvania', { exact: true })
	).toBeVisible();
	await expect(
		section.getByRole('heading', { name: 'Image Editing Policy Research', exact: true })
	).toBeVisible();
	await expect(section.getByRole('heading', { name: /^HAMR:/ })).toBeVisible();
	await expect(
		section.getByRole('heading', { name: 'Generative World Models', exact: true })
	).toBeVisible();
	const earlierResearch = section.getByRole('heading', {
		name: 'Topic Modeling and Analysis',
		exact: true
	});
	await expect(earlierResearch).toHaveCount(0);

	const expand = section.getByRole('button', { name: 'Show earlier research', exact: true });
	await expect(expand).toHaveAttribute('aria-expanded', 'false');
	await expand.click();
	await expect(earlierResearch).toBeVisible();
	await expect(
		section.getByRole('heading', { name: 'Machine Learning for PFAS Contamination', exact: true })
	).toBeVisible();
	const collapse = section.getByRole('button', { name: 'Show less research', exact: true });
	await expect(collapse).toHaveAttribute('aria-expanded', 'true');
	await collapse.click();
	await expect(earlierResearch).toHaveCount(0);
	await expect(expand).toHaveAttribute('aria-expanded', 'false');
});

test('experience history can be expanded and collapsed', async ({ page }) => {
	await visit(page, '/');
	const section = page.getByRole('region', { name: 'Experience', exact: true });
	await expect(
		section.getByRole('heading', { name: 'Robotics Intern', exact: true })
	).toBeVisible();
	await expect(
		section.getByRole('heading', { name: 'Software Engineer Intern', exact: true })
	).toBeVisible();
	const earlierExperience = section.getByText('County of Marin', { exact: true });
	await expect(earlierExperience).toHaveCount(0);

	const expand = section.getByRole('button', { name: 'Show earlier experience', exact: true });
	await expect(expand).toHaveAttribute('aria-expanded', 'false');
	await expand.click();
	await expect(earlierExperience).toBeVisible();
	const collapse = section.getByRole('button', { name: 'Show less experience', exact: true });
	await expect(collapse).toHaveAttribute('aria-expanded', 'true');
	await collapse.click();
	await expect(earlierExperience).toHaveCount(0);
	await expect(expand).toHaveAttribute('aria-expanded', 'false');
});

test('section links preserve hashes and identify the active section', async ({ page }) => {
	await visit(page, '/');
	const navigation = page.getByRole('navigation', { name: 'Page sections', exact: true });
	for (const section of ['Research', 'Experience', 'Projects', 'About']) {
		const link = navigation.getByRole('link', { name: section, exact: true });
		await link.click();
		await expect(page).toHaveURL(new RegExp(`#${section.toLowerCase()}$`));
		await expect(link).toHaveAttribute('aria-current', 'location');
		await expect(navigation.locator('[aria-current="location"]')).toHaveCount(1);
	}
});

test('visitors can navigate from HAMR through the project archive and back home', async ({
	page
}) => {
	await visit(page, '/');
	await page
		.getByRole('region', { name: 'Selected projects', exact: true })
		.getByRole('link', { name: 'HAMR', exact: true })
		.click();
	await expect(page).toHaveURL(/\/projects\/hamr\/?$/);
	await expect(page.getByRole('heading', { level: 1, name: /HAMR/ })).toBeVisible();

	await page
		.getByRole('navigation', { name: 'Project navigation', exact: true })
		.getByRole('link', { name: 'All projects', exact: true })
		.click();
	await expect(page).toHaveURL(/\/projects\/?$/);
	await page.getByRole('link', { name: 'F1-3DGS', exact: true }).click();
	await expect(page).toHaveURL(/\/projects\/f1-3dgs\/?$/);
	await expect(page.getByRole('heading', { level: 1, name: /F1-3DGS/ })).toBeVisible();

	await page
		.getByRole('navigation', { name: 'Explore another project', exact: true })
		.getByRole('link', { name: /HAMR/ })
		.click();
	await expect(page).toHaveURL(/\/projects\/hamr\/?$/);
	await expect(page.getByRole('heading', { level: 1, name: /HAMR/ })).toBeVisible();

	await page
		.getByRole('navigation', { name: 'Project navigation', exact: true })
		.getByRole('link', { name: /Back to portfolio/ })
		.click();
	await expect(page).toHaveURL(/\/#projects$/);
	await expect(page.getByRole('heading', { level: 1, name: 'Kai Yu', exact: true })).toBeVisible();
});

test('the archive preserves every project and screenshot galleries support the keyboard', async ({
	page
}) => {
	await visit(page, '/projects');
	const names = [
		'HAMR',
		'F1-3DGS',
		'RoboRocky',
		'Deepfake Audio Classifier',
		'UNet3+ Settlement Detection',
		'Minecraft in C++',
		'Cysafe'
	];
	for (const name of names) {
		await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
	}
	const cards = page.getByRole('article');
	await expect(cards).toHaveCount(names.length);
	const rocky = cards.filter({
		has: page.getByRole('heading', { name: 'RoboRocky', exact: true })
	});
	const summary = rocky.locator('summary');
	const screenshot = rocky.getByRole('img', { name: 'RoboRocky screenshot 1', exact: true });
	await expect(screenshot).toBeHidden();
	await summary.focus();
	await page.keyboard.press('Enter');
	await expect(screenshot).toBeVisible();
	await screenshot.scrollIntoViewIfNeeded();
	await expect
		.poll(() =>
			screenshot.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
		)
		.toBe(true);
	await expect(
		rocky.getByRole('link', { name: 'Open RoboRocky screenshot 1', exact: true })
	).toHaveAttribute('href', /\.(png|jpe?g|webp|gif)(\?|$)/i);
	await summary.focus();
	await page.keyboard.press('Enter');
	await expect(screenshot).toBeHidden();
});

const viewports = [
	{ name: 'desktop', width: 1440, height: 1000 },
	{ name: 'mobile', width: 390, height: 844 }
];

for (const viewport of viewports) {
	test.describe(`${viewport.name} layout`, () => {
		test.use({ viewport: { width: viewport.width, height: viewport.height } });

		for (const route of ['/', '/projects', '/projects/hamr', '/projects/f1-3dgs']) {
			test(`${route} fits the viewport and loads its images`, async ({ page }, testInfo) => {
				await visit(page, route);
				await loadVisibleImages(page);
				const dimensions = await page.evaluate(() => ({
					viewport: document.documentElement.clientWidth,
					document: document.documentElement.scrollWidth,
					body: document.body.scrollWidth
				}));
				expect(
					dimensions.document,
					'Document should not overflow horizontally'
				).toBeLessThanOrEqual(dimensions.viewport + 1);
				expect(dimensions.body, 'Body should not overflow horizontally').toBeLessThanOrEqual(
					dimensions.viewport + 1
				);

				await page.evaluate(() =>
					window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
				);
				await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
				if (route === '/') {
					await capture(page, testInfo, `home-top-${viewport.name}.png`);
					await page.getByRole('region', { name: 'Selected projects', exact: true }).screenshot({
						path: testInfo.outputPath(`home-projects-${viewport.name}.png`),
						animations: 'disabled'
					});
				} else if (route === '/projects/hamr') {
					await capture(page, testInfo, `hamr-detail-${viewport.name}.png`, true);
				} else if (route === '/projects/f1-3dgs') {
					await capture(page, testInfo, `f1-3dgs-detail-${viewport.name}.png`, true);
				} else {
					await capture(page, testInfo, `archive-${viewport.name}.png`);
				}
			});
		}
	});
}
