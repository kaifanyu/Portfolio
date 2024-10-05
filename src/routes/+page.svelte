

<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import stable_diffusion from '$lib/images/stable.png';
	import wav2vec from '$lib/images/wav2vec2.png';
	import minecraft from '$lib/images/minecraft.png';
	import cysafe from '$lib/images/cysafe.png';
	import settlement from '$lib/images/settlement.png';

	const research = [
		{
		date: '2024 — Present',
		title: 'Topic Modeling and Analysis',
		company: 'UC Irvine',
		description:
			"Implemented Latent Dirichlet Allocation to conduct topic modeling on collection of student admission essays",
		technologies: ['Python', 'BerTopic', 'Statistics'],
		link: 'https://netpropriate.com/',
		},	
		{
		date: '2024 — Present',
		title: 'ML Prediction on PFAS Contamination',
		company: 'UC Irvine',
		description:
			"Preprocessed Permanent Forever Chemicals data in all 50 US States for machine learning model. COnducted statiscal analysis including descriptive statisctics, trend identification, and time-series analsyis. Created visualizations like geospatial amps to help analyze data distribution and trends.",
		technologies: ['Python', 'PyTorch', 'Scipy'],
		link: 'https://netpropriate.com/',
		},	
	]
	const experiences = [
		{
		date: '2023 — Present',
		title: 'Software Engineer Intern',
		company: 'Netpropriate',
		description:
			"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
		technologies: ['Python', 'PostgreSQL'],
		link: 'https://netpropriate.com/',
		},
		{
		date: '2023 - 2024',
		title: 'STEM Insturctor',
		company: 'Dreams for Schools',
		description:
			"Co-instructed to 3-5th grade students with hands on engineering proejcts and basics",
		technologies: ['Engineering', 'Leadership'],
		link: 'https://upstatement.com',
		},
		{
		date: '2021 — 2023',
		title: 'Security Intern',
		company: 'County of Marin',
		description:
			"Assessed security risks and implemented security protocols in a team enviornment for the enterprise. Authored a 20 page security hadnbook, educating 2,400 county employees on cybersecurity threats. Conducted resaerch and created presentations for various security topics ",
		technologies: ['SQL Injection', 'XSS', 'Social Engineering'],
		link: 'https://upstatement.com',
		},
		{
		date: 'Oct — Dec 2020',
		title: 'Web Developer',
		company: "Sophie's Masasge",
		description:
			"Developed and styled website for Sophie's Massage Therapy.",
		technologies: ['React', 'JavaScript', 'HTML & CSS', 'AWS'],
		link: 'http://www.sophiemassagetherapy.com/',
		},
		{
		date: '2019 — 2020',
		title: 'Student Tutor',
		company: 'Santa Rosa Junior College',
		description:
			"Computer Science and Math tutor helping students in 1 on 1 private sessions",
		technologies: ['C++', 'Java', 'Calculus'],
		link: 'https://upstatement.com',
		},
  	];

	const projects = [
		{
			image: stable_diffusion,
			title: 'Stable Diffusin Clone',
			alt: 'Stable Diffusion Clone',
			description:
				"Implemented Latent Dirichlet Allocation to conduct topic modeling on collection of student admission essays",
			technologies: ['Python', 'PostgreSQL'],
			link: 'https://netpropriate.com/',
		},	
		{
			image: wav2vec,
			title: 'Deepfake Audio Classifier',
			alt: 'deepfake audio',
			description:
				"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
			technologies: ['Python', 'PostgreSQL'],
			link: 'https://netpropriate.com/',
		},	
		{
			image: minecraft,
			title: 'Minecraft in C++',
			alt: 'minecraft',
			description:
				"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
			technologies: ['Python', 'PostgreSQL'],
			link: 'https://netpropriate.com/',
		},	
		{
			image: cysafe,
			title: 'Cysafe',
			alt: 'cysafe',
			description:
				"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
			technologies: ['Python', 'PostgreSQL'],
			link: 'https://netpropriate.com/',
		},	
		{
			image: settlement,
			title: 'Settlement Detection',
			alt: 'settlement detection',
			description:
				"Implemented UNet3+ model for advanced electricity detection using satellite data on African settlements",
			technologies: ['Python', 'PostgreSQL'],
			link: 'https://netpropriate.com/',
		},	
	]

	
  </script>
  
  
<svelte:head>
	<title>Kai | Portfolio</title>
