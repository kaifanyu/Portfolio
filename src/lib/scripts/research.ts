export interface Research {
	date: string;
	title: string;
	company: string;
	companyLink?: string;
	description: string;
	technologies: string[];
	link?: string;
	current?: boolean;
}

const research: Research[] = [
	{
		date: '2025 — Present',
		title: 'Generative World Models',
		company: 'GMLR Lab',
		companyLink: 'https://jiataogu.me/team/',
		description:
			'Researching generative world models and conditional image generation, alongside in-context learning and on-policy distillation for robotic policies.',
		technologies: ['Python', 'Diffusion Models', 'Generative AI']
	},
	{
		date: 'Current',
		title: 'Image Editing Policy Research',
		company: 'xLAB',
		companyLink: 'https://xlab.upenn.edu/',
		description:
			'Researching learning signals for image-editing policies through conditional generative modeling. Developing robot policies by minimizing differences between latent representations of current and goal images.',
		technologies: ['PyTorch', 'Vision-Language Models', 'Generative AI', 'LoRA'],
		current: true
	},
	{
		date: '2025 — Present',
		title: 'HAMR: Holonomic Mobile Robotics',
		company: 'ModLab',
		companyLink: 'https://www.modlabupenn.org/',
		description:
			'Studying how ball and wheelchair casters affect mobile robot motion, from uneven ground and lateral disturbances to path tracking. Connecting caster measurements, visual localization, ROS 2 control, and Gazebo experiments on a shared platform.',
		technologies: ['Computer Vision', 'SLAM', 'ROS 2', 'PID Control'],
		link: 'https://kaifanyu.github.io/hamr-research/',
		current: true
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
