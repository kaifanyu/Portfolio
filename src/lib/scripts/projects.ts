import stable_diffusion from '$lib/images/stable.png';
import stable1 from '$lib/images/stable1.png';
import stable2 from '$lib/images/stable2.png';
import stable3 from '$lib/images/stable3.png';

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
import cysafe1 from '$lib/images/cysafe1.png'
import cysafe2 from '$lib/images/cysafe2.png'
import cysafe3 from '$lib/images/cysafe3.png'


const projects = [
    {
        image: stable_diffusion,
        title: 'Stable Diffusin Clone',
        alt: 'Stable Diffusion Clone',
        description:
            "Developed a Stable Diffusion clone in Python from scratch, utilizing diffusion techniques capable of generating images from text, images, and performing inpainting. The model incorporates CLIP embeddings and a variational autoencoder.",
        technologies: ['Python'],
        link: 'https://github.com/kaifanyu/Stable-Diffusion-Clone',
        sc1: stable1,
        sc2: stable2,
        sc3: stable3,
    },	
    {
        image: wav2vec,
        title: 'Deepfake Audio Classifier',
        alt: 'deepfake audio',
        description:
            "Developed three deep leanring using different architecures to detect deepfake auido from real audio to prevent malicious AI generated content from deceiving unsuspecting victims.",
        technologies: ['LSTM', 'Tensorflow', 'Transformers', 'Wav2Vec2'],
        link: 'https://github.com/kaifanyu/DeepFake-Audio-Detection',
        sc1: deepfake1,
        sc2: deepfake2,
        sc3: deepfake3,
    },	
    {
        image: settlement,
        title: 'UNet3+ Settlement Detection',
        alt: 'settlement detection',
        description:
            "Implemented UNet3+ model for advanced electricity detection using satellite data on African settlements. The dataset used comes from the IEEE GRSS 2021 ESD dataset composing of 98 tiles representing a 64KM area.",
        technologies: ['PyTorch', 'WandaDB', 'PyTorch Lightning'],
        link: 'https://github.com/kaifanyu/Settlement-Detection',
        sc1: settlement_sc1,
        sc2: settlement_sc2,
        sc3: settlement_sc3,
    },	
    {
        image: minecraft,
        title: 'Minecraft in C++',
        alt: 'minecraft',
        description:
            "Created a Minecraft clone from scratch using OpenGL, featuring custom rendering, texturing, and player physics. The game allows players to build, destroy, and move around, closely mimicking the mechanics of the original game.",
        technologies: ['C++', 'OpenGL'],
        link: 'https://github.com/kaifanyu/Minecraft',
        sc1: minecraft1,
        sc2: minecraft2,
        sc3: minecraft3,
    },	
    {
        image: cysafe,
        title: 'Cysafe',
        alt: 'cysafe',
        description:
            "HackDavis 2023 winner, this project enhances biker safety by integrating LED blinker lights, a rear-view vehicle detection and alert system, and an emergency contact messaging system directly into the helmet.",
        technologies: ['Python', 'OpenCV', 'Arduino', 'Raspberry Pi'],
        link: 'https://devpost.com/software/cysafe',
        sc1: cysafe1,
        sc2: cysafe2,
        sc3: cysafe3,
    },	
]

export default projects;