</svelte:head>

  <main class="main-container">

	<div class="container">
			<!-- Left side with "kai" and indicators -->
			<header class="left-container">

				<div class="paragraph">
					<h1 ><a class="name" href="/">Kai Yu</a></h1>
					<h2 class="title"> Software Engineer / Machine Learning Engineer</h2>
					<p>I build games, application, and AI models.</p>

					<nav class="nav-section">
						<ul>
							<li><a href="/" class="indicator"> <span class="nav-indicator"></span><span class="nav-text">ABOUT</span></a></li>
							<li><a href="/" class="indicator"> <span class="nav-indicator"></span><span class="nav-text">RESEARCH</span></a></li>
							<li><a href="/" class="indicator"> <span class="nav-indicator"></span><span class="nav-text">EXPERIENCE</span></a></li>
							<li><a href="/" class="indicator"> <span class="nav-indicator"></span><span class="nav-text">PROJECTS</span></a></li>
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
			<section id="about" class="about-paragraph">
				<p>I love to build and create applications and models</p>
			</section>
			
			<section id="research" class="section">
				<ol class="list">
					{#each research as exp}
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
					{/each}
				  </ol>
			</section>


			<section id="experience" class="section">
				<ol class="list">
					{#each experiences as exp}
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
					{/each}
				  </ol>
			</section>

			<section id="projects" class="section">
				<ol class="list">
					{#each projects as project}
					  <li class="experience">
						<div class="content">
						  <img class="project-image" src={project.image} width="190" height="115" alt="{project.alt}" />
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
					  </li>
					{/each}
				  </ol>
				  <span>
					<a href="/projects" class="view-all-projects">view all projects</a>
				  </span>
			</section>
			</div>
	</div>
  
</main>


<style>

	.main-container {
		display: flex;
		height: 100vh; /* Full viewport height */
		margin-left: 10%;
		margin-right: 10%;
		padding-left: 4%;
		padding-right: 4%;
	}

	/* Main container to hold both left and right divs */
	.container {
		display: flex;
		flex-grow: 1; /* Allow the container to stretch fully */
		height: fit-content;
	}

	/* Left side remains sticky */
	.left-container {
		position: sticky;
		top: 0; /* Sticks to the top of the viewport */
		max-height: 80vh;
		min-width: fit-content;
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 96px;
		padding-left: 10%;
	}

	/* Right side, scrolling area */
	.right-container {
		width: 60%;
		flex-grow: 1;
		height: fit-content;
		padding-top: 96px;
		padding-bottom: 96px;
		padding-right: 5%;
	}



	.left-container a, .left-container a:hover, .left-container a:active{
		color:inherit;
	}
	.paragraph{
		height: auto;
		margin-left: 2px;
	}
	.name{
		text-decoration: none;
		font-size: 3rem;
	}
	.title{
		font-size: 1rem;
		margin-bottom: 3rem;
	}
	.paragraph p{
		margin-top: 1rem; /* Equivalent to mt-4 in Tailwind */
		max-width: 20rem; /* Equivalent to max-w-xs in Tailwind */
		line-height: 1.5; /* Equivalent to leading-normal in Tailwind */
		margin-bottom: 3rem;
	}

	.nav-section ul{
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	.nav-section ul li {
		display: flex;
		align-items: center;
		width: fit-content;
	}
	.nav-section ul li a {
		text-decoration: none;
		padding-top: 12px;	
		padding-bottom: 12px;	
		display: flex;
		align-items: center; /* Align the line and text horizontally */
	}

	.nav-indicator{
		display: inline-block;
		height: 1px;
		width: 2rem;
		background-color: white;
		margin-right: 16px;
		transition: all 0.2s ease;
	}


	/* Target the nav-indicator inside the anchor when hovering over the a */
	.nav-section ul li a:hover .nav-indicator {
		width: 4rem; /* Extend width on hover */
	}

	/* Increase width when the nav item is active */
	.nav-section ul li a.active .nav-indicator {
		width: 4rem; /* Extended width for active section */
	}


	.social-media{
		list-style-type: none;
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0 0 5rem 0;		
	}
	.social-media li{
		margin-right: 20px;
	}




	.about-paragraph{
		margin-left: 20px;
	}

	/* Sections */
	.section {
	  height: fit-content;
	  padding: 10px;
	  margin-bottom: 60px;
	}
	
	ol.list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li.experience {
		margin-bottom: 3rem;
		border-radius: 10px;
	}
	li.experience:hover{
		background-color: #415a77;
		cursor: pointer;
	}
	ol.list:hover li.experience {
		opacity: 0.5;
	}

	/* Except for the one being hovered */
	li.experience:hover {
		opacity: 1 !important;
	}
	.content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1rem;
		padding: 20px;
		position: relative;
	}

	.date {
		font-size: 0.75rem;
		font-weight: bold;
		color: #94a3b8;
		text-transform: uppercase;
		margin-top: 6px;
	}

	.details{
		width: fit-content;
	}
	.details h3  {
		margin-top: 0;
		display: inline-flex;
		align-items: center;
	}
	.experiences-redirect-icon{
		display: inline-block;
		vertical-align: middle;
		margin-left: 0.25rem;
	}

	.details h3 a {
		color: #e2e8f0;
		text-decoration: none;
		font-size: 1.25rem;
		display: inline;
	}

	.details h3 a:hover,
	.details h3 a:focus {
		color: #38bdf8;
	}

	.details p {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: #cbd5e1;
	}

	.technologies {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.5rem;
		gap: 0.75rem;
		padding: 0;
		list-style: none;
	}

	.technologies li {
		background-color: rgba(56, 189, 248, 0.1);
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		color: #38bdf8;
		border-radius: 9999px;
	}

	.icon {
		margin-left: 0.25rem;
		width: 1rem;
		height: 1rem;
	}

	.view-all-projects{
		text-decoration: none;
		color: white;
		transition: all 0.2s ease;
	}

	.view-all-projects:hover{
		text-decoration: underline;
	}
  </style>