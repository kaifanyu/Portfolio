export const experiments = [
	{
		id: 'grid',
		title: 'Construction lines',
		description: 'Your selected drafting grid and small corner marks.',
		hint: 'Fine guides frame the sections.',
		group: 'Your selections',
		target: '#about'
	},
	{
		id: 'magnet',
		title: 'Magnetic links',
		description: 'Your selected gentle attraction on the social icons.',
		hint: 'Move the pointer around the social icons.',
		group: 'Your selections',
		target: '.social-media'
	},
	{
		id: 'stars',
		title: 'Faint stars',
		description: 'Sparse pinpoints and tiny four-point stars scattered through the margins.',
		hint: 'Small stars sit around the edges of the page.',
		group: 'The night sky',
		target: '.identity'
	},
	{
		id: 'orbits',
		title: 'Orbital arcs',
		description: 'Fine, oversized ellipses drift beyond the edges like a celestial drawing.',
		hint: 'Look for the quiet orbital lines at the page edges.',
		group: 'The night sky',
		target: '#about'
	},
	{
		id: 'constellations',
		title: 'Constellations',
		description: 'Loose groups of stars joined by delicate, almost pencil-thin lines.',
		hint: 'Follow the star patterns through the outer margins.',
		group: 'The night sky',
		target: '#experience'
	},
	{
		id: 'telescope',
		title: 'Telescope sketch',
		description: 'A small refractor and tripod, fixed quietly at the bottom left of the screen.',
		hint: 'The telescope stays at the bottom left as you scroll.',
		group: 'The night sky',
		target: '[data-decoration="telescope"]'
	}
] as const;

export type ExperimentId = (typeof experiments)[number]['id'];

export const presets: { id: string; name: string; description: string; enabled: ExperimentId[] }[] =
	[
		{
			id: 'selected',
			name: 'Selected',
			description: 'Just your construction lines and magnetic links.',
			enabled: ['grid', 'magnet']
		},
		{
			id: 'starlight',
			name: 'Starlight',
			description: 'Your two details with a faint scattering of stars.',
			enabled: ['grid', 'magnet', 'stars']
		},
		{
			id: 'observatory',
			name: 'Observatory',
			description: 'Faint stars, orbital arcs, constellations, and a fixed bottom-left telescope.',
			enabled: ['grid', 'magnet', 'stars', 'orbits', 'constellations', 'telescope']
		}
	];
