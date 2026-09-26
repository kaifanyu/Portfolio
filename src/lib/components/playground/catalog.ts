export const experiments = [
	{
		id: 'trajectory',
		title: 'Trajectory instrument',
		description: 'A small orbital study you can tune, pause, and set in motion.',
		hint: 'Adjust the controls, then watch the path respond.',
		group: 'Objects',
		target: '#trajectory-study'
	},
	{
		id: 'atlas',
		title: 'Idea atlas',
		description: 'A constellation of five research interests and the questions that connect them.',
		hint: 'Select an interest to trace its connections and explore related work.',
		group: 'Discovery',
		target: '#idea-atlas'
	},
	{
		id: 'halo',
		title: 'Peripheral light',
		description: 'A diffused pool of light quietly follows you through the margins.',
		hint: 'Move your pointer around the introduction.',
		group: 'Atmosphere',
		target: '.identity'
	},
	{
		id: 'field',
		title: 'Vector field',
		description: 'Fine directional marks respond like a field around a moving charge.',
		hint: 'Move your pointer across the introduction.',
		group: 'Atmosphere',
		target: '.identity'
	},
	{
		id: 'grid',
		title: 'Construction lines',
		description: 'A faint drafting grid and corner marks reveal the page beneath the page.',
		hint: 'Look behind the sections and along their edges.',
		group: 'Atmosphere',
		target: '.section-heading'
	},
	{
		id: 'rail',
		title: 'Reading rail',
		description: 'A quiet section index tracks your place along a thin vertical rail.',
		hint: 'Scroll, or select a marker to jump to a section.',
		group: 'Discovery',
		target: '#about'
	},
	{
		id: 'cursor',
		title: 'Precision ring',
		description: 'A fine target ring accompanies the pointer like a tiny drafting instrument.',
		hint: 'Move your pointer and hover over a link.',
		group: 'Motion',
		target: '.identity'
	},
	{
		id: 'magnet',
		title: 'Magnetic links',
		description: 'Social icons lean gently toward your pointer and settle back into place.',
		hint: 'Move your pointer around the social icons.',
		group: 'Motion',
		target: '.social-media'
	},
	{
		id: 'tilt',
		title: 'Window depth',
		description: 'Project images gain a little perspective while their text stays still.',
		hint: 'Move your pointer across a project thumbnail.',
		group: 'Motion',
		target: '#projects'
	},
	{
		id: 'underline',
		title: 'Drawn underlines',
		description: 'A fine line draws itself beneath a link as you approach it.',
		hint: 'Hover over or keyboard-focus a link in the introduction.',
		group: 'Motion',
		target: '.about-paragraph'
	},
	{
		id: 'reveal',
		title: 'Measured entrances',
		description: 'Section dividers draw into place as you reach them.',
		hint: 'Scroll down through the research and experience sections.',
		group: 'Motion',
		target: '#research'
	},
	{
		id: 'focus',
		title: 'Reading focus',
		description: 'Nearby research entries soften slightly while you explore one.',
		hint: 'Hover over a research entry to bring it forward.',
		group: 'Discovery',
		target: '#research'
	},
	{
		id: 'lens',
		title: 'Project lenses',
		description: 'View the project collection through embodiment, perception, and learning.',
		hint: 'Select a topic chip above the projects.',
		group: 'Discovery',
		target: '#projects'
	},
	{
		id: 'notes',
		title: 'In the margins',
		description: 'Three small process notes reveal the thinking behind the work.',
		hint: 'Open a note to look a little closer.',
		group: 'Discovery',
		target: '#process-notes'
	},
	{
		id: 'contact',
		title: 'Workbench contact sheet',
		description: 'A loose stack of real project images becomes a small visual archive.',
		hint: 'Explore the photographs in the contact sheet.',
		group: 'Objects',
		target: '#contact-sheet'
	},
	{
		id: 'command',
		title: 'Quick navigation',
		description: 'A compact command menu offers another way into the portfolio.',
		hint: 'Press Ctrl K or Command K to open the menu.',
		group: 'Discovery',
		target: '#about'
	},
	{
		id: 'signature',
		title: 'Mechanical signature',
		description: 'A little geometric wheel turns and settles with a touch.',
		hint: 'Activate the wheel at the end of the page.',
		group: 'Objects',
		target: '#mechanical-signature'
	},
	{
		id: 'labels',
		title: 'Specimen labels',
		description: 'Tiny index numbers give research entries the feeling of a collected archive.',
		hint: 'Look beside the research entries.',
		group: 'Atmosphere',
		target: '#research'
	}
] as const;

export type ExperimentId = (typeof experiments)[number]['id'];

export const presets: {
	id: string;
	name: string;
	description: string;
	enabled: ExperimentId[];
}[] = [
	{
		id: 'quiet',
		name: 'Quiet',
		description: 'A few thoughtful details, with plenty of room to read.',
		enabled: ['underline', 'reveal', 'rail', 'signature']
	},
	{
		id: 'studio',
		name: 'Studio',
		description: 'A calm workbench with instruments, connections, and a little atmosphere.',
		enabled: [
			'trajectory',
			'atlas',
			'halo',
			'grid',
			'rail',
			'underline',
			'reveal',
			'lens',
			'signature',
			'labels'
		]
	},
	{
		id: 'curious',
		name: 'Curious',
		description: 'Open the drawers and try almost everything together.',
		enabled: experiments.filter((experiment) => experiment.id !== 'focus').map(({ id }) => id)
	}
];

export const inspiration = [
	{
		title: 'Bartosz Ciechanowski · Mechanical Watch',
		url: 'https://ciechanow.ski/mechanical-watch/',
		note: 'Small mechanisms invite direct manipulation and reward a closer look.'
	},
	{
		title: 'Bret Victor · Explorable Explanations',
		url: 'https://worrydream.com/ExplorableExplanations/',
		note: 'Let readers investigate an idea while keeping its explanation easy to read.'
	},
	{
		title: 'Nicky Case · LOOPY',
		url: 'https://ncase.me/loopy/',
		note: 'Simple circles and connections can make relationships tangible.'
	},
	{
		title: 'Josh W. Comeau · Spring Physics',
		url: 'https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/',
		note: 'Physical response lends personality to small, deliberate interactions.'
	},
	{
		title: 'Red Blob Games · Introduction to A*',
		url: 'https://www.redblobgames.com/pathfinding/a-star/introduction.html',
		note: 'Changing a small input can reveal how a much larger idea works.'
	},
	{
		title: 'fffuel · SVG tools',
		url: 'https://www.fffuel.co/',
		note: 'Lines, grids, and textures offer a lightweight vocabulary for original surfaces.'
	},
	{
		title: 'Bruno Simon · Portfolio',
		url: 'https://bruno-simon.com/',
		note: 'A personal site can reward exploration as well as introduce its creator.'
	},
	{
		title: 'Codrops · Magnetic Buttons',
		url: 'https://tympanus.net/codrops/2020/08/05/magnetic-buttons/',
		note: 'A little pointer attraction inspired our restrained movement of the social icons.'
	}
];
