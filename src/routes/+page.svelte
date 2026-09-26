<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CelestialBackdrop from '$lib/components/playground/CelestialBackdrop.svelte';
	import { interactiveEffects } from '$lib/components/playground/effects';
	import research from '$lib/scripts/research';
	import experiences from '$lib/scripts/experiences';
	import projects from '$lib/scripts/projects';
	import { profile } from '$lib/scripts/profile';
	import './style.css';

	export let pageTitle = 'Kai Yu — Robotics & Machine Learning';
	export let atmosphere = true;

	const sections = [
		{ id: 'about', label: 'About' },
		{ id: 'research', label: 'Research' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' }
	];
	const emailAddress = 'kaifany@seas.upenn.edu';
	let activeSection = 'about';
	let showAllResearch = false;
	let showAllExperiences = false;
	let photoFailed = false;
	let copyStatus = '';
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	let mounted = false;

	onMount(() => {
		mounted = true;
		let scrollFrame = 0;

		function updateActiveSection() {
			scrollFrame = 0;
			const threshold = Math.min(window.innerHeight * 0.3, 220);
			let current = 'about';
			for (const section of sections) {
				const element = document.getElementById(section.id);
				if (element && element.getBoundingClientRect().top <= threshold) {
					current = section.id;
				}
			}
			if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
				current = 'projects';
			}
			activeSection = current;
		}

		function scheduleSectionUpdate() {
			if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateActiveSection);
		}

		updateActiveSection();
		window.addEventListener('scroll', scheduleSectionUpdate, { passive: true });
		window.addEventListener('resize', scheduleSectionUpdate, { passive: true });

		return () => {
			mounted = false;
			window.removeEventListener('scroll', scheduleSectionUpdate);
			window.removeEventListener('resize', scheduleSectionUpdate);
			if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
			if (copyTimer) clearTimeout(copyTimer);
		};
	});

	async function copyEmail() {
		if (copyTimer) clearTimeout(copyTimer);
		let message: string;
		try {
			await navigator.clipboard.writeText(emailAddress);
			message = 'Email copied to clipboard.';
		} catch {
			message = 'Copy unavailable. You can use the email link below.';
		}
		if (!mounted) return;
		copyStatus = message;
		copyTimer = setTimeout(() => {
			copyStatus = '';
		}, 5000);
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content="Kai Yu is a robotics graduate student at the University of Pennsylvania working on robot perception, control, and generative models."
	/>
</svelte:head>

<div
	class="portfolio-home"
	class:portfolio-atmosphere={atmosphere}
	use:interactiveEffects={{ enabled: atmosphere ? ['grid', 'magnet'] : [], motion: atmosphere }}
>
	{#if atmosphere}<CelestialBackdrop />{/if}
	<a class="skip-link" href="#about">Skip to content</a>

	<main class="main-container">
		<div class="container">
			<header class="left-container">
				<div>
					<div class="identity">
						<div class="profile-photo">
							{#if profile.photo && !photoFailed}
								<img
									src={profile.photo}
									alt="Kai Yu"
									width="82"
									height="88"
									on:error={() => (photoFailed = true)}
								/>
							{:else}
								<span
									class="profile-monogram"
									role="img"
									aria-label="Profile photo placeholder for Kai Yu">KY</span
								>
							{/if}
						</div>
						<div>
							<h1><a class="name" href="/">Kai Yu</a></h1>
							<p class="title">Robotics Engineer</p>
						</div>
					</div>
					<p class="hero-description">Building systems that perceive, learn, and move.</p>
					<p class="affiliation">M.S.E. Robotics · University of Pennsylvania</p>
					<div class="research-groups" aria-label="Research groups">
						<a href="#research">ModLab</a>
						<span aria-hidden="true">·</span>
						<a href="#research">xLAB</a>
					</div>

					<nav class="nav-section" aria-label="Page sections">
						<ul>
							{#each sections as section}
								<li>
									<a
										href={'#' + section.id}
										class="indicator"
										class:active={activeSection === section.id}
										aria-current={activeSection === section.id ? 'location' : undefined}
									>
										<span class="nav-indicator" aria-hidden="true"></span>
										<span class="nav-text">{section.label}</span>
									</a>
								</li>
							{/each}
						</ul>
					</nav>
					<a
						class="notebook-link"
						href="https://www.thejoyestboy.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span
							><strong>Blog &amp; paper collection</strong><span
								>Reading notes, concepts, and writing</span
							></span
						>
						<span class="notebook-arrow" aria-hidden="true">↗</span>
					</a>
				</div>

				<div class="contact-block">
					<ul class="social-media">
						<li>
							<a
								class="icon"
								href="https://github.com/kaifanyu"
								aria-label="GitHub"
								target="_blank"
								rel="noopener noreferrer"><Icon name="Github" width="1.6rem" height="1.6rem" /></a
							>
						</li>
						<li>
							<a
								class="icon"
								href="https://www.linkedin.com/in/kai-yu-084a92196/"
								aria-label="LinkedIn"
								target="_blank"
								rel="noopener noreferrer"><Icon name="LinkedIn" width="1.6rem" height="1.6rem" /></a
							>
						</li>
						<li>
							<button
								type="button"
								class="icon email-button"
								aria-label="Copy email address"
								on:click={copyEmail}><Icon name="Email" width="1.6rem" height="1.6rem" /></button
							>
						</li>
						<li><ThemeToggle /></li>
					</ul>
					<a class="email-link" href={'mailto:' + emailAddress}>{emailAddress}</a>
					<p class="contact-status" role="status" aria-live="polite">{copyStatus}</p>
				</div>
			</header>

			<div class="right-container">
				<slot name="before-about" />
				<section
					id="about"
					class="section about-paragraph"
					aria-labelledby="about-heading"
					tabindex="-1"
				>
					<h2 id="about-heading" class="section-heading">
						<span class="section-number" aria-hidden="true">01</span> About
					</h2>
					<p>
						I'm an M.S.E. Robotics student at the University of Pennsylvania, working on robot
						learning and autonomy. My research spans generative world models with
						<a href="#research">Jiatao Gu's group</a>, image-based policy learning at
						<a href="#research">xLAB</a>, and perception and control for HAMR at
						<a href="#research">ModLab</a>.
					</p>
					<p>
						I'm currently interested in using in-context learning and world models to build robotic
						policies that adapt to new tasks and environments.
					</p>
				</section>

				<slot name="after-about" />

				<section id="research" class="section" aria-labelledby="research-heading">
					<h2 id="research-heading" class="section-heading">
						<span class="section-number" aria-hidden="true">02</span> Research
					</h2>
					<ol id="research-list" class="list research-list">
						{#each showAllResearch ? research : research.slice(0, 3) as entry}
							<li class="research-entry">
								<div class="entry-meta">
									<span>{entry.company}</span>
									<span class="date">{entry.date}</span>
								</div>
								<h3>
									{#if entry.link}
										<a
											href={entry.link}
											target={entry.link.startsWith('http') ? '_blank' : undefined}
											rel={entry.link.startsWith('http') ? 'noopener noreferrer' : undefined}
											>{entry.title} <span aria-hidden="true">↗</span></a
										>
									{:else}
										{entry.title}
									{/if}
								</h3>
								<p>{entry.description}</p>
							</li>
						{/each}
					</ol>
					{#if research.length > 3}
						<button
							type="button"
							class="text-link"
							aria-expanded={showAllResearch}
							aria-controls="research-list"
							on:click={() => (showAllResearch = !showAllResearch)}
							>{showAllResearch ? 'Show less research' : 'Show earlier research'}
							<span aria-hidden="true">{showAllResearch ? '−' : '+'}</span></button
						>
					{/if}
				</section>

				<slot name="after-research" />

				<section id="experience" class="section" aria-labelledby="experience-heading">
					<h2 id="experience-heading" class="section-heading">
						<span class="section-number" aria-hidden="true">03</span> Experience
					</h2>
					<ol id="experience-list" class="list experience-list">
						{#each showAllExperiences ? experiences : experiences.slice(0, 2) as entry}
							<li class="experience-entry">
								<div class="entry-meta">
									<span>{entry.company}</span>
									<span class="date">{entry.date}</span>
								</div>
								<h3>
									{#if entry.link}
										<a
											href={entry.link}
											target={entry.link.startsWith('http') ? '_blank' : undefined}
											rel={entry.link.startsWith('http') ? 'noopener noreferrer' : undefined}
											>{entry.title} <span aria-hidden="true">↗</span></a
										>
									{:else}
										{entry.title}
									{/if}
								</h3>
								<p>{entry.description}</p>
								<ul class="technologies" aria-label="Experience technologies">
									{#each entry.technologies as technology}
										<li>{technology}</li>
									{/each}
								</ul>
							</li>
						{/each}
					</ol>
					{#if experiences.length > 2}
						<button
							type="button"
							class="text-link"
							aria-expanded={showAllExperiences}
							aria-controls="experience-list"
							on:click={() => (showAllExperiences = !showAllExperiences)}
							>{showAllExperiences ? 'Show less experience' : 'Show earlier experience'}
							<span aria-hidden="true">{showAllExperiences ? '−' : '+'}</span></button
						>
					{/if}
				</section>

				<section id="projects" class="section" aria-labelledby="projects-heading">
					<h2 id="projects-heading" class="section-heading">
						<span class="section-number" aria-hidden="true">04</span> Selected projects
					</h2>
					<slot name="before-projects" />
					<div class="project-list">
						{#each projects.filter((project) => project.featured) as project}
							<ProjectCard {project} />
						{/each}
					</div>
					<a class="text-link archive-link" href="/projects"
						>View all projects <span aria-hidden="true">↗</span></a
					>
				</section>

				<slot name="after-projects" />

				<footer class="site-footer">
					<span>Kai Yu</span>
					<span>Robotics &amp; machine learning</span>
				</footer>
			</div>
		</div>
	</main>
</div>
