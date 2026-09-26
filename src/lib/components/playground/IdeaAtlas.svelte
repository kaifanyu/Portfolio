<script lang="ts">
	export let enabled = true;

	const interests = [
		{
			name: 'Perception',
			x: 22,
			y: 17,
			description:
				'A robot needs a useful view of where it is. With HAMR, that means exploring visual localization alongside the mechanics of a spherical wheel.',
			link: '/projects/hamr',
			linkLabel: 'Explore HAMR'
		},
		{
			name: 'Control',
			x: 78,
			y: 23,
			description:
				'Turning a desired motion into physical movement. HAMR connects caster motion analysis with the behavior of an active spherical wheel.',
			link: '/projects/hamr',
			linkLabel: 'Explore the mechanism'
		},
		{
			name: 'Learning',
			x: 49,
			y: 46,
			description:
				'What can a small correction teach a large policy? RL-VLA explores residual action corrections around a frozen vision-language-action pipeline.',
			link: '/projects/rl-vla',
			linkLabel: 'Explore RL-VLA'
		},
		{
			name: 'World models',
			x: 22,
			y: 77,
			description:
				'Prediction from the agent’s point of view. My research interests include how models can represent an environment in relation to an agent’s actions.',
			link: '/#research',
			linkLabel: 'Read about the research'
		},
		{
			name: 'Embodiment',
			x: 78,
			y: 79,
			description:
				'Intelligence has a physical context. HAMR is a place to investigate how mechanism design, sensing, and motion influence one another.',
			link: '/projects/hamr',
			linkLabel: 'Meet HAMR'
		}
	];
	const connections = [
		[0, 1],
		[0, 3],
		[1, 2],
		[1, 4],
		[2, 3],
		[2, 4],
		[3, 4]
	];
	let selected: number | null = null;
	let hovered: number | null = null;
	let focused: number | null = null;
	let detailFocused: number | null = null;
	$: active = detailFocused ?? hovered ?? focused ?? selected;
	$: current = active === null ? null : interests[active];

	function select(index: number) {
		selected = selected === index ? null : index;
	}

	function focusInterest(index: number, detail = false) {
		focused = index;
		detailFocused = detail ? index : null;
		hovered = null;
	}

	function leaveFocus(event: FocusEvent) {
		const next = event.relatedTarget;
		// Keep the preview alive while Tab moves from a node to its project link.
		if (!(next instanceof Node) || !(event.currentTarget as HTMLElement).contains(next)) {
			focused = null;
			detailFocused = null;
		}
	}
</script>

