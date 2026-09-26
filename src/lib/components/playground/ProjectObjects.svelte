<script lang="ts">
	export let notes = false;
	export let contact = false;
	export let signature = true;
	export let motion = true;

	let selected = 0;
	let wheelTurn = 0;
	const processNotes = [
		{
			name: 'HAMR',
			number: '01',
			question: 'From observation to feedback',
			path: 'Observe → estimate → control',
			body: 'Camera observations reveal caster motion. State estimates connect those measurements with the robot’s mechanics, while feedback helps translate motion commands into wheel and turret control.',
			href: '/projects/hamr'
		},
		{
			name: 'RL-VLA',
			number: '02',
			question: 'A correction around a frozen policy',
			path: 'Base action + bounded correction',
			body: 'A frozen base policy proposes actions. A residual actor learns bounded corrections around them. The current experiments exercise the training and evaluation pipeline; they do not yet establish improved robot performance.',
			href: '/projects/rl-vla'
		},
		{
			name: 'F1-3DGS',
			number: '03',
			question: 'Building a scene from observations',
			path: 'RGB-D capture → scene reconstruction',
			body: 'RGB and depth captures provide observations for a reconstruction workflow. The camera images shown here are inputs to that work, a look at how the scene is collected before it becomes a representation.',
			href: '/projects/f1-3dgs'
		}
	];
	const sheets = [
		{
			name: 'HAMR',
			caption: 'Dual-camera caster observations',
			kind: 'Observation',
			src: '/images/projects/hamr/caster-tracking.png',
			alt: 'Feature tracks from cameras observing the motion of a spherical caster',
			description: 'Visual measurements meet the mechanics of a spherical caster.',
			href: '/projects/hamr'
		},
		{
			name: 'F1-3DGS',
			caption: 'RGB input for scene reconstruction',
			kind: 'Capture',
			src: '/images/projects/f1-3dgs/levine-rgb-capture.png',
			alt: 'An RGB camera capture of the Levine environment used as reconstruction input',
			description: 'One view into the environment being captured and reconstructed.',
			href: '/projects/f1-3dgs'
		},
		{
			name: 'RL-VLA',
			caption: 'Policy and residual schematic',
			kind: 'Schematic',
			src: '/images/projects/rl-vla/residual-policy.svg',
			alt: 'Schematic combining the frozen base policy action and a learned residual correction',
			description: 'A small diagram of where learned corrections enter the action pipeline.',
			href: '/projects/rl-vla'
		}
	];
	$: current = sheets[selected];

	function moveSheet(direction: number) {
		selected = (selected + direction + sheets.length) % sheets.length;
	}

	function sheetStyle(index: number) {
		const depth = (index - selected + sheets.length) % sheets.length;
		const angles = [-2, 5, -7];
		const offsets = [0, 11, -10];
		return `--angle:${angles[depth]}deg;--x:${offsets[depth]}px;--y:${depth * 7}px;z-index:${sheets.length - depth};`;
	}
</script>

