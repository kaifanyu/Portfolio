

<script lang="ts">
	import Loading from './../lib/components/Loading.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { scrollToSection, activeSection, initScroll } from '$lib/scripts/scroll';
	import research from '$lib/scripts/research';
	import experiences from '$lib/scripts/experiences'
	import projects from '$lib/scripts/projects';
	import "./glitch.css"
	import './style.css'


	let loading = false;

	// setTimeout(() => {
	// 	console.log("here happen");
	// loading = false;
	// }, 1500); // 3 seconds delay

	initScroll();
  </script>
  
  
<svelte:head>
	<title>Kai</title>
</svelte:head>




{#if loading}
  <Loading />
{:else}


  <main class="main-container">

	<div class="container">
			<!-- Left side with "kai" and indicators -->
			<header class="left-container">

				<div class="paragraph">
					<!-- <h1 ><a class="name" href="/">Kai Yu</a></h1> -->
					<h1 class="hero glitch layers" data-text="Kai"> <a class="name" href="/"><span>Kai Yu</span></a></h1>
					<h2 class="title"> Software Engineer / Machine Learning Engineer</h2>
					<p>I build games, application, and AI models.</p>

					<nav class="nav-section">
						<ul>
						<li>
							<a 
							href="#about" 
							class="indicator { $activeSection === 'about' ? 'active' : '' }" 
							on:click|preventDefault={() => scrollToSection('about')}>
							<span class="nav-indicator"></span><span class="nav-text">ABOUT</span>
							</a>
						</li>
						<li>
							<a 
							href="#research" 
							class="indicator { $activeSection === 'research' ? 'active' : '' }" 
							on:click|preventDefault={() => scrollToSection('research')}>
							<span class="nav-indicator"></span><span class="nav-text">RESEARCH</span>
							</a>
						</li>
						<li>
							<a 
							href="#experience" 
							class="indicator { $activeSection === 'experience' ? 'active' : '' }" 
							on:click|preventDefault={() => scrollToSection('experience')}>
							<span class="nav-indicator"></span><span class="nav-text">EXPERIENCE</span>
							</a>
						</li>
						<li>
							<a 
							href="#projects" 
							class="indicator { $activeSection === 'projects' ? 'active' : '' }" 
							on:click|preventDefault={() => scrollToSection('projects')}>
							<span class="nav-indicator"></span><span class="nav-text">PROJECTS</span>
							</a>
						</li>
						</ul>
					</nav>
				
				</div>
					
				<ul class="social-media">
					<li>
						<a class="icon " href="https://github.com/kaifanyu" aria-label="GitHub" target="_blank"rel="noopener noreferrer">
							<Icon name="Github" width="2rem" height="2rem"/> </a>
					</li>
					<li>
						<a class="icon" href="https://www.linkedin.com/in/kai-yu-084a92196/" aria-label="GitHub" target="_blank"rel="noopener noreferrer">
							<Icon name="LinkedIn" width="2rem" height="2rem"/>
						</a>
					</li>
					<li>
						<Icon name="Email" width="2rem" height="2rem"/>
					</li>
				</ul>
			</header>


			<!-- Right side with scrollable content -->
			<div class="right-container">
				<h2 class="about-title">About</h2>
			<section id="about" class="about-paragraph">
				<p>
					My interest in computers started after playing countless video games, which sparked my curiosity about how computers and programming really worked. Since then, I've learned a lot during my time at Santa Rosa Junior College and as an undergrad at the <b>University of California, Irvine</b>. At UCI, I discovered a deep appreciation for Artificial Intelligence and its limitless potential.
						<br>
						<br>
					I graduated in 2024 with a focus on <b>Intelligent Systems</b> and have built numerous machine learning models and softwares that I believe make a meaningful impact—not just by automating tasks, but by offering solutions where it is needed the most. 
						<br>
						<br>
					My most proud works are a <b>deepfake audio classifier</b> that will reduce the harm malicious deepfake AI will cause, electricity and <b>settlement detection</b> using satellite images for underdevloped Afrian villages, and hashing <b>scraper</b> that supports an agent application in preventing predatorial behavior in school and work enviornments.
				</p>
			</section>
			

			<section id="research" class="section">
				<h2>Research </h2>
				<ol class="list">
					{#each research as exp}
					<a href="{exp.link}" class="section-href">
						<li class="experience">
							<div class="content">
							<header class="date">{exp.date}</header>
							<div class="details">
								<h3>
									<a href={exp.link} target="_blank" rel="noopener noreferrer">
										{exp.title} · {exp.company} 
										<span class="experiences-redirect-icon">
											<Icon name="Redirect" width="1rem" height="1rem"/> 
										</span>
									</a>
								</h3>
								<p>{exp.description}</p>
								<ul class="technologies">
								{#each exp.technologies as tech}
									<li>{tech}</li>
								{/each}
								</ul>
							</div>
							</div>
						</li>
					</a>
					{/each}
				  </ol>
			</section>


			<section id="experience" class="section">
				<h2>Experience</h2>
				<ol class="list">
					{#each experiences as exp}
					<a href="{exp.link}" class="section-href">
					  <li class="experience">
						<div class="content">
						  <header class="date">{exp.date}</header>
						  <div class="details">
							<h3>
							  	<a href={exp.link} target="_blank" rel="noopener noreferrer">
									{exp.title} · {exp.company} 
									<span class="experiences-redirect-icon">
										<Icon name="Redirect" width="1rem" height="1rem"/> 
									</span>
								</a>
							</h3>
							<p>{exp.description}</p>
							<ul class="technologies">
							  {#each exp.technologies as tech}
								<li>{tech}</li>
							  {/each}
							</ul>
						  </div>
						</div>
					  </li>
					</a>
					{/each}
				  </ol>
			</section>

			<section id="projects" class="section">
				<h2>Projects</h2>
				<ol class="list">
					{#each projects as project}
					<a href="{project.link}" class="section-href">

					  <li class="experience">
						<div class="project-content">
						  <img class="project-image" src={project.image}  alt="{project.alt}" />
						  <div class="details">
							<h3>
							  	<a href={project.link} target="_blank" rel="noopener noreferrer">
									{project.title}
									<span class="experiences-redirect-icon">
										<Icon name="Redirect" width="1rem" height="1rem"/> 
									</span>
								</a>
							</h3>
							<p>{project.description}</p>
							<ul class="technologies">
							  {#each project.technologies as tech}
								<li>{tech}</li>
							  {/each}
							</ul>
							
								</div>
							</div>
							<div class="project-screenshot">
								<img class="project-screenshot-image" src={project.sc1} alt="{project.alt}" />
								<img class="project-screenshot-image" src={project.sc2} alt="{project.alt}" />
								<img class="project-screenshot-image" src={project.sc3} alt="{project.alt}" />
							</div>
						</li> </a>
					{/each}
				  </ol>
				  <span>
					<a href="/projects" class="view-all-projects">view all projects</a>
				  </span>
			</section>
			</div>
	</div>
  
</main>

{/if}
