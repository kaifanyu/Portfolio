import { expect, test, type Page } from '@playwright/test';

const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
	const messages: string[] = [];
	errors.set(page, messages);
	page.on('pageerror', (error) => messages.push(error.message));
});
test.afterEach(async ({ page }) => expect(errors.get(page)).toEqual([]));

async function openDecorations(page: Page) {
	await page.getByRole('button', { name: /Explore 6/ }).click();
	const dialog = page.getByRole('dialog', { name: 'Choose the atmosphere.' });
	await expect(dialog).toBeVisible();
	return dialog;
}

test('presets keep the two selected effects and the main portfolio has its own atmosphere', async ({
	page
}) => {
	await page.addInitScript(() => {
		localStorage.setItem(
			'kai-interface-studies-v1',
			JSON.stringify({ enabled: ['atlas', 'trajectory', 'cursor', 'tilt'] })
		);
	});
	await page.goto('/playground');
	const preview = page.locator('.playground');
	const presets = page.getByRole('group', { name: 'Design presets' });
	await expect(preview).toHaveAttribute(
		'data-enabled',
		'grid magnet stars orbits constellations telescope'
	);
	await expect(page.locator('#trajectory-study, #idea-atlas, #contact-sheet')).toHaveCount(0);

	await presets.getByRole('button', { name: 'Selected', exact: true }).click();
	await expect(preview).toHaveAttribute('data-enabled', 'grid magnet');
	await expect(page.locator('[data-decoration]')).toHaveCount(0);
	await presets.getByRole('button', { name: 'Starlight', exact: true }).click();
	await expect(preview).toHaveAttribute('data-enabled', 'grid magnet stars');
	await expect(page.locator('[data-decoration]')).toHaveCount(1);
	await expect(page.locator('[data-decoration="stars"]')).toBeVisible();
	await presets.getByRole('button', { name: 'Observatory', exact: true }).click();
	await expect(page.locator('[data-decoration]')).toHaveCount(4);
	await expect(presets.getByRole('button', { name: 'Observatory', exact: true })).toHaveAttribute(
		'aria-pressed',
		'true'
	);

	await page.goto('/');
	await expect(page.locator('.playground')).toHaveCount(0);
	await expect(page.locator('.celestial-background')).toHaveCount(1);
	await expect(page.locator('[data-decoration]')).toHaveCount(4);
	await expect(page.getByRole('heading', { name: 'Kai Yu', exact: true })).toBeVisible();
	await expect(
		page.getByRole('region', { name: 'Research', exact: true }).getByText('xLAB', { exact: true })
	).toBeVisible();
});

test('six decoration choices, favorites, and sky contrast survive a reload', async ({ page }) => {
	await page.goto('/playground');
	const dialog = await openDecorations(page);
	await expect(dialog.getByRole('checkbox')).toHaveCount(6);
	await expect(dialog.getByRole('button', { name: /Copy 2 favorites/ })).toBeVisible();
	await dialog.getByRole('checkbox', { name: 'Orbital arcs', exact: true }).uncheck();
	await dialog.getByRole('button', { name: 'Favorite Constellations', exact: true }).click();
	const contrast = dialog.getByRole('slider', { name: 'Sky contrast' });
	await contrast.focus();
	await contrast.press('ArrowLeft');
	await contrast.press('ArrowLeft');
	await contrast.press('ArrowLeft');
	await expect(contrast).toHaveValue('50');
	await expect(page.locator('.celestial-background')).toHaveCSS('opacity', '0.5');

	await page.reload();
	const reopened = await openDecorations(page);
	await expect(
		reopened.getByRole('checkbox', { name: 'Orbital arcs', exact: true })
	).not.toBeChecked();
	await expect(reopened.getByRole('slider', { name: 'Sky contrast' })).toHaveValue('50');
	await expect(
		reopened.getByRole('button', { name: 'Favorite Constellations', exact: true })
	).toHaveAttribute('aria-pressed', 'true');
	await expect(reopened.getByRole('button', { name: /Copy 3 favorites/ })).toBeVisible();
	await reopened.getByRole('button', { name: 'Just my two', exact: true }).click();
	await expect(reopened.getByRole('checkbox', { checked: true })).toHaveCount(2);
	await expect(
		reopened.getByRole('checkbox', { name: 'Construction lines', exact: true })
	).toBeChecked();
	await expect(
		reopened.getByRole('checkbox', { name: 'Magnetic links', exact: true })
	).toBeChecked();
	await expect(page.locator('[data-decoration]')).toHaveCount(0);
});

