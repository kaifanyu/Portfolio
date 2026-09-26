<script lang="ts">
	import type { Project } from '$lib/scripts/projects';
	export let project: Project;
	$: href = project.showcase ? `/projects/${project.slug}` : project.link;
</script>

<article class="project-card">
	<a
		class="project-cover"
		{href}
		target={project.showcase ? undefined : '_blank'}
		rel={project.showcase ? undefined : 'noopener noreferrer'}
		aria-label={`View ${project.title}`}
	>
		<img src={project.image} alt={project.alt} width="800" height="450" loading="lazy" />
	</a>
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
		background: #17233870;
		transition: border-color 160ms;
	}
	.project-card:hover {
		border-color: #50637e;
	}
	.project-cover {
		display: block;
		aspect-ratio: 16 / 9;
		background: #101824;
		border-bottom: 1px solid var(--border-color);
	}
	.project-cover img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.project-body {
		padding: 23px 24px;
	}
	.project-category {
		font-size: 0.62rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--section-skills-color);
		margin: 0 0 12px;
	}
	h3 {
		font-size: 1.2rem;
		font-weight: 500;
		letter-spacing: -0.4px;
		margin: 0;
	}
	h3 a {
		color: #eaf0f8;
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	h3 span {
		font-size: 1rem;
		color: #a4b8cf;
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
		color: #c6d5e7;
		text-decoration: none;
		font-size: 0.72rem;
		border-top: 1px solid var(--border-color);
		padding-top: 17px;
		margin-top: 20px;
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
		background: #101824;
		border-radius: 4px;
	}
	@media (max-width: 480px) {
		.project-body {
			padding: 20px;
		}
	}
</style>
