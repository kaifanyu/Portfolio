import wav2vec from '$lib/images/wav2vec2.png';
import deepfake1 from '$lib/images/deepfake1.png';
import deepfake2 from '$lib/images/deepfake2.png';
import deepfake3 from '$lib/images/deepfake3.png';

import settlement from '$lib/images/settlement.png';
import settlement_sc1 from '$lib/images/unet1.png';
import settlement_sc2 from '$lib/images/unet2.png';
import settlement_sc3 from '$lib/images/unet3.png';

import minecraft from '$lib/images/minecraft.png';
import minecraft1 from '$lib/images/minecraft1.png';
import minecraft2 from '$lib/images/minecraft2.png';
import minecraft3 from '$lib/images/minecraft3.png';

import cysafe from '$lib/images/cysafe.png';
import cysafe1 from '$lib/images/cysafe1.png';
import cysafe2 from '$lib/images/cysafe2.png';
import cysafe3 from '$lib/images/cysafe3.png';

import rocky from '$lib/images/RoboRocky/rocky.gif';
import rocky1 from '$lib/images/RoboRocky/rocky1.png';
import rocky2 from '$lib/images/RoboRocky/rocky2.png';
import rocky3 from '$lib/images/RoboRocky/rocky3.gif';

export interface Project {
	slug: string;
	title: string;
	category: string;
	image: string;
	alt: string;
	description: string;
	technologies: string[];
	link: string;
	featured?: boolean;
	showcase?: boolean;
	sc1?: string;
	sc2?: string;
	sc3?: string;
}

const projects: Project[] = [
	{
		slug: 'hamr',
		title: 'HAMR',
		category: 'ModLab · Mobile robotics',
		image: '/images/projects/hamr/caster-tracking.png',
		alt: 'Dual-camera caster tracking with geometry overlays, a 3D model, and rotation estimates',
		description:
			'Connecting caster mechanics, visual sensing, and feedback control in a holonomic mobile robot. Work spans dual-camera caster tracking, depth-camera localization, and ROS 2 / embedded PID control.',
		technologies: ['ROS 2', 'Computer Vision', 'SLAM', 'PID Control'],
		link: '/projects/hamr',
		featured: true,
		showcase: true
	},
	{
		slug: 'f1-3dgs',
		title: 'F1-3DGS',
		category: '3D reconstruction · Robot perception',
		image: '/images/projects/f1-3dgs/levine-rgb-capture.png',
		alt: 'Indoor corridor captured as an RGB input for scene reconstruction',
		description:
			'Exploring 3D Gaussian Splatting for indoor scene reconstruction from RGB-D lap recordings, calibrated camera data, and robot poses.',
		technologies: ['3D Gaussian Splatting', 'RGB-D', 'Open3D'],
		link: '/projects/f1-3dgs',
		featured: true,
		showcase: true
	},
	{
		slug: 'roborocky',
		category: 'Robotics · Optimal control',
		featured: true,
		image: rocky,
		title: 'RoboRocky',
		alt: 'RoboRocky',
		description:
			'Developed a planar boxing-arm simulator that uses Model Predictive Control with iLQR to generate fast, contact-rich attack, block, and parry motions between two opposing robotic arms. The system demonstrates real-time trajectory optimization and adaptive defensive behaviors.',
		technologies: ['Python', 'MPC', 'Controls'],
		link: 'https://github.com/kaifanyu/RoboRocky',
		sc1: rocky1,
		sc2: rocky2,
		sc3: rocky3
	},
	{
		slug: 'deepfake-audio',
		category: 'Machine learning · Audio',
		image: wav2vec,
		title: 'Deepfake Audio Classifier',
		alt: 'deepfake audio',
		description:
			'Developed and compared three deep learning architectures to distinguish synthetic speech from real audio, exploring recurrent models and transformer-based audio representations.',
		technologies: ['LSTM', 'Tensorflow', 'Transformers', 'Wav2Vec2'],
		link: 'https://github.com/kaifanyu/DeepFake-Audio-Detection',
		sc1: deepfake1,
		sc2: deepfake2,
		sc3: deepfake3
	},
	{
		slug: 'settlement-detection',
		category: 'Computer vision · Remote sensing',
		image: settlement,
		title: 'UNet3+ Settlement Detection',
		alt: 'settlement detection',
		description:
			'Implemented UNet3+ for settlement segmentation in satellite imagery, using the IEEE GRSS 2021 ESD dataset to study electricity access in African settlements.',
		technologies: ['PyTorch', 'Weights & Biases', 'PyTorch Lightning'],
		link: 'https://github.com/kaifanyu/Settlement-Detection',
		sc1: settlement_sc1,
		sc2: settlement_sc2,
		sc3: settlement_sc3
	},
	{
		slug: 'minecraft',
		category: 'Graphics · Game development',
		image: minecraft,
		title: 'Minecraft in C++',
		alt: 'minecraft',
		description:
			'Created a Minecraft clone from scratch using OpenGL, featuring custom rendering, texturing, and player physics. The game allows players to build, destroy, and move around, closely mimicking the mechanics of the original game.',
		technologies: ['C++', 'OpenGL'],
		link: 'https://github.com/kaifanyu/Minecraft',
		sc1: minecraft1,
		sc2: minecraft2,
		sc3: minecraft3
	},
	{
		slug: 'cysafe',
		category: 'Embedded systems · HackDavis 2023',
		image: cysafe,
		title: 'Cysafe',
		alt: 'cysafe',
		description:
			'HackDavis 2023 winner, this project enhances biker safety by integrating LED blinker lights, a rear-view vehicle detection and alert system, and an emergency contact messaging system directly into the helmet.',
		technologies: ['Python', 'OpenCV', 'Arduino', 'Raspberry Pi'],
		link: 'https://devpost.com/software/cysafe',
		sc1: cysafe1,
		sc2: cysafe2,
		sc3: cysafe3
	}
];

export default projects;
