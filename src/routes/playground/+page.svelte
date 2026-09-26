<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Portfolio from '../+page.svelte';
	import CelestialBackdrop from '$lib/components/playground/CelestialBackdrop.svelte';
	import {
		experiments,
		presets,
		type ExperimentId
	} from '$lib/components/playground/celestialCatalog';
	import { interactiveEffects } from '$lib/components/playground/effects';
	import '$lib/components/playground/effects.css';
	import './playground.css';
	import './night.css';

	const storageKey = 'kai-night-studies-v1';
	let root: HTMLDivElement;
	let cabinet: HTMLDialogElement;
	let enabled: ExperimentId[] = [...presets[2].enabled];
	let favorites: ExperimentId[] = ['grid', 'magnet'];
	let skyContrast = 65;
	let motion = true;
	let reducedMotion = false;
	let ready = false;
	let status = '';
	let copiedList = '';
	let statusTimer: ReturnType<typeof setTimeout>;
	$: active = new Set(enabled);
	$: currentPreset =
		presets.find(
			(preset) =>
				preset.enabled.length === enabled.length &&
				preset.enabled.every((id) => enabled.includes(id))
		)?.id || 'custom';

	function save() {
		if (!ready) return;
		try {
			localStorage.setItem(storageKey, JSON.stringify({ enabled, favorites, motion, skyContrast }));
		} catch {
			/* The preview also works without local storage. */
		}
	}
	function announce(message: string) {
		status = message;
		clearTimeout(statusTimer);
		statusTimer = setTimeout(() => (status = ''), 4500);
	}
	function choosePreset(id: string) {
		const preset = presets.find((item) => item.id === id);
		if (!preset) return;
		enabled = [...preset.enabled];
		save();
		announce(preset.description);
	}
	function toggleExperiment(id: ExperimentId) {
		enabled = enabled.includes(id) ? enabled.filter((item) => item !== id) : [...enabled, id];
		save();
	}
	function toggleFavorite(id: ExperimentId) {
		favorites = favorites.includes(id)
			? favorites.filter((item) => item !== id)
			: [...favorites, id];
		copiedList = '';
		save();
	}
	async function tryExperiment(id: ExperimentId) {
		if (!enabled.includes(id)) enabled = [...enabled, id];
		save();
		cabinet.close();
		await tick();
		const experiment = experiments.find((item) => item.id === id)!;
		const target = root.querySelector<HTMLElement>(experiment.target);
		if (id !== 'telescope')
			target?.scrollIntoView({
				behavior: motion && !reducedMotion ? 'smooth' : 'instant',
				block: 'center'
			});
		if (id === 'magnet')
			target?.querySelector<HTMLElement>('a,button')?.focus({ preventScroll: true });
		announce(experiment.hint);
	}
	async function copyShortlist() {
		const chosen = favorites.length ? favorites : enabled;
		const list = `Portfolio interface shortlist\n${experiments
			.filter((item) => chosen.includes(item.id))
			.map((item) => `• ${item.title}`)
			.join('\n')}`;
		try {
			await navigator.clipboard.writeText(list);
			announce('Shortlist copied.');
		} catch {
			copiedList = list;
		}
	}
	onMount(() => {
		const valid = new Set(experiments.map((item) => item.id));
		try {
			const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
			if (stored) {
				if (Array.isArray(stored.enabled))
					enabled = [
						...new Set<ExperimentId>(stored.enabled.filter((id: ExperimentId) => valid.has(id)))
					];
				if (Array.isArray(stored.favorites))
					favorites = [
						...new Set<ExperimentId>(stored.favorites.filter((id: ExperimentId) => valid.has(id)))
					];
				if (typeof stored.motion === 'boolean') motion = stored.motion;
				if (typeof stored.skyContrast === 'number' && Number.isFinite(stored.skyContrast))
					skyContrast = Math.max(20, Math.min(100, stored.skyContrast));
			}
		} catch {
			/* Invalid or old preferences cannot enable unselected experiments. */
		}
		const queryPreset = new URL(location.href).searchParams.get('mode');
		if (queryPreset && presets.some((preset) => preset.id === queryPreset))
			enabled = [...presets.find((preset) => preset.id === queryPreset)!.enabled];
		const preference = matchMedia('(prefers-reduced-motion: reduce)');
		const updatePreference = () => (reducedMotion = preference.matches);
		updatePreference();
		preference.addEventListener('change', updatePreference);
		ready = true;
		return () => {
			preference.removeEventListener('change', updatePreference);
			clearTimeout(statusTimer);
		};
	});
</script>

<svelte:head><meta name="robots" content="noindex,nofollow" /></svelte:head>

