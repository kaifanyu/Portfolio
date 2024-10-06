import { writable } from 'svelte/store';
import { onMount } from 'svelte';

// Writable store to track active section
export const activeSection = writable<string>('about');

let sections: HTMLElement[] = [];

// Smooth scroll to section
export const scrollToSection = (id: string) => {
	const section = document.getElementById(id);
	if (section) {
		section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		activeSection.set(id); // Set active section manually on click
	}
};

// Function to handle scroll and determine which section is active
export const handleScroll = () => {
	const fromTop = window.scrollY;
	let currentSection = 'about'; // Default section
	sections.forEach((section) => {
		if (section.offsetTop <= fromTop + 100) { // Adjust offset for earlier activation
			currentSection = section.id;
		}
	});
	activeSection.set(currentSection); // Update active section
};

// onMount lifecycle to set up scroll listener
export const initScroll = () => {
	onMount(() => {
		sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
		const rightContainer = document.body;
		if (rightContainer) {
			window.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (rightContainer) {
				window.removeEventListener('scroll', handleScroll);
			}
		};
	});
};
