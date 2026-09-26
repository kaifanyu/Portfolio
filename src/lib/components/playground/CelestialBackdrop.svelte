<script lang="ts">
	export let stars = true;
	export let orbits = true;
	export let constellations = true;
	export let telescope = true;
	export let intensity = 0.65;

	// Deliberately placed points keep the reading column clear; nothing is random or animated.
	const points = [
		{ x: '5.4%', y: '3%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '2.5%', y: '11%', size: 8, kind: 'spark', zone: 'edge' },
		{ x: '7.1%', y: '18%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '3.8%', y: '28%', size: 2.5, kind: 'point', zone: 'edge' },
		{ x: '6.8%', y: '37%', size: 7, kind: 'spark', zone: 'edge' },
		{ x: '1.9%', y: '46%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '5.1%', y: '62%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '2.3%', y: '75%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '7.2%', y: '91%', size: 9, kind: 'spark', zone: 'edge' },
		{ x: '3.3%', y: '97%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '95.8%', y: '6%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '98.4%', y: '14%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '93.2%', y: '24%', size: 8, kind: 'spark', zone: 'edge' },
		{ x: '97.1%', y: '32%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '95.2%', y: '46%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '98.1%', y: '66%', size: 9, kind: 'spark', zone: 'edge' },
		{ x: '94.4%', y: '78%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '97.6%', y: '89%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '93.8%', y: '95%', size: 2, kind: 'point', zone: 'edge' },
		{ x: 'calc(50% - 215px)', y: '8%', size: 1.5, kind: 'point', zone: 'gutter' },
		{ x: 'calc(50% - 224px)', y: '21%', size: 7, kind: 'spark', zone: 'gutter' },
		{ x: 'calc(50% - 190px)', y: '35%', size: 2, kind: 'point', zone: 'gutter' },
		{ x: 'calc(50% - 220px)', y: '52%', size: 1.5, kind: 'point', zone: 'gutter' },
		{ x: 'calc(50% - 197px)', y: '70%', size: 7, kind: 'spark', zone: 'gutter' },
		{ x: 'calc(50% - 221px)', y: '87%', size: 2, kind: 'point', zone: 'gutter' },
		{ x: '4.2%', y: '7%', size: 1.2, kind: 'point', zone: 'edge' },
		{ x: '96.8%', y: '10%', size: 6, kind: 'spark', zone: 'edge' },
		{ x: '3.1%', y: '22%', size: 1.8, kind: 'point', zone: 'edge' },
		{ x: '96.3%', y: '28%', size: 1.3, kind: 'point', zone: 'edge' },
		{ x: '5.8%', y: '33%', size: 1.2, kind: 'point', zone: 'edge' },
		{ x: '94.8%', y: '38%', size: 6, kind: 'spark', zone: 'edge' },
		{ x: '3.5%', y: '42%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '97.7%', y: '43%', size: 1.3, kind: 'point', zone: 'edge' },
		{ x: '5.9%', y: '49%', size: 6, kind: 'spark', zone: 'edge' },
		{ x: '94.1%', y: '53%', size: 1.8, kind: 'point', zone: 'edge' },
		{ x: '2.7%', y: '57%', size: 1.4, kind: 'point', zone: 'edge' },
		{ x: '97.4%', y: '59%', size: 7, kind: 'spark', zone: 'edge' },
		{ x: '6.3%', y: '67%', size: 6, kind: 'spark', zone: 'edge' },
		{ x: '96.1%', y: '71%', size: 1.5, kind: 'point', zone: 'edge' },
		{ x: '4.1%', y: '72%', size: 2, kind: 'point', zone: 'edge' },
		{ x: '3.2%', y: '82%', size: 7, kind: 'spark', zone: 'edge' },
		{ x: '98.2%', y: '84%', size: 1.3, kind: 'point', zone: 'edge' },
		{ x: '5.7%', y: '87%', size: 1.6, kind: 'point', zone: 'edge' },
		{ x: '96.2%', y: '92%', size: 6, kind: 'spark', zone: 'edge' },
		{ x: '2.1%', y: '95%', size: 1.3, kind: 'point', zone: 'edge' },
		{ x: 'calc(50% - 208px)', y: '43%', size: 1.3, kind: 'point', zone: 'gutter' },
		{ x: 'calc(50% - 227px)', y: '61%', size: 6, kind: 'spark', zone: 'gutter' },
		{ x: 'calc(50% - 205px)', y: '78%', size: 1.4, kind: 'point', zone: 'gutter' },
		{ x: 'calc(50% - 214px)', y: '96%', size: 6, kind: 'spark', zone: 'gutter' }
	];

	// Alternating margin drawings carry the sky through the lower sections.
	const lowerConstellations = [
		{
			position: 'lyra',
			path: 'M25 24 69 65 42 124 80 181 36 218M69 65l26 43',
			points: [
				[25, 24],
				[69, 65],
				[42, 124],
				[80, 181],
				[36, 218],
				[95, 108]
			]
		},
		{
			position: 'sail',
			path: 'M76 22 29 76 74 108 49 174 88 220M29 76l20 98',
			points: [
				[76, 22],
				[29, 76],
				[74, 108],
				[49, 174],
				[88, 220]
			]
		},
		{
			position: 'arc',
			path: 'M29 20 68 59 84 119 49 163 24 216M68 59l-40 56',
			points: [
				[29, 20],
				[68, 59],
				[84, 119],
				[49, 163],
				[24, 216],
				[28, 115]
			]
		},
		{
			position: 'kite',
			path: 'M54 20 21 79 72 118 96 69 54 20M72 118l-27 55 31 46',
			points: [
				[54, 20],
				[21, 79],
				[72, 118],
				[96, 69],
				[45, 173],
				[76, 219]
			]
		}
	];

	$: strength = Math.min(1, Math.max(0, Number.isFinite(intensity) ? intensity : 0.65));
</script>

<div class="celestial-background" aria-hidden="true" style:opacity={strength}>
	{#if stars}
		<div class="starfield" data-decoration="stars">
			{#each points as point}
				<span
					class="star {point.kind} {point.zone}"
					style:left={point.x}
					style:top={point.y}
					style:width={`${point.size}px`}
					style:height={`${point.size}px`}
				>
					{#if point.kind === 'spark'}
						<svg viewBox="0 0 16 16" fill="none" focusable="false">
							<path d="M8 1v14M1 8h14" />
							<circle cx="8" cy="8" r="1.3" />
						</svg>
					{/if}
				</span>
			{/each}
		</div>
	{/if}

	{#if orbits}
		<div class="orbital-field" data-decoration="orbits">
			<svg class="orbit orbit--rising" viewBox="0 0 460 620" fill="none" focusable="false">
				<g transform="rotate(-24 230 310)">
					<ellipse cx="230" cy="310" rx="150" ry="266" />
					<ellipse class="secondary" cx="230" cy="310" rx="113" ry="226" />
					<path class="calibration" d="M230 34v16m0 520v16M69 310h16m290 0h16" />
					<circle class="orbital-body" cx="80" cy="310" r="4" />
				</g>
			</svg>
			<svg class="orbit orbit--setting" viewBox="0 0 510 500" fill="none" focusable="false">
				<g transform="rotate(32 255 250)">
					<ellipse cx="255" cy="250" rx="201" ry="132" />
					<ellipse class="secondary" cx="255" cy="250" rx="233" ry="157" />
					<path class="calibration" d="M255 79v20m0 302v20M8 250h20m454 0h20" />
					<circle class="orbital-body" cx="456" cy="250" r="3.5" />
				</g>
			</svg>
			<svg class="orbit orbit--small" viewBox="0 0 100 132" fill="none" focusable="false">
				<ellipse cx="50" cy="66" rx="25" ry="55" transform="rotate(29 50 66)" />
				<circle cx="50" cy="66" r="3" />
				<circle class="orbital-body" cx="74.5" cy="25" r="2.5" />
			</svg>
		</div>
	{/if}

	{#if constellations}
		<div class="constellation-field" data-decoration="constellations">
			<svg
				class="constellation constellation--ascending"
				viewBox="0 0 112 246"
				fill="none"
				focusable="false"
			>
				<path class="joining-line" d="m25 216 36-47-34-53 47-39-17-50M61 169l35-23" />
				<g class="stellar-points">
					<circle cx="25" cy="216" r="1.9" />
					<circle cx="61" cy="169" r="2.3" />
					<circle cx="27" cy="116" r="1.6" />
					<circle cx="74" cy="77" r="2" />
					<circle cx="57" cy="27" r="1.8" />
					<circle cx="96" cy="146" r="1.2" />
					<circle cx="13" cy="60" r="0.9" />
					<circle cx="95" cy="225" r="0.8" />
				</g>
				<circle class="stellar-ring" cx="61" cy="169" r="7" />
			</svg>
			<svg
				class="constellation constellation--falling"
				viewBox="0 0 124 286"
				fill="none"
				focusable="false"
			>
				<path class="joining-line" d="m76 19-39 54 44 55-30 51 46 61M37 73l-17 59 31 47-27 86" />
				<g class="stellar-points">
					<circle cx="76" cy="19" r="1.5" />
					<circle cx="37" cy="73" r="2.4" />
					<circle cx="81" cy="128" r="1.6" />
					<circle cx="51" cy="179" r="2.1" />
					<circle cx="97" cy="240" r="1.8" />
					<circle cx="20" cy="132" r="1.1" />
					<circle cx="24" cy="265" r="1.4" />
					<circle cx="109" cy="62" r="0.7" />
					<circle cx="108" cy="194" r="0.9" />
				</g>
				<path class="stellar-spark" d="M37 66v14m-7-7h14" />
			</svg>
			{#each lowerConstellations as cluster}
				<svg
					class="constellation constellation--{cluster.position}"
					viewBox="0 0 112 240"
					fill="none"
					focusable="false"
				>
					<path class="joining-line" d={cluster.path} />
					<g class="stellar-points">
						{#each cluster.points as [x, y], index}
							<circle cx={x} cy={y} r={index === 1 ? 2.2 : 1.5} />
						{/each}
						<circle cx="9" cy="146" r="0.8" />
						<circle cx="103" cy="202" r="0.7" />
					</g>
				</svg>
			{/each}
		</div>
	{/if}
</div>

{#if telescope}
	<svg
		class="telescope"
		data-decoration="telescope"
		aria-hidden="true"
		style={`--sky-strength: ${strength}`}
		viewBox="0 0 144 210"
		fill="none"
		focusable="false"
	>
		<!-- A small original refractor drawing, aimed into the quiet outer margin. -->
		<g class="telescope-instrument">
			<g transform="rotate(-32 77 65)">
				<path d="M30 53h77v24H30zM107 49h14v32h-14zM19 59h11v12H19zM12 57h7v16h-7z" />
				<path d="M59 53v24m9-24v24m48-27v30M55 48h26v-6H55zm6 0v5m14-5v5" />
				<path class="telescope-detail" d="M35 57h19m21 0h26m-64 16h15" />
			</g>
			<path d="M76 82v15m-9 0h18v8H67zm9 8v74m-5-74-33 86m45-86 32 86M68 133h16M39 182h7m60 0h7" />
			<path d="M79 92h17l5 8m-26 6-9 18m-19 33h58" />
			<circle cx="76" cy="91" r="4" />
		</g>
		<path class="telescope-ground" d="M20 197h103m-74 6h52" />
		<path class="telescope-star" d="M22 22v10m-5-5h10" />
		<circle class="telescope-star" cx="42" cy="14" r="1" />
	</svg>
{/if}

<style>
	.celestial-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
		user-select: none;
		color: var(--sky-color);
		contain: paint;
	}

	.starfield,
	.orbital-field,
	.constellation-field {
		position: absolute;
		inset: 0;
	}

	svg {
		display: block;
		stroke: currentColor;
		stroke-width: 0.9;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.star {
		position: absolute;
		display: block;
		opacity: 0.45;
	}

	.point {
		border-radius: 50%;
		background: currentColor;
	}

	.spark {
		opacity: 0.38;
	}

	.star svg {
		width: 100%;
		height: 100%;
		stroke-width: 1;
	}

	.orbit {
		position: absolute;
		opacity: 0.29;
	}

	.orbit--rising {
		top: 172px;
		right: -246px;
		width: 440px;
		mask-image: linear-gradient(to right, transparent 15%, #000 54%);
	}

	.orbit--setting {
		top: 44%;
		left: -319px;
		width: 450px;
	}

	.orbit--small {
		top: 87%;
		left: calc(50% - 264px);
		width: 86px;
		opacity: 0.2;
	}

	.secondary {
		opacity: 0.46;
	}

	.calibration {
		opacity: 0.65;
	}

	.orbital-body {
		fill: var(--background-color);
	}

	.constellation {
		position: absolute;
		width: 100px;
	}

	.constellation--ascending {
		top: 18%;
		left: max(12px, calc(50% - 702px));
	}

	.constellation--falling {
		top: 34%;
		right: max(7px, calc(50% - 713px));
		width: 92px;
	}

	.constellation--lyra,
	.constellation--arc {
		left: max(12px, calc(50% - 702px));
		width: 96px;
	}

	.constellation--sail,
	.constellation--kite {
		right: max(7px, calc(50% - 713px));
		width: 90px;
	}

	.constellation--lyra {
		top: 49%;
	}
	.constellation--sail {
		top: 64%;
	}
	.constellation--arc {
		top: 78%;
	}
	.constellation--kite {
		top: calc(100% - 235px);
	}

	.joining-line {
		opacity: 0.3;
		stroke-width: 0.8;
	}

	.stellar-points {
		fill: currentColor;
		stroke: none;
		opacity: 0.55;
	}

	.stellar-ring,
	.stellar-spark {
		opacity: 0.2;
	}

	.telescope {
		position: fixed;
		bottom: max(16px, env(safe-area-inset-bottom));
		left: max(16px, env(safe-area-inset-left));
		z-index: 0;
		width: 96px;
		color: var(--sky-color);
		opacity: calc(var(--sky-strength, 0.65) * 0.34);
		pointer-events: none;
		user-select: none;
		stroke-width: 1;
	}

	.telescope-detail,
	.telescope-ground {
		opacity: 0.45;
	}

	.telescope-star {
		opacity: 0.8;
	}

	@media (max-width: 1250px) {
		.gutter,
		.orbit--small {
			display: none;
		}

		.constellation--ascending,
		.constellation--lyra,
		.constellation--arc {
			left: -38px;
			opacity: 0.7;
		}

		.constellation--falling,
		.constellation--sail,
		.constellation--kite {
			right: -38px;
			opacity: 0.7;
		}

		.telescope {
			width: 84px;
			opacity: calc(var(--sky-strength, 0.65) * 0.25);
		}
	}

	@media (max-width: 700px) {
		.star {
			opacity: 0.3;
		}

		.orbit--rising {
			top: 210px;
			right: -321px;
			width: 380px;
			opacity: 0.19;
		}

		.orbit--setting {
			left: -353px;
			width: 400px;
			opacity: 0.15;
		}

		.constellation--ascending,
		.constellation--lyra,
		.constellation--arc {
			left: -55px;
			width: 78px;
			opacity: 0.5;
		}

		.constellation--falling,
		.constellation--sail,
		.constellation--kite {
			right: -53px;
			width: 78px;
			opacity: 0.5;
		}

		.telescope {
			width: 64px;
			opacity: calc(var(--sky-strength, 0.65) * 0.18);
		}
	}
</style>
