/**
 * Preview-only palettes. The gallery injects a theme's CSS into its same-origin
 * iframe; the portfolio itself does not import this module or select a theme.
 * All typography, spacing, content, photographs, and diagrams stay unchanged.
 */
function themeCss(palette) {
	const grid = palette.grid
		? `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`
		: palette.grain
			? "url('/images/grain.svg')"
			: 'none';
	return `
html:root {
  color-scheme: ${palette.scheme};
  background: ${palette.background};
  --background-color: ${palette.background};
  --tab-color: ${palette.surface};
  --surface-color: ${palette.surface};
  --media-color: ${palette.media};
  --font-color: ${palette.ink};
  --date-color: ${palette.muted};
  --indicator-line-color: ${palette.ink};
  --section-title-color: ${palette.ink};
  --section-detail-color: ${palette.body};
  --section-skills-color: ${palette.accent};
  --view-projects-color: ${palette.ink};
  --paw-color: ${palette.ink};
  --section-skills-bubble-color: ${palette.tag};
  --border-color: ${palette.border};
  --hover-border-color: ${palette.hoverBorder};
  --tag-border-color: ${palette.tagBorder};
  --preview-surface: ${palette.surface};
  --preview-media: ${palette.media};
}
body.custom-body {
  background-color: ${palette.background};
  background-image: ${grid};
  background-size: ${palette.grid ? '48px 48px' : palette.grain ? '160px 160px' : 'auto'};
  background-position: 0 0;
  color: ${palette.ink};
}
body.custom-body .app-container { background: transparent; }
body.custom-body .noise-container { display: none; }
body.custom-body ::selection {
  background: ${palette.selection};
  color: ${palette.ink};
}
body.custom-body :focus-visible { outline-color: ${palette.accent}; }

/* The original sidebar contains several fixed light-on-dark colors. */
body.custom-body .name,
body.custom-body .name-link,
body.custom-body .hero-description,
body.custom-body .section-heading,
body.custom-body .research-entry h3,
body.custom-body .experience-entry h3,
body.custom-body .about-paragraph strong,
body.custom-body .project-archive h1,
body.custom-body .showcase h1,
body.custom-body .showcase h2,
body.custom-body .showcase h3 {
  color: ${palette.ink};
}
body.custom-body .identity .title,
body.custom-body .about-paragraph p,
body.custom-body .icon,
body.custom-body .research-diagram {
  color: ${palette.body};
}
body.custom-body .affiliation,
body.custom-body .date,
body.custom-body .email-link,
body.custom-body .nav-section a,
body.custom-body .section-number,
body.custom-body .research-groups > span,
body.custom-body .text-arrow,
body.custom-body .site-footer,
body.custom-body .site-footer > span {
  color: ${palette.muted};
}
body.custom-body .text-link,
body.custom-body .notebook-link,
body.custom-body .about-paragraph a {
  color: ${palette.ink};
  text-decoration-color: ${palette.accent};
}
body.custom-body .notebook-link > span > span { color: ${palette.muted}; }
body.custom-body .nav-section a.active,
body.custom-body .nav-section a:hover,
body.custom-body .text-link:hover,
body.custom-body .notebook-link:hover,
body.custom-body .about-paragraph a:hover,
body.custom-body .research-entry h3 a:hover,
body.custom-body .experience-entry h3 a:hover,
body.custom-body .icon:hover {
  color: ${palette.accent};
}
body.custom-body .profile-photo {
  background: ${palette.media};
  border-color: ${palette.border};
}
body.custom-body .profile-monogram { color: ${palette.muted}; }
body.custom-body .copied-msg {
  background: ${palette.ink};
  color: ${palette.background};
}
body.custom-body .research-diagram {
  background: ${palette.surface};
  border-color: ${palette.border};
}
body.custom-body .diagram-connector { color: ${palette.accent}; }
body.custom-body .technologies li {
  color: ${palette.accent};
  background: ${palette.tag};
  border-color: ${palette.tagBorder};
}

/*
 * Svelte repeats its scope class: .project-card + three scope classes, and
 * h3.scope a.scope.scope. Preview-only paint overrides therefore use targeted
 * !important declarations, including hover states, without touching layout.
 */
body.custom-body .project-card {
  background: ${palette.surface} !important;
  border-color: ${palette.border} !important;
}
body.custom-body .project-card:hover { border-color: ${palette.hoverBorder} !important; }
body.custom-body .project-card h3 a { color: ${palette.ink} !important; }
body.custom-body .project-card h3 span { color: ${palette.muted} !important; }
body.custom-body .project-card h3 a:hover,
body.custom-body .project-card h3 a:hover span { color: ${palette.accent} !important; }
body.custom-body .project-category { color: ${palette.accent} !important; }
body.custom-body .project-description { color: ${palette.body} !important; }
body.custom-body .project-action,
body.custom-body .project-gallery summary { color: ${palette.ink} !important; }
body.custom-body .project-action:hover,
body.custom-body .project-gallery summary:hover { color: ${palette.accent} !important; }
body.custom-body .project-cover,
body.custom-body .gallery-thumbnails img,
body.custom-body .showcase .hero-frame,
body.custom-body .showcase .gallery-frame {
  background: ${palette.media} !important;
  border-color: ${palette.border} !important;
}
body.custom-body .showcase .project-note,
body.custom-body .showcase .gallery-frame.placeholder {
  background: ${palette.surface} !important;
  border-color: ${palette.border} !important;
}
body.custom-body .showcase .gallery-frame.placeholder { color: ${palette.muted} !important; }
body.custom-body .skip-link,
body.custom-body .skip-link:focus {
  background: ${palette.ink};
  color: ${palette.background};
}
`.trim();
}

