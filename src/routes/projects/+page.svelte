<script>
	import raspberry from '$lib/assets/rasp.jpg'
	import discord from '$lib/assets/discord.jpg'
	import vuln from '$lib/assets/vuln.jpg'
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Kai | Projects</title>
</svelte:head>
<br>
<p class="project-title">Projects</p>
<p class="project-description">I am passionate about crafting educational and entertaining projects with a focus on the intersection of software engineering and cybersecurity. I have experimented with hosting my own servers, where I practice ensuring its security and resilience while making it convenient for my daily routine. This synergy empowers me to not only create innovative software solutions but also to fortify them against potential threats, safeguarding data and user privacy. Whether it's developing interactive applications, designing secure network architectures, or implementing robust encryption protocols, I find immense satisfaction in the creative and protective aspects of my endeavors. 
</p>
<br>
<br>
<div class="maindiv">

<article class="card">
	<img
	  class="card__background"
	  src={raspberry}
	  alt="raspberry pi"
	  width="1920"
	  height="2193"
	/>
	<div class="card__content | flow">
	  <div class="card__content--container | flow">
		<h2 class="card__title">Security Camera</h2>
		<p class="card__description">
			Utilized Open CV for human detection to send smart alert whenever presence is detected with raspberry pi camera 
			and uploads video footage to the cloud.
		</p>
	  </div>    
	  <a href="https://github.com/your-github-url" class="card__button" target="_blank">
		<Icon name="Github" width=30 height=30></Icon> <p>&nbsp;&nbsp;github</p>
	  </a>
	</div>
	
  </article>
  <article class="card">
	<img
	  class="card__background"
	  src={discord}
	  alt="Discord Bot"
	  width="1920"
	  height="2193"
	/>
	<div class="card__content | flow">
	  <div class="card__content--container | flow">
		<h2 class="card__title">Discord Bot</h2>
		<p class="card__description">
			Program using C# libraries and allows users to fetch data using APIs alongside 30+ games and features.
		</p>
	  </div>	  
	  <a href="https://github.com/your-github-url" class="card__button" target="_blank">
		<Icon name="Github" width=30 height=30></Icon> <p>&nbsp;&nbsp;github</p>
	  </a>
	</div>
	
  </article>
  <article class="card">
	<img
	  class="card__background"
	  src={vuln}
	  alt="Discord Bot"
	  width="1920"
	  height="2193"
	/>
	<div class="card__content | flow">
	  <div class="card__content--container | flow">
		<h2 class="card__title">Vulnerability Scanner</h2>
		<p class="card__description">
			Installed Nessus on Raspberry Pi to scan for home network and custom unsecured servers to
			identify potential vulnerabilities and proactively implement remediation measures, enhancing network security.
		</p>
	  </div>	  
	  <a href="https://github.com/your-github-url" class="card__button" target="_blank">
		<Icon name="Github" width=30 height=30></Icon> <p>&nbsp;&nbsp;github</p>
	  </a>
	</div>
	
  </article>
</div>
<style lang="scss">

:root {
  /* Colors */
  --brand-color: #4158d0;
  --black: hsl(0, 0%, 0%);
  --white: hsl(0, 0%, 100%);
  /* Fonts */
}

/* RESET */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
h2,
p {
	margin: 0;
}
.maindiv{
	display: flex;
	gap: 79px;
	margin: 20px 20px;
}
/* GLOBAL STYLES */


h2 {
  font-size: 2.25rem;
  color: var(--white);
  line-height: 1.1;
  text-shadow: 3px 3px black;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--white);
  text-shadow: 1px 1px black;
}
.project-title{
	margin: 20px 20px;
  font-size: 3rem;
  color: #4158d0;

}
.project-description{
	margin: 20px 20px;
  font-size: 1.3rem;

}

.flow > * + * {
  margin-top: var(--flow-space, 1em);
}

/* CARD COMPONENT */

.card {
  display: grid;
  place-items: center;
  width: 80vw;
  max-width: 21.875rem;
  height: 28.125rem;
  overflow: hidden;
  border-radius: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}