test('Try it reaches social links and the telescope, and the dialog supports Escape', async ({
	page
}) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/playground?mode=selected');
	const dialog = await openDecorations(page);
	await dialog
		.locator('.lab-experiment')
		.filter({ has: page.getByRole('heading', { name: 'Magnetic links', exact: true }) })
		.getByRole('button', { name: /Try it/ })
		.click();
	await expect(dialog).not.toBeVisible();
	await expect(page.locator('.social-media a').first()).toBeFocused();

	await openDecorations(page);
	await dialog
		.locator('.lab-experiment')
		.filter({ has: page.getByRole('heading', { name: 'Telescope sketch', exact: true }) })
		.getByRole('button', { name: /Try it/ })
		.click();
	await expect(dialog).not.toBeVisible();
	await expect(page.locator('[data-decoration="telescope"]')).toBeInViewport({ ratio: 0.9 });
	await openDecorations(page);
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(page.getByRole('button', { name: /Explore 6/ })).toBeFocused();
});

test('celestial artwork stays static and outside the interactive reading surface', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/playground?mode=observatory');
	const sky = page.locator('.celestial-background');
	await expect(sky).toHaveAttribute('aria-hidden', 'true');
	await expect(sky).toHaveCSS('pointer-events', 'none');
	expect(await sky.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
	await expect(sky.locator('a, button, input, [tabindex="0"]')).toHaveCount(0);
	await expect(sky.locator('svg:not([focusable="false"])')).toHaveCount(0);
	await page.getByRole('link', { name: 'Research', exact: true }).click();
	await expect(page.getByRole('region', { name: 'Research', exact: true })).toBeInViewport();
});

test('magnetic links pause cleanly and respect a change to reduced motion', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/playground?mode=observatory');
	const preview = page.locator('.playground');
	const icon = page.locator('.social-media .icon').first();
	await expect(preview).toHaveAttribute('data-effects-active', 'true');
	await icon.hover({ position: { x: 3, y: 3 } });
	await expect
		.poll(() =>
			icon.evaluate((element) => parseFloat(element.style.getPropertyValue('--magnet-x')))
		)
		.toBeLessThan(0);

	await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
	await expect(preview).toHaveAttribute('data-motion', 'false');
	await expect(preview).toHaveAttribute('data-effects-active', 'false');
	await icon.hover({ position: { x: 3, y: 3 } });
	expect(await icon.evaluate((element) => element.style.getPropertyValue('--magnet-x'))).toBe('');
	await page.getByRole('button', { name: 'Resume motion', exact: true }).click();
	await expect(preview).toHaveAttribute('data-motion', 'true');
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await expect(preview).toHaveAttribute('data-motion', 'false');
	await expect(page.getByRole('button', { name: 'Reduced motion', exact: true })).toBeDisabled();
	await icon.hover({ position: { x: 3, y: 3 } });
	expect(await icon.evaluate((element) => element.style.getPropertyValue('--magnet-x'))).toBe('');
	await expect(page.locator('[data-decoration]')).toHaveCount(4);
});

test('narrow screens keep the preview controls and decoration dialog within the viewport', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/playground?mode=observatory');
	await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Resume motion', exact: true })).toBeVisible();
	await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
	for (const width of [390, 320]) {
		await page.setViewportSize({ width, height: 844 });
		await expect(page.getByRole('heading', { name: 'Kai Yu', exact: true })).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
			true
		);
		const dialog = await openDecorations(page);
		const bounds = await dialog.boundingBox();
		expect(bounds).not.toBeNull();
		expect(bounds!.x).toBeGreaterThanOrEqual(0);
		expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
		expect(bounds!.height).toBeLessThanOrEqual(844);
		const contrast = dialog.getByRole('slider', { name: 'Sky contrast' });
		await expect(contrast).toBeVisible();
		await contrast.focus();
		const value = Number(await contrast.inputValue());
		await contrast.press('ArrowRight');
		await expect(contrast).toHaveValue(String(value + 5));
		await page.keyboard.press('Escape');
		await expect(dialog).not.toBeVisible();
	}
});