<div class="project-objects" class:still={!motion}>
	{#if notes}
		<section
			id="process-notes"
			class="object-section process-notes"
			aria-labelledby="process-notes-title"
		>
			<div class="section-heading">
				<h2 id="process-notes-title">Behind the work</h2>
				<span>Process notes</span>
			</div>
			<div class="notes-list">
				{#each processNotes as note}
					<details>
						<summary
							><span class="note-number">{note.number}</span><span class="note-heading"
								><span class="note-project">{note.name}</span><span class="note-question"
									>{note.question}</span
								></span
							><span class="note-toggle" aria-hidden="true"></span></summary
						>
						<div class="note-body">
							<p class="note-path">{note.path}</p>
							<p>{note.body}</p>
							<a href={note.href}>Explore the project <span aria-hidden="true">↗</span></a>
						</div>
					</details>
				{/each}
			</div>
		</section>
	{/if}

	{#if contact}
		<section
			id="contact-sheet"
			class="object-section contact-sheet"
			aria-labelledby="contact-sheet-title"
		>
			<div class="section-heading">
				<h2 id="contact-sheet-title">From the workbench</h2>
				<span>Collected fragments</span>
			</div>
			<figure class="sheet-layout">
				<div class="sheet-stage">
					{#each sheets as sheet, index}
						<a
							class="sheet"
							class:top-sheet={index === selected}
							href={sheet.href}
							style={sheetStyle(index)}
							tabindex={index === selected ? 0 : -1}
							aria-hidden={index !== selected ? 'true' : undefined}
							aria-label={`Open ${sheet.name}: ${sheet.caption}`}
						>
							<img src={sheet.src} alt={sheet.alt} loading="lazy" />
							<span class="sheet-strip"
								><span>{sheet.name}</span><span>{String(index + 1).padStart(2, '0')} / 03</span
								></span
							>
						</a>
					{/each}
				</div>
				<figcaption>
					<div class="sheet-caption" aria-live="polite" aria-atomic="true">
						<span class="sheet-kind">{current.kind}</span>
						<h3>{current.caption}</h3>
						<p>{current.description}</p>
					</div>
					<div class="sheet-controls">
						<button
							type="button"
							on:click={() => moveSheet(-1)}
							aria-label="Previous workbench image"><span aria-hidden="true">←</span></button
						><span class="sheet-count" aria-hidden="true"
							>{String(selected + 1).padStart(2, '0')}<span>/</span>03</span
						><button type="button" on:click={() => moveSheet(1)} aria-label="Next workbench image"
							><span aria-hidden="true">→</span></button
						>
					</div>
				</figcaption>
			</figure>
		</section>
	{/if}

	{#if signature}
		<section
			id="mechanical-signature"
			class="mechanical-signature"
			aria-label="Mechanical signature"
		>
			<button
				type="button"
				class="wheel-button"
				title="Turn the wheel"
				aria-label="Turn the wheel"
				on:click={() => (wheelTurn += 90)}
			>
				<svg viewBox="0 0 80 80" aria-hidden="true"
					><g class="wheel" style={`transform:rotate(${wheelTurn}deg)`}
						><circle cx="40" cy="40" r="25" /><ellipse cx="40" cy="40" rx="12" ry="25" /><ellipse
							cx="40"
							cy="40"
							rx="25"
							ry="9"
						/><path d="M40 15v50m-25-25h50" /><circle
							class="wheel-point"
							cx="40"
							cy="15"
							r="2.3"
						/></g
					><path class="wheel-ground" d="M18 70h44m-32 4h20" /></svg
				>
			</button>
			<p>Keep turning.</p>
		</section>
	{/if}
</div>

<style>
	.project-objects {
		min-width: 0;
		color: #bec7d1;
	}
	.object-section {
		margin-top: 62px;
		scroll-margin-top: 36px;
	}
	.section-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 25px;
	}
	.section-heading h2 {
		margin: 0;
		color: #ebeef2;
		font-size: 1rem;
		line-height: 1.5;
		font-weight: 500;
		letter-spacing: -0.015em;
	}
	.section-heading > span {
		color: #9aa5b3;
		font-family: 'Fira Mono', monospace;
		font-size: 0.59rem;
		line-height: 1.5;
	}
	.notes-list {
		border-top: 1px solid #363e48;
	}
	details {
		border-bottom: 1px solid #363e48;
	}
	summary {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 21px 0;
		list-style: none;
		cursor: pointer;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	.note-number {
		flex-shrink: 0;
		width: 21px;
		color: #8e9ca9;
		font-family: 'Fira Mono', monospace;
		font-size: 0.59rem;
	}
	.note-heading {
		display: grid;
		gap: 5px;
		flex: 1;
	}
	.note-project {
		color: #9bc4ce;
		font-family: 'Fira Mono', monospace;
		font-size: 0.56rem;
		letter-spacing: 0.035em;
	}
	.note-question {
		color: #d8dfe5;
		font-size: 0.83rem;
		line-height: 1.5;
		transition: color 180ms;
	}
	summary:hover .note-question {
		color: #ffffff;
	}
	.note-toggle {
		position: relative;
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		margin-left: 7px;
		color: #9aa5b3;
	}
	.note-toggle::before,
	.note-toggle::after {
		content: '';
		position: absolute;
		left: 4px;
		top: 8px;
		width: 10px;
		height: 1px;
		background: currentColor;
		transition: transform 200ms;
	}
	.note-toggle::after {
		transform: rotate(90deg);
	}
	details[open] .note-toggle::after {
		transform: rotate(0);
	}
	.note-body {
		padding: 0 30px 24px 41px;
		max-width: 650px;
	}
	.note-body p {
		margin: 0 0 15px;
		font-size: 0.79rem;
		line-height: 1.8;
		color: #bec7d1;
	}
	.note-body .note-path {
		color: #9bc4ce;
		font-family: 'Fira Mono', monospace;
		font-size: 0.63rem;
		line-height: 1.7;
	}
	.note-body a {
		display: inline-flex;
		align-items: center;
		gap: 13px;
		color: #d3dce3;
		font-size: 0.7rem;
		line-height: 1.6;
		text-decoration: none;
	}
	.note-body a:hover {
		color: #9bc4ce;
	}
	.sheet-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		align-items: center;
		gap: 34px;
		margin: 0;
		padding: 18px 12px 12px 14px;
	}
	.sheet-stage {
		position: relative;
		height: 222px;
		min-width: 0;
	}
	.sheet {
		position: absolute;
		inset: 0 0 13px;
		display: flex;
		flex-direction: column;
		padding: 8px 8px 0;
		background: #292f36;
		border: 1px solid #4c5560;
		border-radius: 4px;
		color: #bec7d1;
		text-decoration: none;
		pointer-events: none;
		transform: translate(var(--x), var(--y)) rotate(var(--angle));
		box-shadow: 0 8px 25px #00000023;
		transition:
			transform 480ms cubic-bezier(0.22, 1, 0.36, 1),
			border-color 200ms,
			box-shadow 200ms;
	}
	.top-sheet {
		pointer-events: auto;
	}
	.top-sheet:hover {
		border-color: #8ea8b0;
		box-shadow: 0 14px 28px #00000035;
		transform: translate(var(--x), -3px) rotate(-1deg);
	}
	.sheet img {
		width: 100%;
		height: 0;
		min-height: 0;
		flex: 1;
		display: block;
		object-fit: contain;
		background: #171b20;
		border: 1px solid #ffffff05;
	}
	.sheet-strip {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		padding: 10px 3px;
		color: #bdc7d0;
		font-family: 'Fira Mono', monospace;
		font-size: 0.53rem;
		line-height: 1.3;
		letter-spacing: 0.03em;
	}
	.sheet-strip > span:last-child {
		color: #8f9daa;
	}
	figcaption {
		min-width: 0;
		padding: 0 0 8px;
	}
	.sheet-kind {
		color: #9bc4ce;
		font-family: 'Fira Mono', monospace;
		font-size: 0.58rem;
	}
	.sheet-caption {
		min-height: 139px;
	}
	.sheet-caption h3 {
		margin: 11px 0 11px;
		color: #ebeef2;
		font-size: 1.02rem;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: -0.018em;
	}
	.sheet-caption p {
		color: #aab6c3;
		margin: 0;
		font-size: 0.74rem;
		line-height: 1.8;
	}
	.sheet-controls {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-top: 17px;
	}
	.sheet-controls button {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid #414c58;
		border-radius: 50%;
		background: transparent;
		color: #bdcbd6;
		font-size: 1rem;
		cursor: pointer;
		transition:
			border-color 180ms,
			background 180ms,
			color 180ms;
	}
	.sheet-controls button:hover {
		border-color: #7f9ca8;
		background: #9bc4ce09;
		color: #ffffff;
	}
	.sheet-count {
		display: flex;
		gap: 9px;
		font-family: 'Fira Mono', monospace;
		font-size: 0.58rem;
		color: #aebbc7;
		font-variant-numeric: tabular-nums;
	}
	.sheet-count > span {
		color: #657687;
	}
	.mechanical-signature {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		margin: 59px 0 4px;
	}
	.wheel-button {
		width: 69px;
		height: 69px;
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: 50%;
		color: #8fabb6;
		cursor: pointer;
		transition: color 200ms;
	}
	.wheel-button:hover {
		color: #c2dce0;
	}
	.wheel-button svg {
		width: 100%;
		height: 100%;
		fill: none;
		stroke: currentColor;
		stroke-width: 0.85;
	}
	.wheel {
		transform-origin: 40px 40px;
		transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	.wheel-point {
		fill: #9bc4ce;
		stroke: #1c2026;
		stroke-width: 1.5;
	}
	.wheel-ground {
		opacity: 0.38;
	}
	.mechanical-signature p {
		margin: 0;
		color: #a2afbb;
		font-family: 'Fira Mono', monospace;
		font-size: 0.58rem;
		letter-spacing: 0.03em;
		line-height: 1.7;
	}
	.still .sheet,
	.still .wheel,
	.still .note-toggle::after,
	.still .note-toggle::before {
		transition: none;
	}
	@media (max-width: 640px) {
		.section-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 3px;
			margin-bottom: 20px;
		}
		.sheet-layout {
			grid-template-columns: 1fr;
			gap: 29px;
			padding: 13px 15px 0;
		}
		.sheet-stage {
			width: 100%;
			max-width: 360px;
			height: 232px;
			margin: 0 auto;
		}
		figcaption {
			padding: 0 3px;
		}
		.sheet-caption {
			min-height: 0;
		}
		.sheet-caption h3 {
			font-size: 0.96rem;
			margin-top: 7px;
		}
		.sheet-controls {
			margin-top: 17px;
		}
		.object-section {
			margin-top: 46px;
		}
		summary {
			gap: 12px;
		}
		.note-body {
			padding-left: 33px;
			padding-right: 9px;
		}
		.note-question {
			font-size: 0.78rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.sheet,
		.wheel,
		.wheel-button,
		.note-toggle::after,
		.note-toggle::before,
		.sheet-controls button,
		.note-question {
			transition: none;
		}
	}
</style>
