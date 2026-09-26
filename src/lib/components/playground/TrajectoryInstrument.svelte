<script lang="ts">
	import { onMount } from 'svelte';

	export let enabled = true;
	export let intensity = 0.65;

	type Point = { x: number; y: number; z: number };
	let instrument: HTMLElement;
	let mounted = false;
	let visible = false;
	let pageVisible = true;
	let reducedMotion = false;
	let paused = false;
	let inclination = 38;
	let phase = 0.38;
	let pointerX = 0;
	let pointerY = 0;
	let viewX = 0;
	let viewY = 0;
	let frame = 0;
	let previousTime = 0;
	const tau = Math.PI * 2;
	const samples = 64;

	$: strength = Math.max(0, Math.min(1, intensity));
	$: moving = mounted && enabled && visible && pageVisible && !reducedMotion && !paused;
	$: reconcileAnimation(moving);
	$: yaw = 0.48 + phase * 0.12 + viewX * 0.24 * strength;
	$: pitch = -0.29 + viewY * 0.18 * strength;
	$: tilt = (inclination * Math.PI) / 180;
	$: longitudePaths = [0, Math.PI / 3, (Math.PI * 2) / 3].map((offset) =>
		makePath(
			(a) => ({
				x: Math.cos(a) * Math.cos(offset),
				y: Math.sin(a),
				z: Math.cos(a) * Math.sin(offset)
			}),
			yaw,
			pitch
		)
	);
	$: latitudePaths = [-0.48, 0, 0.48].map((height) =>
		makePath(
			(a) => {
				const radius = Math.sqrt(1 - height * height);
				return { x: Math.cos(a) * radius, y: height, z: Math.sin(a) * radius };
			},
			yaw,
			pitch
		)
	);
	$: orbitPath = makePath((a) => orbitPoint(a, tilt), yaw, pitch);
	$: marker = project(orbitPoint(phase, tilt), yaw, pitch);
	$: phaseLabel = String(Math.round(((phase % tau) / tau) * 360)).padStart(3, '0');

	function orbitPoint(angle: number, orbitTilt: number): Point {
		return {
			x: Math.cos(angle),
			y: Math.sin(angle) * Math.sin(orbitTilt),
			z: Math.sin(angle) * Math.cos(orbitTilt)
		};
	}

	function project(point: Point, rotateY: number, rotateX: number) {
		const x = point.x * Math.cos(rotateY) + point.z * Math.sin(rotateY);
		const z = -point.x * Math.sin(rotateY) + point.z * Math.cos(rotateY);
		const y = point.y * Math.cos(rotateX) - z * Math.sin(rotateX);
		return { x: 160 + x * 70, y: 93 + y * 70 };
	}

	function makePath(pointAt: (angle: number) => Point, rotateY: number, rotateX: number) {
		return (
			Array.from({ length: samples + 1 }, (_, index) => {
				const point = project(pointAt((index / samples) * tau), rotateY, rotateX);
				return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
			}).join(' ') + ' Z'
		);
	}

	function animate(time: number) {
		frame = 0;
		if (!moving) return;
		if (!previousTime) previousTime = time;
		const elapsed = time - previousTime;
		if (elapsed >= 1000 / 30) {
			phase += Math.min(elapsed, 80) * (0.00016 + strength * 0.00012);
			viewX += (pointerX - viewX) * 0.09;
			viewY += (pointerY - viewY) * 0.09;
			previousTime = time;
		}
		frame = requestAnimationFrame(animate);
	}

	function reconcileAnimation(shouldAnimate: boolean) {
		if (shouldAnimate && !frame) {
			previousTime = 0;
			frame = requestAnimationFrame(animate);
		} else if (!shouldAnimate && frame) {
			cancelAnimationFrame(frame);
			frame = 0;
			previousTime = 0;
		}
	}

	function trackPointer(event: PointerEvent) {
		if (!moving || event.pointerType === 'touch') return;
		const bounds = instrument.getBoundingClientRect();
		pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
		pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
	}

	function releasePointer() {
		pointerX = 0;
		pointerY = 0;
	}

	onMount(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotion = () => {
			reducedMotion = preference.matches;
		};
		const updateVisibility = () => {
			pageVisible = document.visibilityState === 'visible';
		};
		updateMotion();
		updateVisibility();
		preference.addEventListener('change', updateMotion);
		document.addEventListener('visibilitychange', updateVisibility);
		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
			},
			{ threshold: 0.12 }
		);
		observer.observe(instrument);
		mounted = true;
		return () => {
			mounted = false;
			cancelAnimationFrame(frame);
			observer.disconnect();
			preference.removeEventListener('change', updateMotion);
			document.removeEventListener('visibilitychange', updateVisibility);
		};
	});
</script>

<section
	class="instrument"
	bind:this={instrument}
	on:pointermove={trackPointer}
	on:pointerleave={releasePointer}
	aria-label="Interactive trajectory study"
