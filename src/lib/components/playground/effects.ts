export interface EffectOptions {
	enabled: string[];
	motion: boolean;
}

/** Pointer work is coalesced into one frame; there is deliberately no idle animation loop. */
export function interactiveEffects(node: HTMLElement, options: EffectOptions) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
	const precise = window.matchMedia('(hover: hover) and (pointer: fine)');
	const canvas = node.querySelector<HTMLCanvasElement>('[data-vector-canvas]');
	const context = canvas?.getContext('2d');
	const headings = Array.from(node.querySelectorAll<HTMLElement>('.section-heading'));
	const savedStyles = new Map<HTMLElement, Map<string, string>>();
	const savedAttributes = new Map<Element, Map<string, string | null>>();
	let enabled = new Set(options.enabled);
	let active = false;
	let pointerEffects = false;
	let inside = false;
	let frame = 0;
	let pointerX = window.innerWidth / 2;
	let pointerY = window.innerHeight / 2;
	let pointerTarget: Element | null = null;
	let magneticTarget: HTMLElement | null = null;
	let tiltedTarget: HTMLElement | null = null;
	let observer: IntersectionObserver | undefined;
	let observing = false;
	let width = window.innerWidth;
	let height = window.innerHeight;

	function attribute(element: Element, name: string, value: string) {
		let originals = savedAttributes.get(element);
		if (!originals) savedAttributes.set(element, (originals = new Map()));
		if (!originals.has(name)) originals.set(name, element.getAttribute(name));
		if (element.getAttribute(name) !== value) element.setAttribute(name, value);
	}

	function style(element: HTMLElement, name: string, value: string) {
		let originals = savedStyles.get(element);
		if (!originals) savedStyles.set(element, (originals = new Map()));
		if (!originals.has(name)) originals.set(name, element.style.getPropertyValue(name));
		element.style.setProperty(name, value);
	}

	function restoreStyles(element: HTMLElement | null) {
		if (!element) return;
		for (const [name, value] of savedStyles.get(element) ?? []) {
			if (value) element.style.setProperty(name, value);
			else element.style.removeProperty(name);
		}
		savedStyles.delete(element);
	}

	function clearTargets() {
		restoreStyles(magneticTarget);
		restoreStyles(tiltedTarget);
		magneticTarget = null;
		tiltedTarget = null;
	}

	function clearCanvas() {
		if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
	}

	function drawField() {
		if (!canvas || !context) return;
		const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
		const pixelWidth = Math.round(width * ratio);
		const pixelHeight = Math.round(height * ratio);
		attribute(canvas, 'width', String(pixelWidth));
		attribute(canvas, 'height', String(pixelHeight));
		context.setTransform(ratio, 0, 0, ratio, 0, 0);
		context.clearRect(0, 0, width, height);
		const spacing = Math.max(64, Math.sqrt((width * height) / 90));
		let count = 0;
		for (let x = spacing / 2; x < width && count < 100; x += spacing) {
			if (x > width * 0.22 && x < width * 0.78) continue;
			for (let y = spacing / 2; y < height && count < 100; y += spacing) {
				const angle = Math.atan2(pointerY - y, pointerX - x);
				const strength = Math.max(0, 1 - Math.hypot(pointerX - x, pointerY - y) / 420);
				const length = 8 + strength * 4;
				context.save();
				context.translate(x, y);
				context.rotate(angle);
				context.strokeStyle = `rgba(155, 196, 206, ${0.24 + strength * 0.24})`;
				context.lineWidth = 0.7;
				context.beginPath();
				context.moveTo(-length / 2, 0);
				context.lineTo(length / 2, 0);
				context.moveTo(length / 2 - 3, -2);
				context.lineTo(length / 2, 0);
				context.lineTo(length / 2 - 3, 2);
				context.stroke();
				context.restore();
				count++;
			}
		}
	}

	function render() {
		frame = 0;
		if (!active || document.hidden) return;
		if (enabled.has('halo') || enabled.has('cursor')) {
			style(node, '--pointer-x', `${pointerX.toFixed(1)}px`);
			style(node, '--pointer-y', `${pointerY.toFixed(1)}px`);
		}
		const icon =
			inside && enabled.has('magnet')
				? (pointerTarget?.closest<HTMLElement>('.social-media .icon') ?? null)
				: null;
		if (icon !== magneticTarget) restoreStyles(magneticTarget);
		magneticTarget = icon && node.contains(icon) ? icon : null;
		if (magneticTarget) {
			const bounds = magneticTarget.getBoundingClientRect();
			const dx = Math.max(-4, Math.min(4, (pointerX - bounds.left - bounds.width / 2) * 0.18));
			const dy = Math.max(-4, Math.min(4, (pointerY - bounds.top - bounds.height / 2) * 0.18));
			style(magneticTarget, '--magnet-x', `${dx.toFixed(2)}px`);
			style(magneticTarget, '--magnet-y', `${dy.toFixed(2)}px`);
		}
		const cover =
			inside && enabled.has('tilt')
				? (pointerTarget?.closest<HTMLElement>('.project-cover') ?? null)
				: null;
		const card = cover?.closest<HTMLElement>('.project-card') ?? null;
		if (card !== tiltedTarget) restoreStyles(tiltedTarget);
		tiltedTarget = card && node.contains(card) ? card : null;
		if (cover && tiltedTarget) {
			const bounds = cover.getBoundingClientRect();
			const dx = Math.max(-1, Math.min(1, ((pointerX - bounds.left) / bounds.width - 0.5) * 2));
			const dy = Math.max(-1, Math.min(1, ((pointerY - bounds.top) / bounds.height - 0.5) * 2));
			style(tiltedTarget, '--tilt-x', `${(-dy * 2).toFixed(2)}deg`);
			style(tiltedTarget, '--tilt-y', `${(dx * 2).toFixed(2)}deg`);
		}
		if (enabled.has('field')) drawField();
	}

	function schedule() {
		if (active && !document.hidden && !frame) frame = requestAnimationFrame(render);
	}

	function move(event: PointerEvent) {
		if (!active || !pointerEffects || event.pointerType === 'touch') return;
		inside = true;
		pointerX = event.clientX;
		pointerY = event.clientY;
		pointerTarget = event.target instanceof Element ? event.target : null;
		attribute(node, 'data-pointer-visible', 'true');
		schedule();
	}

	function leave() {
		inside = false;
		pointerTarget = null;
		attribute(node, 'data-pointer-visible', 'false');
		clearTargets();
	}

	function refresh() {
		enabled = new Set(options.enabled);
		pointerEffects = ['halo', 'field', 'cursor', 'magnet', 'tilt'].some((id) => enabled.has(id));
		active =
			options.motion &&
			!reduced.matches &&
			precise.matches &&
			!document.hidden &&
			(pointerEffects || enabled.has('reveal'));
		attribute(node, 'data-effects-active', String(active));
		clearTargets();
		if (!active) {
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
			leave();
			restoreStyles(node);
		}
		if (!active || !enabled.has('field')) clearCanvas();
		const shouldObserve = active && enabled.has('reveal');
		if (observing !== shouldObserve) {
			observer?.disconnect();
			observer = undefined;
			observing = shouldObserve;
			if (shouldObserve && 'IntersectionObserver' in window) {
				observer = new IntersectionObserver(
					(entries) => {
						for (const entry of entries) {
							if (entry.isIntersecting) {
								attribute(entry.target, 'data-revealed', 'true');
								observer?.unobserve(entry.target);
							}
						}
					},
					{ threshold: 0.25 }
				);
				for (const heading of headings) {
					attribute(heading, 'data-revealed', 'false');
					observer.observe(heading);
				}
			} else {
				for (const heading of headings) attribute(heading, 'data-revealed', 'true');
			}
		}
		schedule();
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		schedule();
	}

	node.addEventListener('pointermove', move, { passive: true });
	node.addEventListener('pointerleave', leave, { passive: true });
	window.addEventListener('resize', resize, { passive: true });
	document.addEventListener('visibilitychange', refresh);
	reduced.addEventListener('change', refresh);
	precise.addEventListener('change', refresh);
	refresh();

	return {
		update(next: EffectOptions) {
			options = next;
			refresh();
		},
		destroy() {
			if (frame) cancelAnimationFrame(frame);
			observer?.disconnect();
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
			window.removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', refresh);
			reduced.removeEventListener('change', refresh);
			precise.removeEventListener('change', refresh);
			clearCanvas();
			for (const element of Array.from(savedStyles.keys())) restoreStyles(element);
			for (const [element, attributes] of savedAttributes) {
				for (const [name, value] of attributes) {
					if (value === null) element.removeAttribute(name);
					else element.setAttribute(name, value);
				}
			}
		}
	};
}
