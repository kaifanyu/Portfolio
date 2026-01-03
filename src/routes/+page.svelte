

<script lang="ts">
	import Loading from './../lib/components/Loading.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { scrollToSection, activeSection, initScroll } from '$lib/scripts/scroll';
	import research from '$lib/scripts/research';
	import experiences from '$lib/scripts/experiences'
	import projects from '$lib/scripts/projects';
	import "./glitch.css"
	import './style.css'

	
	import { fade, slide } from 'svelte/transition'; // [cite: 22]
	
	let loading = false;
	let copied = false;
	const emailAddress = "kaifany@seas.upenn.edu"; // Replace with your actual email

	function copyEmail() {
		navigator.clipboard.writeText(emailAddress);
		copied = true;
		
		// Hide the message after 2 seconds
		setTimeout(() => {
		copied = false;
		}, 2000);
	}

    let showAllExperiences = false;
	let showAllResearch = false;
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
					<h2 class="title"> Robotics Engineer</h2>
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
					<li class="email-container">
					<button 
						class="icon email-button" 
						on:click={copyEmail} 
						aria-label="Copy email address"
					>
						<Icon name="Email" width="2rem" height="2rem"/>
					</button>

					{#if copied}
						<span class="copied-msg" transition:fade={{ duration: 200 }}>
						Email copied to clipboard
						</span>
					{/if}
					</li>
				</ul>
			</header>


			<!-- Right side with scrollable content -->
			<div class="right-container">
				<h2 class="about-title">About</h2>
			<section id="about" class="about-paragraph">
			<p>
				I am an <b>M.S.E. Robotics</b> student at the University of Pennsylvania, dedicated to building intelligent autonomous systems. 
				With a strong technical foundation in <b>C++</b> and <b>ROS2</b>, I develop robust software for robot perception and navigation. 
				Currently, my research focuses on <b>Generative World Models</b>, exploring how agents can leverage predictive dynamics for smarter decision-making in complex environments.
			</p>
			</section>


			<section id="research" class="section">
			<h2>Research</h2>
			<ol class="list">
				{#each (showAllResearch ? research : research.slice(0, 2)) as exp}
				<div transition:slide={{ duration: 300 }}>
					<a href="{exp.link}" class="section-href">
						<li class="experience">
							<div class="content">
								<header class="date">{exp.date}</header>
								<div class="details">
									<h3>
										<a href={exp.link} target="_blank" rel="noopener noreferrer">
											{exp.title} 
											<br>
											<span class="company-label">
												{exp.company}
											</span>

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
				</div>
				{/each}
			</ol>

    {#if research.length > 2}
        <div style="margin-top: 10px;">
            <button 
                class="view-all-projects" 
                style="background: none; border: none; padding: 0; font: inherit; cursor: pointer;"
                on:click={() => showAllResearch = !showAllResearch}
            >
                {showAllResearch ? 'show less' : 'view full research'}
            </button>
        </div>
    {/if}
</section>
<section id="experience" class="section">
    <h2>Experience</h2>
    <ol class="list">
        {#each (showAllExperiences ? experiences : experiences.slice(0, 2)) as exp}
        <div transition:slide={{ duration: 300 }}> 
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
        </div>
        {/each}
    </ol>

    <div style="margin-top: 10px;">
        <button 
            class="view-all-projects" 
            style="background: none; border: none; padding: 0; font: inherit; cursor: pointer;"
            on:click={() => showAllExperiences = !showAllExperiences}
        >
            {showAllExperiences ? 'show less' : 'view full experience'}
        </button>
    </div>
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
<style>
</style>