<script>
	import skills from '$lib/Skills';


	import Asl from './Asl.svelte'
	import Journal from './journal.svelte'
    import Cysafe from './cysafe.svelte'
</script>

<svelte:head>
	<title>Kai | About</title>
</svelte:head>
<h1>
	Projects
</h1>
<div class="parent-container grid">
	<Asl />
	<Journal />
    <Cysafe />
</div>


<br>
<hr/>


<style>
	.parent-container{
			border: 2px black solid;
			gap: 1rem;
            height: 800vh;
	}
	.grid{ 
			display: grid;
			grid-template-columns: repeat(5, minmax(0,1fr));
			grid-template-rows: repeat(auto-fill, 250px);
	}

</style>