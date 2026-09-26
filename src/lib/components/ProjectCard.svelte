<script lang="ts">
	import type { Project } from '$lib/scripts/projects';
	export let project: Project;
	$: href = project.showcase ? `/projects/${project.slug}` : project.link;
	let activeIndex = 0;
	let failedSrc: string | null = null;
	$: slides = project.thumbnails?.length
		? project.thumbnails
		: [{ src: project.image, alt: project.alt }];
	$: if (activeIndex >= slides.length) activeIndex = 0;
	$: activeImage = slides[activeIndex];
	function changeImage(direction: number) {
		activeIndex = (activeIndex + direction + slides.length) % slides.length;
	}
</script>

<article class="project-card">
	<div class="project-media">
		<a
			id={`thumbnail-${project.slug}`}
			class="project-cover"
			{href}
			target={project.showcase ? undefined : '_blank'}
			rel={project.showcase ? undefined : 'noopener noreferrer'}
			aria-label={`View ${project.title}`}
		>
			{#if activeImage.src && failedSrc !== activeImage.src}
				<img
					src={activeImage.src}
					alt={activeImage.alt}
					width="800"
					height="450"
					loading="lazy"
					on:error={() => (failedSrc = activeImage.src)}
				/>
			{:else}
				<span class="thumbnail-placeholder">
					<svg
						width="34"
						height="34"
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						aria-hidden="true"
						focusable="false"
					>
						<rect x="4.5" y="5.5" width="23" height="21" rx="3" />
						<circle cx="12" cy="12" r="2.5" />
						<path d="m5 23 7-7 5 5 4-4 6 6" />
					</svg>
					<span>Image coming soon</span>
				</span>
			{/if}
		</a>
		{#if slides.length > 1}
			<div class="thumbnail-controls" role="group" aria-label={`${project.title} images`}>
				<button
					type="button"
					aria-label={`Previous ${project.title} image`}
					aria-controls={`thumbnail-${project.slug}`}
					on:click={() => changeImage(-1)}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						focusable="false"><path d="m12 5-5 5 5 5" /></svg
					>
				</button>
				<output class="thumbnail-count" aria-label={`${project.title} image`}
					>{activeIndex + 1} / {slides.length}</output
				>
				<button
					type="button"
					aria-label={`Next ${project.title} image`}
					aria-controls={`thumbnail-${project.slug}`}
					on:click={() => changeImage(1)}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						focusable="false"><path d="m8 5 5 5-5 5" /></svg
					>
				</button>
			</div>
		{/if}
	</div>
	<div class="project-body">
		<p class="project-category">{project.category}</p>
		<h3>
			<a
				{href}
				target={project.showcase ? undefined : '_blank'}
				rel={project.showcase ? undefined : 'noopener noreferrer'}
				>{project.title}<span aria-hidden="true">↗</span></a
			>
		</h3>
		<p class="project-description">{project.description}</p>
		<ul class="technologies" aria-label="Technologies">
			{#each project.technologies as tech}<li>{tech}</li>{/each}
		</ul>
		{#if project.showcase}
			<a class="project-action" {href}>Explore project <span aria-hidden="true">→</span></a>
		{:else}
			<details class="project-gallery">
				<summary>Screenshots <span aria-hidden="true">+</span></summary>
				<div class="gallery-thumbnails">
					{#each [project.sc1, project.sc2, project.sc3].filter(Boolean) as screenshot, index}
						<a
							href={screenshot}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${project.title} screenshot ${index + 1}`}
							><img
								src={screenshot}
								alt={`${project.title} screenshot ${index + 1}`}
								loading="lazy"
							/></a
						>
					{/each}
				</div>
			</details>
		{/if}
	</div>
</article>

<style>
	.project-card {
		min-width: 0;
		border: 1px solid var(--border-color);
		border-radius: 10px;
		overflow: hidden;
		background: var(--surface-color);
		transition: border-color 160ms;
	}
	.project-card:hover {
		border-color: var(--hover-border-color);
	}
	.project-media {
		position: relative;
	}
	.project-cover {
		display: block;
		aspect-ratio: 2 / 1;
		background: var(--media-color);
		border-bottom: 1px solid var(--border-color);
	}
	.project-cover img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.thumbnail-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		height: 100%;
		padding: 18px 16px 42px;
		color: var(--date-color);
		font-size: 0.7rem;
	}
	.project-cover:has(.thumbnail-placeholder) {
		text-decoration: none;
	}
	.thumbnail-placeholder svg {
		opacity: 0.65;
	}
	.thumbnail-controls {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 1px;
		border: 1px solid var(--border-color);
		border-radius: 999px;
		background: var(--surface-color);
		color: var(--font-color);
		box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
	}
	.thumbnail-controls button {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: transparent;
		color: var(--section-detail-color);
		cursor: pointer;
	}
	.thumbnail-controls button:hover {
		background: var(--section-skills-bubble-color);
		color: var(--section-skills-color);
	}
	.thumbnail-controls button:focus-visible {
		outline-offset: 1px;
	}
	.thumbnail-count {
		min-width: 35px;
		text-align: center;
		font-size: 0.6rem;
		font-variant-numeric: tabular-nums;
		color: var(--date-color);
	}
	@media (pointer: coarse) {
		.thumbnail-controls button {
			width: 36px;
			height: 36px;
		}
	}
	.project-body {
		padding: 20px;
	}
	.project-category {
		font-size: 0.62rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--section-skills-color);
		margin: 0 0 12px;
	}
	h3 {
		font-size: 1.08rem;
		font-weight: 500;
		letter-spacing: -0.4px;
		margin: 0;
	}
	h3 a {
		color: var(--font-color);
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	h3 span {
		font-size: 1rem;
		color: var(--date-color);
	}
	.project-description {
		color: var(--section-detail-color);
		font-size: 0.83rem;
		line-height: 1.8;
		margin: 12px 0 17px;
	}
	.project-action,
	summary {
		display: flex;
		justify-content: space-between;
		color: var(--font-color);
		text-decoration: none;
		font-size: 0.72rem;
		border-top: 1px solid var(--border-color);
		padding-top: 17px;
		margin-top: 20px;
	}
	h3 a:hover,
	h3 a:hover span,
	.project-action:hover,
	summary:hover {
		color: var(--section-skills-color);
	}
	summary {
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	details[open] summary > span {
		transform: rotate(45deg);
	}
	.gallery-thumbnails {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 9px;
		margin-top: 16px;
	}
	.gallery-thumbnails img {
		width: 100%;
		height: 90px;
		object-fit: contain;
		background: var(--media-color);
		border-radius: 4px;
	}
	@media (max-width: 480px) {
		.project-body {
			padding: 20px;
		}
	}
</style>
