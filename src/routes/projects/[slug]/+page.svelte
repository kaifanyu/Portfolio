<script lang="ts">
	import { showcases } from '$lib/scripts/showcases';
	import type { PageData } from './$types';
	export let data: PageData;
	$: showcase = data.showcase;
	$: otherProjects = showcases.filter((project) => project.slug !== showcase.slug);
</script>

<svelte:head>
	<title>{showcase.title} · Kai Yu</title>
	<meta name="description" content={showcase.description} />
</svelte:head>

<main class="showcase" id="main-content">
	<nav class="page-navigation" aria-label="Project navigation">
		<a class="text-link" href="/#projects">← Back to portfolio</a>
		<a class="text-link" href="/projects">All projects</a>
	</nav>
	<header class="project-heading">
		<p class="eyebrow">{showcase.category}</p>
		<h1>{showcase.title}</h1>
		<p class="subtitle">{showcase.subtitle}</p>
		<p class="description">{showcase.description}</p>
	</header>
	<figure class="hero">
		<a
			class="hero-frame"
			href={showcase.hero}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Open ${showcase.title} image`}
			><img src={showcase.hero} alt={showcase.heroAlt} width="1600" height="900" /></a
		>
		<figcaption>{showcase.heroCaption}</figcaption>
	</figure>
	<section class="details-grid" aria-label="Project approach">
		{#each showcase.sections as section, index}
			<article class="detail">
				<span class="section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
				<h2>{section.title}</h2>
				<p>{section.description}</p>
			</article>
		{/each}
	</section>
	{#if showcase.note}<p class="project-note">{showcase.note}</p>{/if}
	<section class="project-gallery" aria-labelledby="gallery-heading">
		<h2 id="gallery-heading">Project gallery</h2>
		<div class="gallery-grid">
			{#each showcase.gallery as item}
				<figure class="gallery-item">
					{#if item.src}
						<a
							class="gallery-frame"
							href={item.src}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${item.title} image`}
							><img
								src={item.src}
								alt={item.alt ?? item.title}
								width="800"
								height="500"
								loading="lazy"
							/></a
						>
					{:else}
						<div class="gallery-frame placeholder">
							<svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true">
								<rect x="4.5" y="5.5" width="23" height="21" rx="3" />
								<circle cx="12" cy="12" r="2.5" />
								<path d="m5 23 7-7 5 5 4-4 6 6" />
							</svg>
							<span>Visualization coming soon</span>
						</div>
					{/if}
					<figcaption>
						<h3>{item.title}</h3>
						<p>{item.caption}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</section>
	<nav class="more-projects" aria-label="Explore another project">
		<p>More to explore</p>
		{#each otherProjects as project}
			<a href={`/projects/${project.slug}`}>
				<span
					><strong>{project.title}</strong><span class="next-subtitle">{project.subtitle}</span
					></span
				>
				<span class="next-arrow" aria-hidden="true">→</span>
			</a>
		{/each}
	</nav>
</main>

<style>
	.showcase {
		max-width: 1000px;
		margin: 0 auto;
		padding: 64px 28px 80px;
	}
	.page-navigation {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		font-size: 0.8rem;
	}
	.project-heading {
		margin: 76px 0 40px;
	}
	.eyebrow {
		color: var(--section-skills-color);
		font-size: 0.65rem;
		letter-spacing: 1.6px;
		line-height: 1.8;
		text-transform: uppercase;
		margin: 0 0 16px;
	}
	h1 {
		color: var(--font-color);
		font-size: clamp(2.4rem, 6vw, 3rem);
		font-weight: 500;
		letter-spacing: -1.5px;
		line-height: 1.1;
		margin: 0;
	}
	.subtitle {
		color: var(--font-color);
		font-size: 1.2rem;
		line-height: 1.6;
		margin: 16px 0 0;
	}
	.description {
		max-width: 760px;
		color: var(--section-detail-color);
		font-size: 0.95rem;
		line-height: 1.9;
		margin: 24px 0 0;
	}
	figure {
		margin: 0;
	}
	.hero-frame,
	.gallery-frame {
		display: block;
		background: #101824;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
	}
	.hero-frame {
		aspect-ratio: 16 / 9;
	}
	.hero img,
	.gallery-frame img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.hero figcaption {
		color: var(--date-color);
		font-size: 0.72rem;
		line-height: 1.7;
		margin-top: 12px;
	}
	.details-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 40px 44px;
		margin-top: 56px;
	}
	.detail {
		border-top: 1px solid var(--border-color);
		padding-top: 22px;
	}
	.section-number {
		color: var(--section-skills-color);
		font-size: 0.68rem;
		font-variant-numeric: tabular-nums;
		letter-spacing: 1px;
	}
	h2 {
		color: var(--font-color);
		font-size: 1.05rem;
		font-weight: 500;
		line-height: 1.5;
		margin: 12px 0;
	}
	.detail p {
		color: var(--section-detail-color);
		font-size: 0.85rem;
		line-height: 1.9;
		margin: 0;
	}
	.project-note {
		color: var(--section-detail-color);
		font-size: 0.8rem;
		line-height: 1.8;
		background: #17233870;
		border: 1px solid var(--border-color);
		border-radius: 6px;
		padding: 18px 22px;
		margin: 36px 0 0;
	}
	.project-gallery {
		margin-top: 64px;
	}
	.project-gallery > h2 {
		margin: 0 0 24px;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 28px;
	}
	.gallery-frame {
		aspect-ratio: 8 / 5;
	}
	.gallery-item figcaption {
		margin-top: 16px;
	}
	h3 {
		color: var(--font-color);
		font-size: 0.86rem;
		font-weight: 500;
		margin: 0 0 8px;
	}
	.gallery-item figcaption p {
		color: var(--date-color);
		font-size: 0.73rem;
		line-height: 1.8;
		margin: 0;
	}
	.placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		color: var(--date-color);
		font-size: 0.73rem;
		padding: 20px;
		text-align: center;
		background: #17233840;
	}
	.placeholder svg {
		stroke: currentColor;
		stroke-width: 1;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.more-projects {
		border-top: 1px solid var(--border-color);
		padding-top: 24px;
		margin-top: 64px;
	}
	.more-projects > p {
		color: var(--date-color);
		font-size: 0.68rem;
		letter-spacing: 1px;
		text-transform: uppercase;
		margin: 0 0 20px;
	}
	.more-projects a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		text-decoration: none;
		color: var(--font-color);
	}
	.more-projects strong {
		font-size: 1.1rem;
		font-weight: 500;
	}
	.next-subtitle {
		display: block;
		color: var(--section-detail-color);
		font-size: 0.78rem;
		line-height: 1.7;
		margin-top: 7px;
	}
	.next-arrow {
		color: var(--section-skills-color);
		font-size: 1.4rem;
		transition: transform 160ms;
	}
	.more-projects a:hover .next-arrow {
		transform: translateX(4px);
	}
	@media (max-width: 680px) {
		.showcase {
			padding: 36px 24px 64px;
		}
		.project-heading {
			margin-top: 60px;
		}
		.details-grid,
		.gallery-grid {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.details-grid {
			margin-top: 40px;
		}
		.project-gallery,
		.more-projects {
			margin-top: 48px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.next-arrow {
			transition: none;
		}
	}
</style>