<div
	class="playground night-study"
	bind:this={root}
	data-enabled={enabled.join(' ')}
	data-motion={String(motion && !reducedMotion)}
	use:interactiveEffects={{ enabled, motion }}
>
	<CelestialBackdrop
		stars={active.has('stars')}
		orbits={active.has('orbits')}
		constellations={active.has('constellations')}
		telescope={active.has('telescope')}
		intensity={skyContrast / 100}
	/>
	<header class="lab-bar">
		<a href="/" class="lab-wordmark" aria-label="Return to original portfolio"
			><span class="lab-mark" aria-hidden="true">✧</span><span
				>Night studies<small>KAI YU / A CELESTIAL SKETCHBOOK</small></span
			></a
		>
		<div class="lab-presets" role="group" aria-label="Design presets">
			{#each presets as preset}<button
					type="button"
					aria-pressed={currentPreset === preset.id}
					on:click={() => choosePreset(preset.id)}
					title={preset.description}>{preset.name}</button
				>{/each}
		</div>
		<div class="lab-actions">
			<button
				type="button"
				class="lab-motion"
				disabled={reducedMotion}
				aria-pressed={motion && !reducedMotion}
				on:click={() => {
					motion = !motion;
					save();
				}}>{reducedMotion ? 'Reduced motion' : motion ? 'Pause motion' : 'Resume motion'}</button
			><button type="button" class="lab-explore" on:click={() => cabinet.showModal()}
				>Explore <span>{experiments.length}</span><span aria-hidden="true">↗</span></button
			>
		</div>
	</header>
	<div class="lab-caption">
		<span><span class="lab-status-dot"></span>An observatory in the margins.</span><span
			>{enabled.length} details on <span class="lab-caption-divider">/</span><a href="/"
				>Original portfolio ↗</a
			></span
		>
	</div>
	<div class="lab-page"><Portfolio pageTitle="Night studies — Kai Yu" atmosphere={false} /></div>
	<p class="lab-toast" class:visible={!!status} role="status" aria-live="polite">{status}</p>

	<dialog bind:this={cabinet} class="lab-dialog lab-catalog" aria-labelledby="cabinet-title">
		<div class="lab-dialog-head">
			<div>
				<span class="lab-overline">YOUR TWO DETAILS / A LITTLE NIGHT SKY</span>
				<h2 id="cabinet-title">Choose the atmosphere.</h2>
			</div>
			<button
				type="button"
				class="lab-close"
				aria-label="Close decorations"
				on:click={() => cabinet.close()}>×</button
			>
		</div>
		<p class="lab-dialog-intro">
			Your construction lines and magnetic links, with a few celestial details to try. Toggle a
			decoration or star it for your next shortlist.
		</p>
		<label class="lab-contrast"
			><span>Sky contrast<small>From barely there to a little more visible</small></span><input
				type="range"
				min="20"
				max="100"
				step="5"
				bind:value={skyContrast}
				on:change={save}
				aria-label="Sky contrast"
			/><output>{skyContrast}%</output></label
		>
		<div class="lab-catalog-actions">
			<button type="button" on:click={copyShortlist}
				>Copy {favorites.length
					? `${favorites.length} favorite${favorites.length === 1 ? '' : 's'}`
					: 'enabled details'} ↗</button
			><button type="button" on:click={() => choosePreset('selected')}>Just my two</button>
		</div>
		{#if copiedList}<textarea readonly aria-label="Your shortlist to copy" value={copiedList}
			></textarea>{/if}
		{#each ['Your selections', 'The night sky'] as group}
			<section class="lab-experiment-group" aria-label={group}>
				<h3>{group}</h3>
				{#each experiments.filter((item) => item.group === group) as experiment}<div
						class="lab-experiment"
						class:selected={active.has(experiment.id)}
					>
						<label class="lab-toggle"
							><input
								type="checkbox"
								checked={active.has(experiment.id)}
								on:change={() => toggleExperiment(experiment.id)}
								aria-label={experiment.title}
							/><span aria-hidden="true"></span></label
						>
						<div>
							<h4>{experiment.title}</h4>
							<p>{experiment.description}</p>
							<button type="button" class="lab-try" on:click={() => tryExperiment(experiment.id)}
								>Try it <span aria-hidden="true">↗</span></button
							>
						</div>
						<button
							type="button"
							class="lab-favorite"
							aria-label={`Favorite ${experiment.title}`}
							aria-pressed={favorites.includes(experiment.id)}
							on:click={() => toggleFavorite(experiment.id)}
							>{favorites.includes(experiment.id) ? '★' : '☆'}</button
						>
					</div>{/each}
			</section>
		{/each}
		<p class="lab-footnote">The sky is still. The page is yours to read.</p>
	</dialog>
</div>
