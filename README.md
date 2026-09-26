# Kai Yu's portfolio

A SvelteKit portfolio with research, selected projects, and an archive. The existing Cloudflare Pages adapter is unchanged.

## Local development

```bash
npm install
npm run dev
```

## Content and images

- `src/lib/scripts/research.ts`: research entries, ordered as they appear on the homepage.
- `src/lib/scripts/projects.ts`: project cards; `featured: true` includes a project on the homepage. All entries appear at `/projects`.
- `src/lib/scripts/showcases.ts`: HAMR and F1-3DGS detail pages, technical sections, image captions, and future media slots.
- `src/lib/scripts/experiences.ts`: experience history.

### Add your profile picture

1. Save a portrait as `static/images/profile.jpg` (a square or portrait crop works well).
2. Set `photo: '/images/profile.jpg'` in `src/lib/scripts/profile.ts`.

The photo sits beside your name. Until a path is set, or if the image cannot load, the same frame displays KY. Adjust `object-position` on `.profile-photo img` in `src/routes/style.css` if the crop needs repositioning.

### Add project images

Place images in `static/images/projects/hamr/` or `static/images/projects/f1-3dgs/`. In the matching `gallery` entry in `showcases.ts`, add a `src` beginning with `/images/projects/`, an informative `alt`, and update the caption. Entries without a `src` display a styled placeholder. Clickable project images open the original for closer inspection.

Current media comes from the supplied project folders:

| Website image                            | Source                                                                                       | Context                                                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `hamr/caster-tracking.png`               | `Caster_Vision/ball_caster_dual_cam/out/orientation_final/replay/tracking_00000.png`         | Recorded dual-camera caster analysis, including estimated phases. |
| `hamr/motor-response.png`                | `HAMR_Controller/pwm_vs_rpm.png`                                                             | Motor characterization; not a tracking-performance result.        |
| `f1-3dgs/levine-rgb-capture.png`         | `F1-3DGS/levine_1lap/levine_1lap/color/1000.png`                                             | Input image, not a Gaussian render.                               |
| `f1-3dgs/moore-three-lap-trajectory.png` | `F1-3DGS/moore_lap3_filtered.zip` → `moore_lap3_filtered/trajectory_plots/trajectory_xy.png` | Recorded robot trajectory.                                        |

The Xlabs description presents conditional-generation work as research toward image-editing policies. It does not claim a completed editing system. HAMR's latest integrated localization/control setup is identified as awaiting hardware validation.

## Validation

```bash
npm run check
npm run build
npm test
```

Build before running browser tests; they use the production preview on port 4173. Install Playwright Chromium if needed (`npx playwright install chromium`), or use an installed browser by setting `PLAYWRIGHT_CHANNEL=msedge` or `chrome`. Browser screenshots are saved under `test-results/`.
