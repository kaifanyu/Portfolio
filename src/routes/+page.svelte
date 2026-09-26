<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import research from '$lib/scripts/research';
	import experiences from '$lib/scripts/experiences';
	import projects from '$lib/scripts/projects';
	import { profile } from '$lib/scripts/profile';
	import './style.css';

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
	<title>Kai Yu — Robotics &amp; Machine Learning</title>
	<meta
		name="description"
		content="Kai Yu is a robotics graduate student at the University of Pennsylvania working on robot perception, control, and generative models."
	/>
</svelte:head>

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
					<a href="#research">Xlabs</a>
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
				</ul>
				<a class="email-link" href={'mailto:' + emailAddress}>{emailAddress}</a>
				<p class="contact-status" role="status" aria-live="polite">{copyStatus}</p>
			</div>
		</header>

		<div class="right-container">
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
					I'm an M.S.E. Robotics student at the University of Pennsylvania, working at the
					intersection of robot perception, control, and machine learning. I enjoy connecting ideas
					in code with systems that operate in the physical world.
				</p>
				<p>
					At <a href="#research">ModLab</a>, I work on HAMR's perception and control, including
					visual localization and ball-caster motion analysis. With <a href="#research">Xlabs</a>,
					I'm investigating learning signals for image-editing policies. My broader interests
					include generative world models and how agents learn to predict and act.
				</p>
			</section>

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
							{#if entry.diagram}
								<div
									class="research-diagram"
									role="img"
									aria-label="Current investigation: conditional generation guided by semantic feedback and distribution matching"
								>
									<span>Conditional generation</span>
									<span class="diagram-connector" aria-hidden="true">↔</span>
									<span>Semantic feedback</span>
									<span class="diagram-connector" aria-hidden="true">+</span>
									<span>Distribution matching</span>
								</div>
							{/if}
							<ul class="technologies" aria-label="Research technologies">
								{#each entry.technologies as technology}
									<li>{technology}</li>
								{/each}
							</ul>
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
				<div class="project-list">
					{#each projects.filter((project) => project.featured) as project}
						<ProjectCard {project} />
					{/each}
				</div>
				<a class="text-link archive-link" href="/projects"
					>View all projects <span aria-hidden="true">↗</span></a
				>
			</section>

			<footer class="site-footer">
				<span>Kai Yu</span>
				<span>Robotics &amp; machine learning</span>
			</footer>
		</div>
	</div>
</main>