>
	<div class="instrument-heading">
		<div>
			<h2>Trajectory study</h2>
			<p>A small experiment in motion.</p>
		</div>
		<button
			class="motion-toggle"
			type="button"
			on:click={() => (paused = !paused)}
			disabled={!enabled || reducedMotion}
			aria-label={paused ? 'Play trajectory animation' : 'Pause trajectory animation'}
			title={reducedMotion
				? 'Animation is off with reduced motion'
				: paused
					? 'Play motion'
					: 'Pause motion'}
		>
			{#if paused || reducedMotion || !enabled}
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 4 6 4-6 4Z" /></svg>
			{:else}
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 4v8M11 4v8" /></svg>
			{/if}
		</button>
	</div>
	<svg
		class="trajectory"
		viewBox="0 0 320 187"
		role="img"
		aria-label="An abstract wireframe sphere with an adjustable orbital path. Use the orbit slider below to explore its inclination."
	>
		<g class="guide" fill="none">
			<path d="M25 93h36m198 0h36M160 6v9m0 157v9" />
			<path d="M40 90v6m240-6v6M157 11h6m-6 165h6" />
			<circle cx="160" cy="93" r="82" stroke-dasharray="1 9" />
		</g>
		<circle class="silhouette" cx="160" cy="93" r="70" />
		<g class="wire" fill="none">
			{#each longitudePaths as path}<path d={path} />{/each}
			{#each latitudePaths as path}<path d={path} />{/each}
		</g>
		<path class="orbit" d={orbitPath} />
		<circle class="marker-halo" cx={marker.x} cy={marker.y} r="7" />
		<circle class="marker" cx={marker.x} cy={marker.y} r="2.7" />
		<path class="center-mark" d="M157 93h6m-3-3v6" />
	</svg>
	<div class="instrument-controls">
		<label class="orbit-control"
			><span>Orbit</span><input
				type="range"
				min="15"
				max="75"
				step="1"
				bind:value={inclination}
				aria-label="Orbital inclination"
				aria-valuetext={`${inclination} degrees`}
			/><output>{inclination}°</output></label
		>
		<div class="instrument-caption">
			<span
				>{!enabled || reducedMotion
					? 'Still study'
					: paused
						? 'Motion paused'
						: 'Parametric motion'}</span
			><span aria-label={`Phase ${phaseLabel} degrees`}>φ {phaseLabel}°</span>
		</div>
	</div>
</section>

<style>
	.instrument {
		width: 100%;
		padding: 17px 18px 14px;
		color: #bec7d1;
		background: #23293052;
		border: 1px solid #363e48;
		border-radius: 12px;
		overflow: hidden;
	}
	.instrument-heading {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
	}
	h2 {
		margin: 0;
		color: #ebeef2;
		font-size: 0.77rem;
		font-weight: 500;
		letter-spacing: 0.005em;
		line-height: 1.5;
	}
	p {
		margin: 3px 0 0;
		color: #9aa5b3;
		font-size: 0.63rem;
		line-height: 1.5;
	}
	.motion-toggle {
		display: grid;
		place-items: center;
		flex: 0 0 30px;
		width: 30px;
		height: 30px;
		margin: -3px -4px 0 0;
		border: 1px solid transparent;
		border-radius: 50%;
		background: transparent;
		color: #a9b6c3;
		cursor: pointer;
		transition:
			color 180ms,
			border-color 180ms,
			background 180ms;
	}
	.motion-toggle:hover:not(:disabled) {
		color: #ebeef2;
		border-color: #52606c;
		background: #ffffff05;
	}
	.motion-toggle:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.motion-toggle svg {
		width: 13px;
		height: 13px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.trajectory {
		display: block;
		width: calc(100% + 12px);
		height: auto;
		margin: 6px -6px 4px;
		overflow: visible;
	}
	.guide {
		stroke: #788796;
		stroke-width: 0.65;
		opacity: 0.5;
	}
	.silhouette {
		fill: #1c202620;
		stroke: #8493a5;
		stroke-width: 0.75;
		opacity: 0.42;
	}
	.wire {
		stroke: #8193a5;
		stroke-width: 0.65;
		opacity: 0.42;
	}
	.orbit {
		fill: none;
		stroke: #9bc4ce;
		stroke-width: 1.05;
		opacity: 0.88;
	}
	.marker-halo {
		fill: #9bc4ce;
		opacity: 0.08;
	}
	.marker {
		fill: #d7eced;
		stroke: #232930;
		stroke-width: 1;
	}
	.center-mark {
		stroke: #9bc4ce;
		stroke-width: 0.65;
		opacity: 0.6;
	}
	.instrument-controls {
		border-top: 1px solid #363e4870;
		padding-top: 12px;
		font-family: 'Fira Mono', monospace;
	}
	.orbit-control {
		display: grid;
		grid-template-columns: 40px 1fr 33px;
		align-items: center;
		gap: 9px;
		font-size: 0.6rem;
		color: #bac5cf;
	}
	.orbit-control input {
		width: 100%;
		min-width: 0;
		height: 18px;
		padding: 0;
		margin: 0;
		accent-color: #9bc4ce;
		cursor: ew-resize;
	}
	output {
		text-align: right;
		color: #9bc4ce;
		font-variant-numeric: tabular-nums;
	}
	.instrument-caption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding-top: 8px;
		color: #9aa5b3;
		font-size: 0.52rem;
		line-height: 1.5;
		font-variant-numeric: tabular-nums;
	}
	@media (prefers-reduced-motion: reduce) {
		.motion-toggle {
			transition: none;
		}
	}
</style>
