<div class="noise-container">
  <div class="noise-grain"></div>
</div>

<style>
  .noise-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 9999;
    pointer-events: none;
  }

  .noise-grain {
    /* Make it 200% size so we can move it around without showing edges */
    width: 200%;
    height: 200%;
    position: absolute;
    top: -50%;
    left: -50%;
    opacity: 0.06; /* Adjust for subtleness */
    
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 281 281' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    
    /* Apply the animation */
    animation: noise-flicker 0.2s infinite steps(4);
  }

  @keyframes noise-flicker {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-1%, -1%); }
    20% { transform: translate(-2%, 1%); }
    30% { transform: translate(1%, -2%); }
    40% { transform: translate(-1%, 3%); }
    50% { transform: translate(-2%, 1%); }
    60% { transform: translate(3%, 0); }
    70% { transform: translate(0, 2%); }
    80% { transform: translate(-3%, 1%); }
    90% { transform: translate(1%, 2%); }
    100% { transform: translate(2%, 1%); }
  }
</style>