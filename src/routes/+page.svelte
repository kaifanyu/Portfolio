

<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	const research = [
		{
		date: '2024 — Present',
		title: 'Topic Modeling and Statistical Analysis',
		company: 'UC Irvine',
		description:
			"Implemented Latent Dirichlet Allocation to conduct topic modeling on collection of student admission essays",
		technologies: ['Python', 'PostgreSQL'],
		link: 'https://netpropriate.com/',
		},	
		{
		date: '2024 — Present',
		title: 'Machine Learning Prediction on PFAS Contamination',
		company: 'UC Irvine',
		description:
			"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
		technologies: ['Python', 'PostgreSQL'],
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
		date: '2018 — 2024',
		title: 'Security Intern',
		company: 'County of Marin',
		description:
			"Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects. Provide leadership within the engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
		technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'React Native'],
		link: 'https://upstatement.com',
		},
		{
		date: '2018 — 2024',
		title: 'STEM Insturctor',
		company: 'Dreams for Schools',
		description:
			"Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects. Provide leadership within the engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
		technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'React Native'],
		link: 'https://upstatement.com',
		},
		{
		date: '2018 — 2024',
		title: 'Web Developer',
		company: "Sophie's Masasge",
		description:
			"Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects. Provide leadership within the engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
		technologies: ['React', 'JavaScript', 'HTML' ],
		link: 'http://www.sophiemassagetherapy.com/',
		},
		{
		date: '2018 — 2024',
		title: 'CS Tutor',
		company: 'Santa Rosa Junior College',
		description:
			"Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects. Provide leadership within the engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
		technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'React Native'],
		link: 'https://upstatement.com',
		},
  	];

  </script>
  
  
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
			<section id="about" class="section">
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

			</div>
	</div>
  
</main>


<style>

	.main-container {
		display: flex;
		height: 100vh; /* Full viewport height */
		margin-left: 12%;
		margin-right: 12%;
		padding-left: 7%;
		padding-right: 7%;
	}

	/* Main container to hold both left and right divs */
	.container {
		display: flex;
		flex-grow: 1; /* Allow the container to stretch fully */
		gap: 100px;
		height: fit-content;
	}

	/* Left side remains sticky */
	.left-container {
		position: sticky;
		top: 0; /* Sticks to the top of the viewport */
		max-height: 80vh;
		min-width: fit-content;
		width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 96px;
		padding-left: 15%;
	}

	/* Right side, scrolling area */
	.right-container {
		width: 55%;
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
  </style>