.card > * {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.card__background {
  object-fit: cover;
  max-width: 100%;
  height: 100%;
}

.card__content {
  --flow-space: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-end;
  height: fit-content;
  padding: 12% 1.25rem 1.875rem;
  background: linear-gradient(
    180deg,w
    hsla(0, 0%, 0%, 0) 0%,
    hsla(0, 0%, 0%, 0.3) 10%,
    hsl(0, 0%, 0%) 100%
  );
}

.card__content--container {
  --flow-space: 1.25rem;
}

.card__title {
  position: relative;
  width: fit-content;
  width: -moz-fit-content; /* Prefijo necesario para Firefox  */
}

.card__title::after {
  content: "";
  position: absolute;
  height: 0.3125rem;
  width: calc(100% + 1.25rem);
  bottom: calc((1.25rem - 0.5rem) * -1);
  left: -1.25rem;
  background-color: var(--brand-color);
}

.card__button {
  padding: 0.75em 1.6em;
  width: fit-content;
  width: -moz-fit-content; /* Prefijo necesario para Firefox  */
  font-variant: small-caps;
  font-weight: bold;
  border-radius: 0.45em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: var(--brand-color);
  font-family: var(--font-title);
  font-size: 1.125rem;
  color: var(--black);
}

.card__button:focus {
  outline: 2px solid black;
  outline-offset: -5px;
}

@media (any-hover: hover) and (any-pointer: fine) {
  .card__content {
    transform: translateY(62%);
	
    transition: transform 500ms ease-out;
    transition-delay: 500ms;
  }

  .card__title::after {
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 1000ms ease-in, transform 500ms ease-out;
    transition-delay: 500ms;
    transform-origin: right;
  }

  .card__background {
    transition: transform 500ms ease-in;
  }

  .card__content--container > :not(.card__title),
  .card__button {
    opacity: 0;
    transition: transform 500ms ease-out, opacity 500ms ease-out;
  }

  .card:hover,
  .card:focus-within {
	
    transform: scale(1.05);
    transition: transform 500ms ease-in;
  }

  .card:hover .card__content,
  .card:focus-within .card__content {
    transform: translateY(0);
    transition: transform 500ms ease-in;
  }
  .card:hover .card__background {
	filter: opacity(40%) blur(2px); 
	transition: filter 0.5s ease; /* Add a transition for the filter property on hover */
  }
  .card:focus-within .card__content {
    transition-duration: 0ms;
  }

  .card:hover .card__background,
  .card:focus-within .card__background {
    transform: scale(1.3);
  }

  .card:hover .card__content--container > :not(.card__title),
  .card:hover .card__button,
  .card:focus-within .card__content--container > :not(.card__title),
  .card:focus-within .card__button {
    opacity: 1;
    transition: opacity 500ms ease-in;
    transition-delay: 1000ms;
  }

  .card:hover .card__title::after,
  .card:focus-within .card__title::after {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
    transition: opacity 400ms ease-in, transform 400ms ease-in;
    transition-delay: 400ms;
  }
}


@media screen and (max-width: 900px) {
    .project-title{
    margin: 20px 3rem;
    font-size: 3rem;
    color: #4158d0;

  }
  .project-description{
    margin: 20px 3rem;
    font-size: 1.3rem;

  }

  .maindiv {
    flex-direction: column; /* Display cards vertically */
    gap: 30px; /* Add 30px gap between cards */
    align-items: center; /* Center-align the cards */
    margin: 20px auto; /* Center-align the card container */
  }
  
  /* Adjust card width and height */
  .card {
    width: 100%;
    height: auto;
  }
  
  /* Reset some styles for card content and button */
  .card__content {
    padding: 1.25rem 1.25rem 1.875rem;
  }

  .card__button {
    width: 100%;
  }

  /* Adjust text styles for mobile */
  .card__title {
    font-size: 1.5rem;
  }

  .card__description {
    font-size: 1rem;
  }
}
</style>