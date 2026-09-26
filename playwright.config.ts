import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		baseURL: 'http://127.0.0.1:4173',
		reducedMotion: 'reduce',
		channel: process.env.PLAYWRIGHT_CHANNEL || undefined
	},
	webServer: {
		command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
		url: 'http://127.0.0.1:4173',
		reuseExistingServer: !process.env.CI
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
