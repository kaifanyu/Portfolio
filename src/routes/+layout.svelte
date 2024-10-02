<script lang="ts">
	import Navbar from '$lib/components/NavBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import Modal from '$lib/components/Modal.svelte';
	import { customBackground } from '$lib/store';
	import { Email } from '$lib/Constants';

	let copied = false;
	const cookieEnabled = false;
	$: showCookieModal = false;

	interface CssVariables {
		[name: string]: string;
	}

	const cssVariables = (
		node: HTMLElement,
		variables: CssVariables
	): { update: (variables: CssVariables) => void } => {
		setCssVariables(node, variables);

		return {
			update(variables: CssVariables) {
				setCssVariables(node, variables);
			}
		};
	};

	const setCssVariables = (node: HTMLElement, variables: CssVariables): void => {
		for (const name in variables) {
			node.style.setProperty(`--${name}`, variables[name]);
		}
	};

	const copy = () => {
		navigator.clipboard.writeText(Email);
	};



</script>

<svelte:body use:cssVariables={{ background: $customBackground }} />

<div class="temp"></div>

<Modal>
	<div slot="content" class="modalContainer">
		<h1>Email:</h1>
		<div>
			<p>{Email}</p>
			&nbsp;
			<div class="tooltip">
					<div
						id="clipboard"
						role="button"
						tabindex="0"
						on:keypress={() => {
							copied = true;
							copy();
							setTimeout(() => {
								copied = false;
							}, 500);
						}}
						on:click={() => {
							copied = true;
							copy();
							setTimeout(() => {
								copied = false;
							}, 500);
						}}
					>

					</div>
			</div>
		</div>
		<Button>Send Email</Button>
	</div>
</Modal>
<Navbar segment={$page.url.pathname} />

<slot />

<footer>
	<a class="me" href="/about">© 2023 Kai Yu</a>
</footer>

<style>
	* {
		box-sizing: border-box;
		margin:0;
		padding: 0;
	}

	@font-face {
		font-family: 'Fira Code', monospace;
		font-display: optional;
		src: url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
	}
	:global(#svelte) {
		width: 100vw;
		height: 100%;
		max-width: 1200px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	:global(html),
	:global(body) {
		transition: background-color 0.2s ease 0s;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		font-family: 'Fira Code', monospace;
		background-color: #0a0908;
	}

	:global(body) {
		background-color: var(--background);
		background-size: 200% 200%;
		color: white;
		margin: 0;
		box-sizing: border-box;
		display: grid;
		line-height: 1.75;
		place-items: center;
		height: 100%;
		overflow-x: hidden;
	}

	:global(h1) {
		border: 0;
	}

	:global(::selection) {
		color: white;
		background: #4158d0;
	}

	:global(::-webkit-scrollbar) {
		width: 8px;
		height: 8px;
		border-radius: 1px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: #fafffd;
		border-radius: 3px;
	}

	:global(::-webkit-scrollbar-track) {
		background-color: transparent;
		border-radius: 1px;
	}

	@media (min-width: 900px) {
		:global(body) {
			padding: 0 10px;
		}
	}

	:global(a) {
		text-decoration: none;
	}

	:global(a) {
		text-decoration: none;
	}

	a {
		color: rgb(0, 100, 200);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	a:visited {
		color: rgb(0, 80, 160);
	}

	.modalContainer div {
		display: flex;
		margin-bottom: 20px;
	}

	.modalContainer p {
		margin: 0;
	}

	:global(.tooltip) {
		visibility: hidden;
	}
	.temp {
    position: fixed;
    top: 80%; /* Adjusted position */
    left: 50%;
    height: 1px;
    width: 1px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 
        -24vw -64vh 2px 2px #fff, 
        -22vw -54vh 2px 1px #fff, 
        38vw -24vh 0px 0px #fff,
        -20vw -68vh 1px 2px #fff,  
        -39vw 28vh 3px 1px #fff, 
        -42vw -31vh 0px 3px #fff,
        12vw 35vh 3px 3px #fff,
        42vw 16vh 3px 2px #fff,
        -8vw 19vh 0px 2px #fff,
        34vw -58vh 1px 0px #fff,
        -17vw 65vh 3px 1px #fff,
        22vw -56vh 3px 2px #fff,
        -42vw 11vh 1px 0px #fff,
        42vw 16vh 3px 2px #fff,
        -8vw 19vh 0px 2px #fff,
        34vw -58vh 1px 0px #fff,
        -17vw 65vh 3px 1px #fff,
        22vw -56vh 3px 2px #fff,
        -42vw 11vh 1px 0px #fff,
        22vw 16vh 3px 2px #fff,
        -38vw 19vh 0px 2px #fff,
        54vw -58vh 1px 4px #fff,
        -12vw 62vh 3px 1px #fff,
        12vw -56vh 2px 1px #fff,
        -42vw 11vh 2px 0px #fff;
    animation: zoom 20s infinite; /* Adjusted animation time and set to infinite */
}

@keyframes zoom {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5); /* Zoom in */
    }
    100% {
        transform: scale(1); /* Zoom back to original size */
    }
}
	footer {
		font-size: 16px;
		font-weight: 400;
		padding: 30px 0;
		text-align: center;
		width: 100%;
	}

	footer a {
		text-decoration: none;
		color: #4158d0;
	}

	footer .me {
		color: #4158d0;
	}

	@media (min-width: 900px) {
		:global(.tooltip) {
			visibility: visible;
		}
	}
	@media (min-width: 600px) {
	}
</style>
