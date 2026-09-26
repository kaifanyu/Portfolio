import { error } from '@sveltejs/kit';
import { showcases } from '$lib/scripts/showcases';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;
export const entries: EntryGenerator = () => showcases.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const showcase = showcases.find((project) => project.slug === params.slug);
	if (!showcase) error(404, 'Project not found');
	return { showcase };
};
