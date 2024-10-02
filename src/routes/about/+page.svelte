<script>
	import skills from '$lib/Skills';
	
</script>

<svelte:head>
	<title>Kai | About</title>
</svelte:head>

<div class="container">
	<main>
		<br>
		<br>

		<span class="about-header">About</span>
		<br>
		<br>
		<p class="about-description">
			I am a passionate computer science student with a deep interest in software engineering and information security. Through my academic journey and personal projects, I have honed my skills in coding, problem-solving, and ensuring the integrity of digital systems. My goal is to leverage my knowledge and enthusiasm to contribute to the ever-evolving world of technology. 
		</p>
	</main>
	<br>
	<br>
	<br>
	<span class="skill-about">Skills</span>
	<div class="skill-div">

		{#each Object.entries(skills) as [section, technologies]}
		<br>
				<p class="skillset">
					{section}:
				<p>
				<div class="description">
					{#each technologies as technology}
						<p>
							{technology}
						</p>
					{/each}
				</div>
		{/each}
		</div>


		

</div>

<style>

	
	* {
		margin: 0;
		padding: 0;
		height: auto;
		line-height: 2rem;
}

	.container {
		padding: 0;
		margin: 0;
		max-width: 1200px;
		justify-content: left;
	}

	main {

		padding: 0;
		margin: 0;
		max-width: 100%;
		text-align: left;
		margin: 0 auto;
		box-sizing: border-box;
	}
	.about-header{
		margin: 20px 20px;
		font-size: 3rem;
		color: #4158d0;
	}
	.about-description{
		margin: 20px 20px;
		font-size: 1.3rem
	}
	.skill-about{
		font-size: 1.7rem;
		color: #4158d0;
		margin: 20px 20px;
	}
	.skill-div {
		margin: 20px 20px;

  /* Add any desired styles for the skill-div container here */
	}

	.skillset {
		font-weight: bold; /* Make section text bold */
		font-size: 1.3rem;
		margin-bottom: 5px; /* Add space between sections */
	}

	.description {
		display: flex; /* Use flexbox to arrange technologies horizontally */
		flex-wrap: wrap; /* Allow technologies to wrap to the next line if necessary */
		gap: 30px; /* Add a gap between technology items */
	}



	@media screen and (max-width: 900px) {

		.about-description, .skill-about , 
		.about-header{
			margin: 20px 3rem;
		}
		.skillset, .description
		{
			margin: 20px 2rem;
		}
	}

</style>
