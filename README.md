# Kai Yu's portfolio

A SvelteKit portfolio with research, selected projects, and an archive. The existing Cloudflare Pages adapter is unchanged.

## Local development

```bash
npm install
npm run dev
```

Open `/design-options.html` on the local dev server to compare Warm Paper, Cool Mist, Graphite, and Subtle Blueprint backgrounds on the actual portfolio. The preview includes desktop/mobile controls and keeps the site's current background unchanged. Palette definitions live in `static/design-options/themes.js`.

The portfolio uses Graphite with a static, fine grain texture painted behind the content. Theme colors are in `src/app.css`; the texture is `static/images/grain.svg` (8% opacity). The homepage includes construction lines, magnetic social links, faint stars, orbital arcs, and constellations. A small telescope stays fixed at the bottom-left of the viewport as you scroll, including on mobile. The celestial artwork is static and ignores pointer input; magnetic links respect reduced-motion preferences.

The **sun icon** beside the homepage's @ icon switches between Graphite and a light palette. The same icon appears in project navigation. Your choice is saved in this browser and restored before the page paints; Graphite is the default. Both palettes, including the celestial drawing colors, are defined in `src/app.css`.

## Interactive design preview

Open `/playground` on the local dev server for **Night studies**, a separate preview using the real portfolio content. Choose **Selected** for construction lines and magnetic links, **Starlight** to add faint stars, or **Observatory** for the full celestial background. Direct preset links work: `/playground?mode=selected`, `/playground?mode=starlight`, and `/playground?mode=observatory`.

Open **Explore 6** to compare the six homepage details, toggle each one, adjust **Sky contrast**, jump to a decoration, star favorites, and copy a shortlist. Preferences stay in this browser and apply only to the playground. **Just my two** returns the preview to construction lines and magnetic links.

The celestial artwork is static and placed near the margins; the telescope is fixed to the bottom-left of the screen. Use **Pause motion** to stop the magnetic response and hover animations. The preview respects the operating system's reduced-motion setting; pointer effects are disabled on touch devices. The preview is marked `noindex`.

Descriptions and presets live in `src/lib/components/playground/celestialCatalog.ts`; the SVG artwork is in `CelestialBackdrop.svelte` alongside it. The route is `src/routes/playground/+page.svelte`, with celestial preview adjustments in `night.css`. Preview styles and behavior are scoped to this route. Its browser checks are in `tests/playground.spec.ts`.

## Content and images

- `src/lib/scripts/research.ts`: research entries, ordered as they appear on the homepage.
- `src/lib/scripts/projects.ts`: project cards; `featured: true` includes a project on the homepage. All entries appear at `/projects`.
- `src/lib/scripts/showcases.ts`: HAMR, F1-3DGS, and RL-VLA detail pages, technical sections, and image captions.
- `src/lib/scripts/experiences.ts`: experience history.

### Add your profile picture

1. Save a portrait as `static/images/profile.jpg` (a square or portrait crop works well).
2. Set `photo: '/images/profile.jpg'` in `src/lib/scripts/profile.ts`.

On this computer, the image goes at `C:\Users\aishi\Documents\Upenn\Portfolio\static\images\profile.jpg`. JPG, PNG, and WebP all work; match the filename and extension in `profile.ts`. Rebuild/deploy the portfolio to update the hosted image.

The photo sits beside your name. Until a path is set, or if the image cannot load, the same frame displays KY. Adjust `object-position` on `.profile-photo img` in `src/routes/style.css` if the crop needs repositioning.

The homepage and project archive use two columns on wider screens and a single column on phones. The sidebar's **Blog & paper collection** link opens [Labbook](https://www.thejoyestboy.com/).

### Add project images

**Homepage thumbnail carousels:** HAMR and RL-VLA each have three slides, shared with their cards on `/projects`. The first slide uses the existing cover; slides 2 and 3 show placeholders until you add images. Use the small arrows to cycle through them.

1. Put HAMR images in `static/images/projects/hamr/` and RL-VLA images in `static/images/projects/rl-vla/`.
2. Open `src/lib/scripts/projects.ts` and find the matching project's `thumbnails` array.
3. Replace each empty `src` with its image path and update the `alt` description. For example:

```ts
{ src: '/images/projects/hamr/thumbnail-2.jpg', alt: 'HAMR following a planned path' }
{ src: '/images/projects/rl-vla/thumbnail-2.jpg', alt: 'RL-VLA simulation rollout' }
```

You can replace the first slide's `src` too. Suggested filenames are `thumbnail-1.jpg`, `thumbnail-2.jpg`, and `thumbnail-3.jpg` inside each project folder. JPG, PNG, WebP, GIF, and SVG work; match the actual extension in the path. A blank `src` keeps the placeholder. A wide image around 1200 × 600 works well; images are displayed without cropping. Restarting the dev server is unnecessary, but the hosted site needs a new deployment.

**Project detail galleries:**

Place images in `static/images/projects/hamr/` or `static/images/projects/f1-3dgs/`. In the matching `gallery` entry in `showcases.ts`, add a `src` beginning with `/images/projects/`, an informative `alt`, and update the caption. Entries without a `src` display a styled placeholder. Clickable project images open the original for closer inspection.

RL-VLA uses `static/images/projects/rl-vla/residual-policy.svg`, a schematic based on the project's local README and design notes. Its project page links to the repository and describes the verified pipeline without claiming completed VLA training or improved robot performance.

Current media comes from the supplied project folders:

| Website image                            | Source                                                                                       | Context                                                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `hamr/caster-tracking.png`               | `Caster_Vision/ball_caster_dual_cam/out/orientation_final/replay/tracking_00000.png`         | Recorded dual-camera caster analysis, including estimated phases. |
| `hamr/motor-response.png`                | `HAMR_Controller/pwm_vs_rpm.png`                                                             | Motor characterization; not a tracking-performance result.        |
| `f1-3dgs/levine-rgb-capture.png`         | `F1-3DGS/levine_1lap/levine_1lap/color/1000.png`                                             | Input image, not a Gaussian render.                               |
| `f1-3dgs/moore-three-lap-trajectory.png` | `F1-3DGS/moore_lap3_filtered.zip` → `moore_lap3_filtered/trajectory_plots/trajectory_xy.png` | Recorded robot trajectory.                                        |

The xLAB description presents conditional-generation work as research toward image-editing policies. It does not claim a completed editing system. HAMR's latest integrated localization/control setup is identified as awaiting hardware validation.

## Validation

```bash
npm run check
npm run build
npm test
```

Build before running browser tests; they use the production preview on port 4173. Install Playwright Chromium if needed (`npx playwright install chromium`), or use an installed browser by setting `PLAYWRIGHT_CHANNEL=msedge` or `chrome`. Browser screenshots are saved under `test-results/`.
