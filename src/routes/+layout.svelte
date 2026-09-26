<script>
	import { page } from '$app/stores';
	import BackgroundNoise from '$lib/components/BackgroundNoise.svelte';
	import '../app.css';
</script>

<div class="app-container">
	{#if $page.url.pathname !== '/' && !$page.url.pathname.startsWith('/projects')}
		<BackgroundNoise />
	{/if}
	<slot />
</div>
