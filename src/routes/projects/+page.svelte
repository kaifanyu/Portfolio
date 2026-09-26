<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import projects from '$lib/scripts/projects';
</script>

<svelte:head>
	<title>Projects · Kai Yu</title>
	<meta
		name="description"
		content="Explore Kai Yu’s projects in robotics, machine learning, and computer vision."
	/>
</svelte:head>

<main class="project-archive" id="main-content">
	<nav class="page-navigation" aria-label="Portfolio navigation">
		<a class="name-link" href="/">Kai Yu</a>
		<a class="text-link" href="/#projects">← Back to portfolio</a>
	</nav>
	<header>
		<p class="eyebrow">Selected work</p>
		<h1>Projects</h1>
		<p class="introduction">
			A collection of work in robotics, machine learning, and computer vision.
		</p>
	</header>
	<div class="project-grid">
		{#each projects as project}<ProjectCard {project} />{/each}
	</div>
</main>

<style>
	.project-archive {
		max-width: 1100px;
		margin: 0 auto;
		padding: 64px 28px 88px;
	}
	.page-navigation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		font-size: 0.8rem;
	}
	.name-link {
		color: var(--font-color);
		text-decoration: none;
		font-size: 1rem;
		font-weight: 500;
	}
	header {
		margin: 80px 0 40px;
	}
	.eyebrow {
		color: var(--section-skills-color);
		font-size: 0.65rem;
		letter-spacing: 1.8px;
		text-transform: uppercase;
		margin: 0 0 16px;
	}
	h1 {
		color: var(--font-color);
		font-size: clamp(2.4rem, 5vw, 3rem);
		font-weight: 500;
		letter-spacing: -1.5px;
		line-height: 1.1;
		margin: 0;
	}
	.introduction {
		color: var(--section-detail-color);
		font-size: 0.95rem;
		line-height: 1.8;
		max-width: 620px;
		margin: 20px 0 0;
	}
	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		align-items: start;
		gap: 28px;
	}
	@media (max-width: 680px) {
		.project-archive {
			padding: 36px 24px 64px;
		}
		header {
			margin-top: 60px;
		}
		.project-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}
</style>