const palettes = [
	{
		id: 'paper',
		name: 'Warm Paper',
		description: 'Soft ivory, charcoal text, and restrained copper details.',
		background: '#F7F5F0',
		accent: '#8C5938',
		scheme: 'light',
		ink: '#292D29',
		body: '#535A53',
		muted: '#686C64',
		surface: '#FDFCF9',
		media: '#EBE8E0',
		border: '#DDDCD3',
		hoverBorder: '#BAAA94',
		tag: '#EFEAE1',
		tagBorder: '#E2D8C9',
		selection: '#DDD0B8'
	},
	{
		id: 'mist',
		name: 'Cool Mist',
		description: 'A pale blue-gray canvas with crisp white cards and muted blue links.',
		background: '#F2F5F9',
		accent: '#3565A0',
		scheme: 'light',
		ink: '#253346',
		body: '#536276',
		muted: '#606E80',
		surface: '#FFFFFF',
		media: '#E7EDF4',
		border: '#DCE3EC',
		hoverBorder: '#A7BCD5',
		tag: '#E8EFF8',
		tagBorder: '#D4E0F0',
		selection: '#CBDBEF'
	},
	{
		id: 'graphite',
		name: 'Graphite',
		description: 'Charcoal with fine film grain, soft white text, and a quiet blue-green accent.',
		background: '#1C2026',
		accent: '#9BC4CE',
		scheme: 'dark',
		ink: '#EBEEF2',
		body: '#BEC7D1',
		muted: '#9AA5B3',
		surface: '#232930',
		media: '#171B20',
		border: '#363E48',
		hoverBorder: '#607581',
		tag: '#28343C',
		tagBorder: '#3A4B55',
		selection: '#435C69',
		grain: true
	},
	{
		id: 'blueprint',
		name: 'Subtle Blueprint',
		description: 'An almost-white canvas with a faint 48 px grid and deep blue details.',
		background: '#F4F8FC',
		accent: '#30679F',
		scheme: 'light',
		ink: '#21384E',
		body: '#52697D',
		muted: '#5E7185',
		surface: '#FCFEFF',
		media: '#E8F0F7',
		border: '#D7E2ED',
		hoverBorder: '#9CB8D0',
		tag: '#E8F0F8',
		tagBorder: '#D1E0EE',
		selection: '#CCDEEE',
		grid: 'rgba(53, 101, 147, 0.045)'
	}
];

/**
 * background and accent are uppercase hex labels for the gallery swatches.
 * Replace one iframe <style> element's textContent with css when selecting.
 */
export const themes = palettes.map((palette) => ({
	id: palette.id,
	name: palette.name,
	description: palette.description,
	background: palette.background,
	accent: palette.accent,
	css: themeCss(palette)
}));
