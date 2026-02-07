<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;

  type Star = {
    x: number;
    y: number;
    r: number;
    hue: number;
    sat: number;
    base: number; // base alpha
    amp: number; // twinkle amplitude
    speed: number; // twinkle speed
    phase: number; // phase offset
  };

  onMount(() => {
    const context = canvas.getContext('2d');
    if (!context) return;

    const starsCount = 500;
    const colorrange = [0, 60, 240];

    const getRandom = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    let starsArr: Star[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      // draw in CSS pixels
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeStars(count: number) {
      starsArr = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        base: 0.15 + Math.random() * 0.35,
        amp: 0.25 + Math.random() * 0.6,
        speed: 0.5 + Math.random() * 4.5,
        phase: Math.random() * Math.PI * 2
      }));
    }

    function renderBackground(timeMs: number) {
      const t = timeMs / 1000;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = '#111';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (const s of starsArr) {
        const tw = (Math.sin(t * s.speed + s.phase) + 1) / 2; // 0..1
        const a = Math.max(0, Math.min(1, s.base + s.amp * tw));

        context.beginPath();
        context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context.fillStyle = `hsla(${s.hue}, ${s.sat}%, 88%, ${a})`;
        context.fill();
      }
    }

    // Text animation state
    let frameNumber = 0;
    let opacity = 0;
    let secondOpacity = 0;
    let thirdOpacity = 0;

    const lines = [
      { start: 0, end: 600, text: 'everyday day I cannot believe how lucky I am' },
    ];

    function textAlphaWithinWindow(start: number, end: number, frame: number) {
      const mid = (start + end) / 2;
      const half = (end - start) / 2;
      const dist = Math.abs(frame - mid);
      const a = 1 - dist / half;
      return Math.max(0, Math.min(1, a));
    }

    // Init
    resize();
    makeStars(starsCount);

    let raf = 0;

    function draw(timeMs: number) {
      renderBackground(timeMs);

      context.font = '30px Comic Sans MS';
      context.textAlign = 'center';

      // timed single-line fades
      for (const l of lines) {
        if (frameNumber >= l.start && frameNumber < l.end) {
          const a = textAlphaWithinWindow(l.start, l.end, frameNumber);
          context.fillStyle = `rgba(45, 45, 255, ${a})`;
          context.fillText(l.text, window.innerWidth / 2, window.innerHeight / 2);
        }
      }

      // final multi-line fade-ins
      if (frameNumber > 3000) {
        opacity = Math.min(1, opacity + 0.01);
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText(
          'I love you so much Maggie, more than all the time and space in the universe can contain',
          window.innerWidth / 2,
          window.innerHeight / 2
        );
      }

      if (frameNumber >= 3300) {
        secondOpacity = Math.min(1, secondOpacity + 0.01);
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;
        context.fillText(
          "and I can't wait to spend all the time in the world to share that love with you!",
          window.innerWidth / 2,
          window.innerHeight / 2 + 50
        );
      }

      if (frameNumber >= 3600) {
        thirdOpacity = Math.min(1, thirdOpacity + 0.01);
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText('Happy Valentines Day <3', window.innerWidth / 2, window.innerHeight / 2 + 100);
      }

      frameNumber++;
      raf = window.requestAnimationFrame(draw);
    }

    raf = window.requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      makeStars(starsCount);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(raf);
    };
  });
</script>

<canvas bind:this={canvas} class="starfield" />

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .starfield {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #111;
    display: block;
  }
</style>
