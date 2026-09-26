export interface Research {
	date: string;
	title: string;
	company: string;
	description: string;
	technologies: string[];
	link?: string;
	current?: boolean;
	diagram?: boolean;
}

const research: Research[] = [
	{
		date: 'Current',
		title: 'Image Editing Policy Research',
		company: 'Xlabs',
		description:
			'Investigating learning signals for image-editing policies through conditional generative modeling. My current work combines representation-distribution matching with vision-language feedback to study semantic alignment, image quality, and diversity.',
		technologies: ['PyTorch', 'Vision-Language Models', 'Generative AI', 'LoRA'],
		current: true,
		diagram: true
	},
	{
		date: '2025 — Present',
		title: 'HAMR: Holonomic Mobile Robotics',
		company: 'ModLab, University of Pennsylvania',
		description:
			'Developing perception and control tools for HAMR, from vision-based analysis of a custom ball caster to visual SLAM and localization with a RealSense D455 depth camera. The work connects caster motion estimation, sensor integration, and PID control to investigate mobile robot behavior.',
		technologies: ['Computer Vision', 'SLAM', 'ROS 2', 'PID Control'],
		link: '/projects/hamr',
		current: true
	},
	{
		date: '2025 — Present',
		title: 'Generative World Models',
		company: 'Jiatao Gu Research Group, University of Pennsylvania',
		description:
			'Researching world models for agent-centric prediction and decision-making, including current-state and latent dynamics formulations. Developing flow- and diffusion-based models for controllable sequence generation, with preliminary exploration of energy-based models.',
		technologies: ['Python', 'Diffusion Models', 'Generative AI']
	},
	{
		date: '2024 — 2025',
		title: 'Topic Modeling and Analysis',
		company: 'UC Irvine',
		description:
			'Applied Latent Dirichlet Allocation to student admissions essays, optimizing topic coherence to identify recurring themes. Used statistical analysis to examine relationships between essay topics, academic performance, and academic probation.',
		technologies: ['Python', 'BERTopic', 'OCTIS', 'Statistics'],
		link: 'https://dl.acm.org/doi/abs/10.1145/3408877.3439664'
	},
	{
		date: '2024 — 2025',
		title: 'Machine Learning for PFAS Contamination',
		company: 'UC Irvine',
		description:
			'Preprocessed groundwater data on per- and polyfluoroalkyl substances (PFAS) across all 50 U.S. states. Conducted descriptive statistics, trend analysis, and time-series analysis, and created plots and geospatial maps to examine data distributions and contamination patterns.',
		technologies: ['Python', 'PyTorch', 'SciPy'],
		link: 'https://pubs.acs.org/doi/full/10.1021/acsestwater.3c00134'
	}
];

export default research;
