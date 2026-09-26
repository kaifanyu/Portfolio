<script lang="ts">
	import { onMount } from 'svelte';

	const storageKey = 'kai-portfolio-theme';
	let theme: 'dark' | 'light' = 'dark';
	let ready = false;
	$: nextTheme = theme === 'dark' ? 'light' : 'dark';
	$: label = `Switch to ${nextTheme} mode`;

	function applyTheme(value: string | null) {
		theme = value === 'light' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
	}

	function toggleTheme() {
		applyTheme(nextTheme);
		try {
			localStorage.setItem(storageKey, theme);
		} catch {
			// The switch still works when browser storage is unavailable.
		}
	}

	onMount(() => {
		applyTheme(document.documentElement.dataset.theme ?? null);
		ready = true;
		const syncTheme = (event: StorageEvent) => {
			if (event.key === storageKey || event.key === null) applyTheme(event.newValue);
		};
		window.addEventListener('storage', syncTheme);
		return () => window.removeEventListener('storage', syncTheme);
	});
</script>

<button
	class="theme-toggle icon"
	type="button"
	aria-label={label}
	title={label}
	disabled={!ready}
	on:click={toggleTheme}
>
	<svg
		width="1.6rem"
		height="1.6rem"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		focusable="false"
	>
		<circle cx="12" cy="12" r="4" />
		<path
			d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
		/>
	</svg>
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--section-detail-color);
		line-height: 1;
		cursor: pointer;
		transition: color 160ms ease;
	}
	.theme-toggle:hover {
		color: var(--section-skills-color);
	}
	.theme-toggle:disabled {
		cursor: default;
	}
</style>
