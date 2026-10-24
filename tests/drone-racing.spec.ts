import { expect, test, type Locator, type Page } from '@playwright/test';

const runtimeErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
	const errors: string[] = [];
	runtimeErrors.set(page, errors);
	page.on('pageerror', (error) => errors.push(error.message));
	await page.addInitScript(() => localStorage.setItem('kai-portfolio-theme', 'dark'));
});

test.afterEach(async ({ page }) => {
	expect(runtimeErrors.get(page), 'The showcase should not raise JavaScript errors').toEqual([]);
});

async function playClip(video: Locator, expectedSource: string) {
	await expect(video).toHaveAttribute('src', expectedSource);
	await video.scrollIntoViewIfNeeded();
	await video.evaluate(async (element: HTMLVideoElement) => {
		element.muted = true;
		await element.play();
	});
	await expect
		.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime), {
			message: `${expectedSource} should decode and advance during playback`,
			timeout: 15_000
		})
		.toBeGreaterThan(0.15);
	const state = await video.evaluate((element: HTMLVideoElement) => ({
		width: element.videoWidth,
		height: element.videoHeight,
		duration: element.duration,
		error: element.error?.message ?? null
	}));
	expect(state.width).toBeGreaterThan(0);
	expect(state.height).toBeGreaterThan(0);
	expect(Number.isFinite(state.duration) && state.duration > 0).toBe(true);
	expect(state.error).toBeNull();
}

async function expectNoOverflow(page: Page) {
	const size = await page.evaluate(() => ({
		viewport: document.documentElement.clientWidth,
		document: document.documentElement.scrollWidth,
		body: document.body.scrollWidth
	}));
	expect(size.document, 'The document should fit the viewport').toBeLessThanOrEqual(
		size.viewport + 1
	);
	expect(size.body, 'The body should fit the viewport').toBeLessThanOrEqual(size.viewport + 1);
}

test('the featured project opens a complete showcase and all five flight clips play on demand', async ({
	page
}) => {
	test.setTimeout(90_000);
	const mediaRequests: string[] = [];
	page.on('request', (request) => {
		const pathname = new URL(request.url()).pathname;
		if (pathname.startsWith('/media/drone-racing/') && pathname.endsWith('.mp4')) {
			mediaRequests.push(pathname);
		}
	});

	await page.goto('/');
	await page
		.getByRole('region', { name: 'Selected projects', exact: true })
		.getByRole('link', { name: 'Drone Racing', exact: true })
		.click();
	await expect(page).toHaveURL(/\/projects\/drone-racing\/?$/);
	await expect(
		page.getByRole('heading', { level: 1, name: 'Drone Racing', exact: true })
	).toBeVisible();
	const repositoryLink = page.getByRole('link', { name: 'View on GitHub', exact: true });
	await expect(repositoryLink).toBeVisible();
	await expect(repositoryLink).toHaveAttribute(
		'href',
		'https://github.com/kaifanyu/PPO-Drone-Racing'
	);
	await expect(repositoryLink).toHaveAttribute('target', '_blank');
	await expect(repositoryLink).toHaveAttribute('rel', 'noopener noreferrer');
	await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeEnabled();
	await page.waitForLoadState('networkidle');
	await expect(page.locator('video')).toHaveCount(3);
	expect(mediaRequests, 'Opening the story should not download the flight videos').toEqual([]);
	for (const video of await page.locator('video').all()) {
		expect(
			await video.evaluate((element: HTMLVideoElement) => ({
				autoplay: element.autoplay,
				preload: element.preload,
				paused: element.paused,
				currentTime: element.currentTime,
				muted: element.muted,
				controls: element.controls,
				playsInline: element.playsInline
			}))
		).toEqual({
			autoplay: false,
			preload: 'none',
			paused: true,
			currentTime: 0,
			muted: true,
			controls: true,
			playsInline: true
		});
	}

	for (const version of [1, 2]) {
		const figure = page.getByRole('figure', { name: new RegExp(`^Version ${version}`) });
		const video = figure.locator('video');
		const main = figure.getByRole('button', { name: 'Main angle', exact: true });
		const alternate = figure.getByRole('button', { name: 'Alternate angle', exact: true });
		const mainSource = `/media/drone-racing/version-${version}.mp4`;
		const alternateSource = `/media/drone-racing/version-${version}-alt.mp4`;
		await expect(main).toHaveAttribute('aria-pressed', 'true');
		await expect(alternate).toHaveAttribute('aria-pressed', 'false');
		await playClip(video, mainSource);

		const previousMain = await video.elementHandle();
		await alternate.click();
		await expect(alternate).toHaveAttribute('aria-pressed', 'true');
		await expect(main).toHaveAttribute('aria-pressed', 'false');
		expect(await previousMain!.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
		await previousMain!.dispose();
		await expect(video).toHaveJSProperty('paused', true);
		await expect(video).toHaveJSProperty('currentTime', 0);
		await playClip(video, alternateSource);

		const previousAlternate = await video.elementHandle();
		await main.click();
		await expect(video).toHaveAttribute('src', mainSource);
		await expect(main).toHaveAttribute('aria-pressed', 'true');
		await expect(alternate).toHaveAttribute('aria-pressed', 'false');
		expect(await previousAlternate!.evaluate((element: HTMLVideoElement) => element.paused)).toBe(
			true
		);
		await previousAlternate!.dispose();
		await expect(video).toHaveJSProperty('paused', true);
		await expect(video).toHaveJSProperty('currentTime', 0);
	}

	const realFlight = page
		.getByRole('figure', { name: 'Real-world flight', exact: true })
		.locator('video');
	await playClip(realFlight, '/media/drone-racing/real-flight.mp4');
	await realFlight.evaluate((element: HTMLVideoElement) => element.pause());
	expect(new Set(mediaRequests).size, 'All five local clips should be requested by playback').toBe(
		5
	);
});

test('the story supports keyboard disclosures and both themes at desktop and narrow mobile widths', async ({
	page
}, testInfo) => {
	test.setTimeout(90_000);
	await page.goto('/projects/drone-racing');
	await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeEnabled();
	await page.locator('.course-hero img').evaluate((image: HTMLImageElement) => image.decode());
	await page.evaluate(() => document.fonts.ready);

	for (const viewport of [
		{ label: 'desktop', width: 1440, height: 1000 },
		{ label: 'mobile-390', width: 390, height: 844 },
		{ label: 'mobile-320', width: 320, height: 844 }
	]) {
		await page.setViewportSize({ width: viewport.width, height: viewport.height });
		const notes = page.locator('details.code-notes');
		await expect(notes).toHaveCount(3);
		for (const note of await notes.all()) {
			const summary = note.locator('summary');
			await summary.focus();
			await expect(summary).toBeFocused();
			await page.keyboard.press('Enter');
			await expect(note).toHaveJSProperty('open', true);
			await expect(note.locator('p').first()).toBeVisible();
			await expectNoOverflow(page);
			await page.keyboard.press('Space');
			await expect(note).toHaveJSProperty('open', false);
			await expect(note.locator('p').first()).toBeHidden();
		}

		for (const theme of ['dark', 'light']) {
			if ((await page.locator('html').getAttribute('data-theme')) !== theme) {
				await page.getByRole('button', { name: `Switch to ${theme} mode`, exact: true }).click();
			}
			await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
			await expectNoOverflow(page);
			await page.evaluate(() => window.scrollTo(0, 0));
			await page.screenshot({
				path: testInfo.outputPath(`drone-racing-${viewport.label}-${theme}.png`),
				fullPage: true,
				animations: 'disabled'
			});
		}
	}
});
