export interface Showcase {
	slug: string;
	title: string;
	subtitle: string;
	category: string;
	description: string;
	hero: string;
	heroAlt: string;
	heroCaption: string;
	sections: { title: string; description: string }[];
	gallery: { src?: string; alt?: string; title: string; caption: string }[];
	note?: string;
}

export const showcases: Showcase[] = [
	{
		slug: 'hamr',
		title: 'HAMR',
		subtitle: 'Holonomic mobile robotics',
		category: 'ModLab · University of Pennsylvania',
		description:
			'Connecting caster design, visual perception, and feedback control for a holonomic mobile robot. The work spans camera-based caster motion estimation, RGB-D mapping and localization, and motor control.',
		hero: '/images/projects/hamr/caster-tracking.png',
		heroAlt: 'Camera-based feature tracking used to study the motion of a ball caster',
		heroCaption:
			'Dual-camera reconstruction of a split spherical caster: shared roll and independent shell rotation.',
		sections: [
			{
				title: 'Caster vision',
				description:
					'Track visual features from two cameras to estimate caster motion. The model separates shared rolling motion from independent shell rotation, connecting image measurements with the caster’s mechanics.'
			},
			{
				title: 'Visual SLAM and localization',
				description:
					'Use a RealSense D455 with RTAB-Map for RGB-D mapping and localization against saved maps. Wheel odometry and IMU measurements feed an extended Kalman filter to support robot state estimation.'
			},
			{
				title: 'PID control',
				description:
					'A Jacobian-based ROS 2 controller translates robot motion commands into drive-wheel and turret commands. ESP32 firmware combines feed-forward terms with PID feedback, with motor response measurements supporting controller tuning.'
			},
			{
				title: 'Ball-caster design',
				description:
					'Investigate a split spherical support caster with shared roll and independently rotating hemispheres. Compare its motion with conventional swivel casters through repeatable trajectories and measurements of alignment, slip, and tracking error. These experiments are ongoing.'
			}
		],
		gallery: [
			{
				src: '/images/projects/hamr/motor-response.png',
				alt: 'Recorded motor response used to inspect and tune the HAMR motor controller',
				title: 'Motor response',
				caption: 'Recorded response for inspecting and tuning motor control.'
			},
			{
				title: 'Depth-camera mapping',
				caption: 'Map and localization visualization — coming soon.'
			}
		],
		note: 'The latest integrated localization and control setup awaits hardware validation.'
	},
	{
		slug: 'f1-3dgs',
		title: 'F1-3DGS',
		subtitle: 'RGB-D scene reconstruction',
		category: '3D vision · Robotics',
		description:
			'Reconstructing indoor environments with 3D Gaussian Splatting from RGB-D lap recordings, combining calibrated images, depth, and robot poses with dataset filtering and reconstruction inspection.',
		hero: '/images/projects/f1-3dgs/moore-three-lap-trajectory.png',
		heroAlt:
			'Top-down plot of three recorded laps in Moore, showing the robot trajectory in meters',
		heroCaption: 'Recorded X–Y trajectory across three Moore laps.',
		sections: [
			{
				title: 'Capturing indoor scenes',
				description:
					'Indoor laps through Levine and Moore pair color frames with aligned depth images, camera intrinsics, timestamps, and robot poses. These recordings provide appearance and geometry inputs for scene reconstruction.'
			},
			{
				title: 'Preparing reliable inputs',
				description:
					'Associate captured frames with ROS poses in the map frame. Filtered datasets retain valid image, depth, and pose samples and record skipped transform failures; trajectory plots help inspect spatial coverage across repeated laps.'
			},
			{
				title: 'Gaussian reconstruction',
				description:
					'Saved Gaussian models at 7,000 and 30,000 training iterations preserve position, scale, rotation, opacity, and appearance parameters. These outputs capture the reconstructed scene as a collection of 3D Gaussians.'
			},
			{
				title: 'Inspecting the scene',
				description:
					'An Open3D viewer loads reconstruction outputs for geometric inspection. Recorded trajectories and RGB inputs provide context for reviewing the captured environment and reconstruction.'
			}
		],
		gallery: [
			{
				src: '/images/projects/f1-3dgs/levine-rgb-capture.png',
				alt: 'Low-mounted camera view down an indoor corridor during a Levine lap capture',
				title: 'RGB input',
				caption: 'RGB input from a Levine lap capture.'
			},
			{
				title: 'Gaussian reconstruction',
				caption: 'Rendered scene and reconstruction walkthrough — coming soon.'
			}
		]
	}
];
