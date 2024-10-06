import stable_diffusion from '$lib/images/stable.png';
import wav2vec from '$lib/images/wav2vec2.png';
import minecraft from '$lib/images/minecraft.png';
import cysafe from '$lib/images/cysafe.png';
import settlement from '$lib/images/settlement.png';


const projects = [
    {
        image: stable_diffusion,
        title: 'Stable Diffusin Clone',
        alt: 'Stable Diffusion Clone',
        description:
            "Implemented Latent Dirichlet Allocation to conduct topic modeling on collection of student admission essays",
        technologies: ['Python', 'PostgreSQL'],
        link: 'https://github.com/kaifanyu/Stable-Diffusion-Clone',
    },	
    {
        image: wav2vec,
        title: 'Deepfake Audio Classifier',
        alt: 'deepfake audio',
        description:
            "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        technologies: ['LSTM', 'Tensorflow', 'Transformers', 'Wav2Vec2'],
        link: 'https://github.com/kaifanyu/DeepFake-Audio-Detection',
    },	
    {
        image: minecraft,
        title: 'Minecraft in C++',
        alt: 'minecraft',
        description:
            "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        technologies: ['Python', 'PostgreSQL'],
        link: 'https://github.com/kaifanyu/Minecraft',
    },	
    {
        image: cysafe,
        title: 'Cysafe',
        alt: 'cysafe',
        description:
            "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        technologies: ['Python', 'PostgreSQL'],
        link: 'https://github.com/kaifanyu/CySafe',
    },	
    {
        image: settlement,
        title: 'Settlement Detection',
        alt: 'settlement detection',
        description:
            "Implemented UNet3+ model for advanced electricity detection using satellite data on African settlements",
        technologies: ['Python', 'PostgreSQL'],
        link: 'https://github.com/kaifanyu/Settlement-Detection',
    },	
]

export default projects;