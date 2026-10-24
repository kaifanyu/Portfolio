<script lang="ts">
	export let title: string;
	export let caption: string;
	export let primary: string;
	export let poster: string;
	export let alternate: string | undefined = undefined;
	export let alternatePoster: string | undefined = undefined;
	export let portrait = false;

	let angle: 'main' | 'alternate' = 'main';
	let player: HTMLVideoElement | undefined;

	$: componentId = `flight-${primary.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '')}`;
	$: source = angle === 'alternate' && alternate ? alternate : primary;
	$: activePoster = angle === 'alternate' && alternatePoster ? alternatePoster : poster;

	function selectAngle(nextAngle: 'main' | 'alternate') {
		if (angle === nextAngle) return;
		player?.pause();
		angle = nextAngle;
	}
</script>

<figure class="flight-video" aria-labelledby={`${componentId}-title`}>
	<div class="video-heading">
		<h3 id={`${componentId}-title`}>{title}</h3>
		{#if alternate}
			<div class="angle-controls" role="group" aria-label="Camera view">
				<button type="button" aria-pressed={angle === 'main'} on:click={() => selectAngle('main')}>
					Main angle
				</button>
				<button
					type="button"
					aria-pressed={angle === 'alternate'}
					on:click={() => selectAngle('alternate')}
				>
					Alternate angle
				</button>
			</div>
		{/if}
	</div>
	<div class="video-frame" class:portrait>
		{#key source}
			<video
				bind:this={player}
				src={source}
				poster={activePoster}
				controls
				playsinline
				preload="none"
				muted
				aria-label={`${title}${alternate ? ` — ${angle === 'main' ? 'main' : 'alternate'} angle` : ''}`}
				aria-describedby={`${componentId}-caption`}
			>
				Your browser cannot play this video. <a href={source}>Open the flight footage</a>.
			</video>
		{/key}
	</div>
	<figcaption id={`${componentId}-caption`}>{caption}</figcaption>
</figure>

<style>
	.flight-video {
		min-width: 0;
		margin: 0;
	}

	.video-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px 20px;
		margin-bottom: 14px;
	}

	h3 {
		margin: 0;
		color: var(--font-color);
		font-size: 0.95rem;
		font-weight: 500;
		line-height: 1.5;
	}

	.angle-controls {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	button {
		min-height: 36px;
		border: 1px solid var(--border-color);
		border-radius: 999px;
		padding: 7px 13px;
		background: var(--surface-color);
		color: var(--section-detail-color);
		font-size: 0.72rem;
		line-height: 1.5;
		cursor: pointer;
	}

	button:hover {
		border-color: var(--hover-border-color);
		color: var(--font-color);
	}

	button[aria-pressed='true'] {
		border-color: var(--tag-border-color);
		background: var(--section-skills-bubble-color);
		color: var(--section-skills-color);
	}

	.video-frame {
		display: flex;
		justify-content: center;
		overflow: hidden;
		border: 1px solid var(--border-color);
		border-radius: 14px;
		background: var(--media-color);
	}

	video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: contain;
	}

	.portrait video {
		max-width: 348.75px;
		max-height: 620px;
		aspect-ratio: 9 / 16;
	}

	figcaption {
		max-width: 76ch;
		margin-top: 12px;
		color: var(--section-detail-color);
		font-size: 0.79rem;
		line-height: 1.8;
	}

	@media (max-width: 520px) {
		.video-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 10px;
		}

		button {
			min-height: 40px;
		}

		.video-frame {
			border-radius: 10px;
		}
	}
</style>