{#if enabled}
	<section class="atlas" aria-labelledby="atlas-title" on:focusout={leaveFocus}>
		<header>
			<div class="eyebrow"><span aria-hidden="true">✳</span> A FEW CONNECTED QUESTIONS</div>
			<h2 id="atlas-title">An atlas of interests</h2>
			<p>Different starting points. Often, the same rabbit hole. Pick a point to explore.</p>
		</header>

		<div class="constellation" aria-label="Explore connected research interests">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				{#each connections as [from, to]}
					<line
						x1={interests[from].x}
						y1={interests[from].y}
						x2={interests[to].x}
						y2={interests[to].y}
						class:illuminated={active === from || active === to}
						class:muted={active !== null && active !== from && active !== to}
					/>
				{/each}
			</svg>
			{#each interests as interest, index}
				<button
					type="button"
					class="node"
					class:active={active === index}
					class:selected={selected === index}
					style:left={`${interest.x}%`}
					style:top={`${interest.y}%`}
					aria-pressed={selected === index}
					aria-label={interest.name}
					data-atlas-node={interest.name}
					on:mouseenter={() => (hovered = index)}
					on:mouseleave={() => (hovered = null)}
					on:focus={() => focusInterest(index)}
					on:click={() => select(index)}
				>
					<span class="index" aria-hidden="true">0{index + 1}</span>
					<span class="point" aria-hidden="true"></span>
					<span class="label">{interest.name}</span>
				</button>
			{/each}
		</div>

		<div class="insight" aria-live="polite" aria-atomic="true">
			<div class="insight-content" class:visible={current === null} aria-hidden={current !== null}>
				<span class="insight-title">Follow a connection</span>
				<p>
					A small map of the questions behind my work. Hover or focus to look around; select a point
					to keep it open.
				</p>
				<span class="hint">05 interests · many possible paths</span>
			</div>
			{#each interests as interest, index}
				<div
					class="insight-content"
					class:visible={active === index}
					aria-hidden={active !== index}
				>
					<span class="insight-title">{interest.name}</span>
					<p>{interest.description}</p>
					<a
						href={interest.link}
						tabindex={active === index ? 0 : -1}
						on:focus={() => focusInterest(index, true)}
						on:blur={() => (detailFocused = null)}
					>
						{interest.linkLabel}<span aria-hidden="true">↗</span>
					</a>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.atlas {
		--atlas-bg: #1c2026;
		--atlas-surface: #232930;
		--atlas-text: #ebeef2;
		--atlas-accent: #9bc4ce;
		--atlas-border: #363e48;
		border: 1px solid var(--atlas-border);
		border-radius: 14px;
		background: var(--atlas-bg);
		padding: 29px 30px 24px;
		color: var(--atlas-text);
	}
	.eyebrow {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 0.56rem;
		letter-spacing: 0.15em;
		line-height: 1.7;
		color: #9aa5b3;
	}
	.eyebrow span {
		font-size: 1.2rem;
		line-height: 1;
		color: var(--atlas-accent);
	}
	h2 {
		margin: 11px 0 8px;
		font-size: clamp(1.2rem, 3vw, 1.5rem);
		font-weight: 500;
		letter-spacing: -0.04em;
		line-height: 1.3;
	}
	header p {
		margin: 0;
		max-width: 360px;
		color: #9aa5b3;
		font-size: 0.76rem;
		line-height: 1.75;
	}
	.constellation {
		position: relative;
		height: 252px;
		margin: 9px 0 6px;
	}
	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: visible;
	}
	line {
		stroke: var(--atlas-border);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
		transition:
			opacity 220ms ease,
			stroke 220ms ease;
	}
	line.illuminated {
		stroke: var(--atlas-accent);
		opacity: 0.63;
	}
	line.muted {
		opacity: 0.32;
	}
	.node {
		position: absolute;
		width: 104px;
		min-height: 44px;
		transform: translate(-50%, -4px);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 0 0 6px;
		border: 0;
		background: transparent;
		color: #bec7d1;
		font: inherit;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	.node:focus-visible {
		outline: 1px solid var(--atlas-accent);
		outline-offset: 8px;
		border-radius: 4px;
	}
	.point {
		width: 8px;
		height: 8px;
		flex-shrink: 0;
		border-radius: 50%;
		border: 1px solid #82929f;
		background: var(--atlas-bg);
		box-shadow: 0 0 0 6px var(--atlas-bg);
		transition:
			background 220ms ease,
			border-color 220ms ease,
			box-shadow 220ms ease;
	}
	.label {
		padding: 1px 4px;
		background: var(--atlas-bg);
		font-size: 0.73rem;
		line-height: 1.45;
		transition: color 220ms ease;
	}
	.index {
		position: absolute;
		top: -11px;
		left: calc(50% + 11px);
		background: var(--atlas-bg);
		padding: 1px 2px;
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 0.5rem;
		color: #788593;
		letter-spacing: 0.04em;
	}
	.node.active .point {
		background: var(--atlas-accent);
		border-color: var(--atlas-accent);
		box-shadow:
			0 0 0 5px var(--atlas-bg),
			0 0 0 6px #9bc4ce38;
	}
	.node.active .label {
		color: var(--atlas-text);
	}
	.node.selected .index {
		color: var(--atlas-accent);
	}
	.insight {
		display: grid;
		border-top: 1px solid var(--atlas-border);
		padding-top: 19px;
	}
	.insight-content {
		grid-area: 1 / 1;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition: opacity 200ms ease;
	}
	.insight-content.visible {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}
	.insight-title {
		font-size: 0.74rem;
		font-weight: 500;
	}
	.insight p {
		font-size: 0.73rem;
		line-height: 1.8;
		color: #aeb9c6;
		margin: 8px 0 11px;
		max-width: 510px;
	}
	a,
	.hint {
		font-size: 0.65rem;
		line-height: 1.8;
	}
	a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--atlas-accent);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.hint {
		color: #82909e;
	}
	@media (max-width: 480px) {
		.atlas {
			padding: 24px 17px 21px;
		}
		.constellation {
			height: 246px;
			margin-top: 13px;
		}
		.node {
			width: 94px;
		}
		.label {
			font-size: 0.68rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		line,
		.point,
		.label,
		.insight-content {
			transition: none;
		}
	}
</style>
