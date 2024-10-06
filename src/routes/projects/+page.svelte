<script>
	import { onMount } from 'svelte';
	let activeSection = ''; // This will track which section is currently in view
  
	onMount(() => {
	  const sections = document.querySelectorAll('section');
	  
	  const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
		  if (entry.isIntersecting) {
			activeSection = entry.target.id;
		  }
		});
	  }, { threshold: 0.6 }); // Adjust threshold as needed (e.g., 60% of the section must be visible)
  
	  sections.forEach(section => {
		observer.observe(section);
	  });
  
	  return () => {
		// Clean up observer when component is destroyed
		observer.disconnect();
	  };
	});
  </script>
  
  <style>
	section {
	  height: 100vh;
	}
	.active {
	  font-weight: bold;
	  color: red;
	}
  </style>
  
	<nav>
	  <ul>
		<li class={activeSection === 'section1' ? 'active' : ''}>Section 1</li>
		<li class={activeSection === 'section2' ? 'active' : ''}>Section 2</li>
		<li class={activeSection === 'section3' ? 'active' : ''}>Section 3</li>
	  </ul>
	</nav>
  
  <section id="section1">Section 1</section>
  <section id="section2">Section 2</section>
  <section id="section3">Section 3</section>
  
  <!-- Display active section -->
  <div>
	<p>Currently viewing: {activeSection}</p>
  </div>
  
