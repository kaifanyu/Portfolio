<script>
	import { page } from '$app/stores';
	import BackgroundNoise from '$lib/components/BackgroundNoise.svelte';
	import '../app.css';
</script>

<div
	class="app-container"
	class:portfolio-surface={$page.url.pathname === '/' ||
		$page.url.pathname.startsWith('/projects') ||
		$page.url.pathname === '/playground'}
>
	{#if $page.url.pathname !== '/' && !$page.url.pathname.startsWith('/projects') && $page.url.pathname !== '/playground'}
		<BackgroundNoise />
	{/if}
	<slot />
</div>
