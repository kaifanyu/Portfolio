<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import FlightVideo from './FlightVideo.svelte';

	export let repository: string | undefined;

	const chapters = [
		{ id: 'environment', label: 'The setup' },
		{ id: 'learning', label: 'Teaching the policy' },
		{ id: 'iterations', label: 'Finding speed' },
		{ id: 'transfer', label: 'Sim to real' },
		{ id: 'real-flight', label: 'The flight' }
	];
	const rewards = [
		{
			name: 'Make progress',
			text: 'Reward the decrease in distance to the next gate at every step. This gives the drone useful feedback long before it finishes a lap.'
		},
		{
			name: 'Pass the right gate',
			text: 'Add a bonus only when the drone crosses the gate opening in the correct direction. A valid crossing advances the target, so hovering near a gate is not enough.'
		},
		{
			name: 'Move with purpose',
			text: 'Reward speed directed toward the next target. We adjusted this term to encourage a faster racing line, rather than simply moving quickly in any direction.'
		},
		{
			name: 'Make time matter',
			text: 'Charge a small cost for every step until three laps are complete. Waiting and taking a long detour now have a price, encouraging the drone to finish sooner.'
		},
		{
			name: 'Keep the motion controllable',
			text: 'Penalize aggressive roll, pitch, and yaw commands. We tuned their influence so the policy could turn quickly without becoming erratic.'
		},
		{
			name: 'Make mistakes expensive',
			text: 'Penalize collisions and invalid gate passes. These costs keep the search for speed tied to actually completing the course.'
		},
		{
			name: 'Arrive at the right height',
			text: 'In later flight refinements, add a height-error penalty near the gate. It encourages the drone to line up vertically before reaching the opening.'
		}
	];
	const variations = [
		{
			title: 'Thrust strength',
			before: '±5%',
			after: '±10%',
			text: 'Give each simulated drone a little more or less lifting power, so the policy can handle a different thrust response.'
		},
		{
			title: 'Aerodynamic drag',
			before: '0.5–2.0×',
			after: '0.4–2.3×',
			text: 'Vary how strongly the air slows the drone. The same command should still work when the real vehicle carries speed differently.'
		},
		{
			title: 'Controller response',
			before: 'Narrower gains',
			after: 'P/I ±20% · D ±35%',
			text: 'Vary the low-level PID gains, changing how strongly the drone responds and settles after a command.'
		}
	];
</script>

<main class="drone-showcase" id="main-content">
	<nav class="page-navigation" aria-label="Project navigation">
		<a class="text-link" href="/#projects"><span aria-hidden="true">←</span> Back to portfolio</a>
		<div class="navigation-right">
			<a class="text-link" href="/projects">All projects</a>
			<ThemeToggle />
		</div>
	</nav>

	<header class="project-intro">
		<p class="eyebrow">ESE 651 · Physical Intelligence · Penn</p>
		<h1>Drone Racing</h1>
		<p class="headline">Learning a faster line.</p>
		<p class="intro-copy">
			How do you teach a drone to race? We started by telling it where to fly, then learned to give
			it room to find its own way. A project in reinforcement learning, from the first power loops
			in simulation to a real-world flight.
		</p>
		<div class="intro-links">
			<a class="primary-link" href="#iterations"
				>Watch the evolution <span aria-hidden="true">↘</span></a
			>
			<a class="text-link" href="#real-flight"
				>Jump to real flight <span aria-hidden="true">↓</span></a
			>
			{#if repository}
				<a class="text-link" href={repository} target="_blank" rel="noopener noreferrer"
					>View on GitHub <span aria-hidden="true">↗</span></a
				>
			{/if}
		</div>
	</header>

	<figure class="course-hero">
		<img
			src="/media/drone-racing/version-2-alt.jpg"
			alt="The Crazyflie racing environment in Isaac Lab, with gates arranged across the simulated course"
			width="1600"
			height="900"
			fetchpriority="high"
		/>
		<figcaption>
			<span class="status-dot" aria-hidden="true"></span> The training ground
			<span> NVIDIA Isaac Lab / Crazyflie</span>
		</figcaption>
	</figure>

	<dl class="project-facts">
		<div>
			<dt>The challenge</dt>
			<dd>3 laps, fastest time</dd>
		</div>
		<div>
			<dt>The learner</dt>
			<dd>PPO</dd>
		</div>
		<div>
			<dt>Simulation iterations</dt>
			<dd>~21 s <span aria-hidden="true">→</span> ~19 s</dd>
		</div>
		<div>
			<dt>The destination</dt>
			<dd>Real flight</dd>
		</div>
	</dl>

	<nav class="chapter-navigation" aria-label="Project chapters">
		{#each chapters as chapter, i}
			<a href={`#${chapter.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{chapter.label}</a>
		{/each}
	</nav>

	<section class="chapter" id="environment" aria-labelledby="environment-heading">
		<div class="chapter-label">
			<span>01</span>
			<p>The setup</p>
		</div>
		<div class="chapter-body">
			<p class="eyebrow">A small drone. A demanding course.</p>
			<h2 id="environment-heading">Build a world to practice in.</h2>
			<p>
				The goal was simple: fly through the gates in order and finish <strong
					>three laps in the shortest time</strong
				>. Getting there meant learning when to accelerate, how to turn, and how to arrive at each
				gate ready for the next one.
			</p>
			<p>
				We used <strong>NVIDIA Isaac Lab</strong>, built on Isaac Sim, to train a simulated
				Crazyflie quadcopter. Thousands of copies of the course could run in parallel, letting the
				policy collect flight experience much faster than a single physical drone could.
			</p>
			<div class="setup-strip" aria-label="Simulation and control stack">
				<div>
					<span>Simulation</span><strong>Isaac Sim + Isaac Lab</strong><small
						>Physics, drone, and gates</small
					>
				</div>
				<span class="flow-arrow" aria-hidden="true">→</span>
				<div>
					<span>Learning</span><strong>PyTorch + rsl_rl</strong><small
						>PPO learns the flight policy</small
					>
				</div>
				<span class="flow-arrow" aria-hidden="true">→</span>
				<div>
					<span>Control</span><strong>Thrust + body rates</strong><small
						>Low-level controller drives the motors</small
					>
				</div>
			</div>
			<aside class="concept-note">
				<h3>What is a power loop?</h3>
				<p>
					A vertical looping maneuver that brings the drone around to enter two neighboring gates
					from the same side. Instead of treating every gate as a separate turn, the drone links
					them into one continuous motion. The challenge is carrying speed through the loop while
					lining up the next gate.
				</p>
			</aside>
			<details class="code-notes">
				<summary>A little more about the environment <span aria-hidden="true">+</span></summary>
				<p>
					The setup uses Isaac Sim 4.5, the course’s Isaac Lab fork, a Python 3.10 environment,
					CUDA-enabled PyTorch, and a local copy of rsl_rl. Physics and the low-level controller run
					at 500 Hz; the policy sends a new command at 50 Hz. Its observations include body
					velocity, orientation, and the current and next gate geometry, giving it a look ahead
					instead of only a single target.
				</p>
			</details>
		</div>
	</section>

	<section class="chapter" id="learning" aria-labelledby="learning-heading">
		<div class="chapter-label">
			<span>02</span>
			<p>Teaching the policy</p>
		</div>
		<div class="chapter-body">
			<p class="eyebrow">Reinforcement learning</p>
			<h2 id="learning-heading">The reward is the instruction.</h2>
			<p>
				We used <strong>Proximal Policy Optimization (PPO)</strong>. The policy tries a flight,
				receives a score, and updates its behavior. PPO keeps each update relatively small, so a
				promising controller can improve without changing too abruptly.
			</p>
			<p>
				The interesting part was deciding what “better” meant. A reward function turns our intent
				into feedback: encourage useful behavior, charge for mistakes, and balance those signals
				until the drone learns a complete race.
			</p>
			<div class="learning-loop" aria-label="The reinforcement learning cycle">
				<span>Observe the course</span><b aria-hidden="true">→</b><span>Choose a command</span><b
					aria-hidden="true">→</b
				><span>Score the flight</span><b aria-hidden="true">↻</b><span>Update with PPO</span>
			</div>
			<div class="reward-list">
				{#each rewards as reward, i}
					<div class="reward-row">
						<span class="reward-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3>{reward.name}</h3>
							<p>{reward.text}</p>
						</div>
					</div>
				{/each}
			</div>
			<details class="code-notes">
				<summary>What we changed in the code <span aria-hidden="true">+</span></summary>
				<p>
					In <code>quadcopter_strategies.py</code>, the racing logic scores progress, checks gate
					crossings, advances targets, and combines the reward terms. We added look-ahead gate
					observations and resets from previously successful flight states, so training could
					practice beyond the starting line. Reward weights are set in <code>train_race.py</code>.
				</p>
				<p>
					In the local <code>ppo.py</code>, we implemented the policy update: compare the new action
					probabilities with the old ones, clip large changes, and train a value function to
					estimate how promising each state is. The learner stays the same while we change the
					feedback and the world it practices in.
				</p>
			</details>
		</div>
	</section>

	<section class="chapter" id="iterations" aria-labelledby="iterations-heading">
		<div class="chapter-label">
			<span>03</span>
			<p>Finding speed</p>
		</div>
		<div class="chapter-body">
			<p class="eyebrow">Two versions, one useful lesson</p>
			<h2 id="iterations-heading">From a prescribed path to a learned line.</h2>
			<div class="iteration-heading">
				<div>
					<span class="version-label">Version 01</span>
					<h3>First, make it go over.</h3>
				</div>
				<p class="run-time">~21<span>s / 3 laps</span></p>
			</div>
			<p>
				Our first approach guided the shape of the maneuver. We added an elevated virtual target to
				encourage the drone to climb above the gate and come back around. This made the intended
				loop easier to learn, but also asked the drone to follow a path we had chosen.
			</p>
			<FlightVideo
				title="Version 1 · Guided flight"
				primary="/media/drone-racing/version-1.mp4"
				poster="/media/drone-racing/version-1.jpg"
				alternate="/media/drone-racing/version-1-alt.mp4"
				alternatePoster="/media/drone-racing/version-1-alt.jpg"
				caption="The first version encourages an elevated route. Switch angles to see the shape of the loop from another viewpoint."
			/>
			<div class="iteration-heading second-iteration">
				<div>
					<span class="version-label">Version 02</span>
					<h3>Then, let it find the speed.</h3>
				</div>
				<p class="run-time">~19<span>s / 3 laps</span></p>
			</div>
			<p>
				We then asked a different question: if we reward moving quickly toward the next gate, can
				the policy discover a better route itself? We moved away from the forced high waypoint and
				tuned the balance between progress, useful velocity, and control penalties. The gate
				sequence still defined the race; the policy had more freedom to choose the line.
			</p>
			<FlightVideo
				title="Version 2 · Learned racing line"
				primary="/media/drone-racing/version-2.mp4"
				poster="/media/drone-racing/version-2.jpg"
				alternate="/media/drone-racing/version-2-alt.mp4"
				alternatePoster="/media/drone-racing/version-2-alt.jpg"
				caption="The second version gives the policy more freedom to connect the gates while rewarding speed toward its target."
			/>
			<div class="takeaway">
				<span>What changed</span>
				<p>
					About two seconds faster across three laps, with more of the racing line discovered by the
					policy.
				</p>
			</div>
			<p class="small-note">
				Approximate simulation run times. The clips show the two versions from different views;
				video duration is not the race timer.
			</p>
		</div>
	</section>

	<section class="chapter" id="transfer" aria-labelledby="transfer-heading">
		<div class="chapter-label">
			<span>04</span>
			<p>Sim to real</p>
		</div>
		<div class="chapter-body">
			<p class="eyebrow">Prepare for an imperfect world</p>
			<h2 id="transfer-heading">Train for more than one drone.</h2>
			<p>
				A fast simulation policy still has to work on hardware. The real drone will not respond
				exactly like the model: thrust, drag, and controller response can all differ. We used
				<strong>domain randomization</strong> to vary those properties during training, then fine-tuned
				the racing policy across the variations.
			</p>
			<p>
				Think of it as practicing the same course with a slightly different drone each time. The
				policy has to learn behavior that works across a range of conditions, instead of depending
				on one perfect set of physics parameters.
			</p>
			<div class="variation-list">
				{#each variations as variation}
					<div class="variation-row">
						<div>
							<h3>{variation.title}</h3>
							<p>{variation.text}</p>
						</div>
						<div class="range-change">
							<span>{variation.before}</span><b aria-hidden="true">↓</b><strong
								>{variation.after}</strong
							>
						</div>
					</div>
				{/each}
			</div>
			<details class="code-notes">
				<summary>How the randomization was added <span aria-hidden="true">+</span></summary>
				<p>
					At reset, <code>quadcopter_strategies.py</code> samples thrust-to-weight ratio, aerodynamic
					drag, and PID gains for each environment. We widened these ranges for robustness training: P
					and I gains went from ±15% to ±20%, and D from ±30% to ±35%. A saved racing checkpoint provides
					the starting point for fine-tuning.
				</p>
				<p>
					We also added configurable observation-noise support. Its noise levels are zero in the
					saved configuration, so the active randomization here concerns flight dynamics and
					controller gains.
				</p>
			</details>
		</div>
	</section>

	<section class="chapter final-chapter" id="real-flight" aria-labelledby="flight-heading">
		<div class="chapter-label">
			<span>05</span>
			<p>The flight</p>
		</div>
		<div class="chapter-body">
			<p class="eyebrow">Out of the simulator</p>
			<h2 id="flight-heading">Bring the policy into the room.</h2>
			<p>
				The final step was testing the trained policy on a physical course. After all the reward
				tuning and simulated practice, this is the part where the project becomes tangible: a real
				drone, real gates, and the learned controller in flight.
			</p>
			<FlightVideo
				title="Real-world flight"
				primary="/media/drone-racing/real-flight.mp4"
				poster="/media/drone-racing/real-flight.jpg"
				caption="Physical drone testing after simulation training. The ~21 s and ~19 s comparisons above refer to the simulated power-loop course."
			/>
			<div class="closing-thought">
				<span class="eyebrow">The takeaway</span>
				<p>
					We started by teaching a maneuver. We ended by learning how to write a better
					objective—and how to give the policy enough room to solve it.
				</p>
			</div>
		</div>
	</section>

	<footer class="project-footer">
		<a class="text-link" href="/#projects"
			><span aria-hidden="true">←</span> Back to selected projects</a
		>
		<a class="text-link" href="#main-content">Back to top <span aria-hidden="true">↑</span></a>
	</footer>
</main>

<style>
	.drone-showcase {
		max-width: 1120px;
		margin: 0 auto;
		padding: 48px 36px 64px;
	}
	.page-navigation,
	.navigation-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 28px;
	}
	.project-intro {
		margin: 88px 0 44px;
		max-width: 800px;
	}
	.eyebrow {
		color: var(--section-skills-color);
		font-size: 0.65rem;
		letter-spacing: 1.7px;
		line-height: 1.8;
		text-transform: uppercase;
		margin: 0 0 17px;
	}
	h1 {
		font-size: clamp(2.8rem, 7vw, 5.2rem);
		font-weight: 500;
		letter-spacing: -0.065em;
		line-height: 1.06;
		margin: 0;
	}
	.headline {
		font-size: clamp(1.5rem, 3.5vw, 2.4rem);
		color: var(--date-color);
		line-height: 1.25;
		letter-spacing: -0.045em;
		margin: 12px 0 26px;
	}
	.intro-copy {
		max-width: 650px;
		font-size: 1rem;
		line-height: 1.9;
		color: var(--section-detail-color);
		margin: 0;
	}
	.intro-links {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 28px;
		margin-top: 30px;
	}
	.primary-link {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 28px;
		padding: 12px 17px;
		border: 1px solid var(--tag-border-color);
		border-radius: 6px;
		background: var(--section-skills-bubble-color);
		color: var(--font-color);
		font-size: 0.78rem;
		text-decoration: none;
	}
	.primary-link:hover {
		border-color: var(--section-skills-color);
	}
	.course-hero {
		margin: 0;
		border: 1px solid var(--border-color);
		border-radius: 10px;
		overflow: hidden;
		background: var(--media-color);
	}
	.course-hero img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 8;
		object-fit: cover;
	}
	.course-hero figcaption {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 9px;
		padding: 15px 20px;
		border-top: 1px solid var(--border-color);
		font-size: 0.7rem;
		color: var(--font-color);
	}
	.course-hero figcaption > span:last-child {
		margin-left: auto;
		color: var(--date-color);
	}
	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--section-skills-color);
	}
	.project-facts {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 24px;
		margin: 0;
		padding: 30px 0;
		border-bottom: 1px solid var(--border-color);
	}
	.project-facts dt {
		font-size: 0.65rem;
		color: var(--date-color);
		margin-bottom: 9px;
	}
	.project-facts dd {
		font-size: 0.95rem;
		margin: 0;
		font-weight: 500;
	}
	.project-facts dd span {
		color: var(--section-skills-color);
		padding: 0 6px;
	}
	.chapter-navigation {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 14px 22px;
		margin: 30px 0 48px;
	}
	.chapter-navigation a {
		display: inline-flex;
		gap: 9px;
		align-items: center;
		text-decoration: none;
		color: var(--section-detail-color);
		font-size: 0.72rem;
		padding: 5px 0;
	}
	.chapter-navigation a:hover {
		color: var(--section-skills-color);
	}
	.chapter-navigation span {
		font-size: 0.6rem;
		color: var(--section-skills-color);
	}
	.chapter {
		display: grid;
		grid-template-columns: 150px minmax(0, 1fr);
		gap: 36px;
		padding: 62px 0;
		border-top: 1px solid var(--border-color);
		scroll-margin-top: 28px;
	}
	.chapter-label {
		padding-top: 3px;
	}
	.chapter-label > span {
		font-size: 0.8rem;
		color: var(--section-skills-color);
		font-variant-numeric: tabular-nums;
	}
	.chapter-label p {
		color: var(--date-color);
		font-size: 0.72rem;
		line-height: 1.7;
		margin-top: 10px;
	}
	.chapter-body {
		min-width: 0;
	}
	h2 {
		font-size: clamp(1.6rem, 3vw, 2.15rem);
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.045em;
		margin: 0 0 24px;
		max-width: 680px;
		text-wrap: balance;
	}
	.chapter-body > p,
	.code-notes p {
		color: var(--section-detail-color);
		font-size: 0.92rem;
		line-height: 1.95;
		margin: 0 0 18px;
	}
	.chapter-body > .eyebrow {
		color: var(--section-skills-color);
		font-size: 0.65rem;
		margin-bottom: 14px;
	}
	strong {
		color: var(--font-color);
		font-weight: 500;
	}
	h3 {
		font-weight: 500;
		font-size: 0.95rem;
		line-height: 1.5;
		margin: 0 0 8px;
	}
	.setup-strip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 15px;
		border-block: 1px solid var(--border-color);
		padding: 24px 0;
		margin: 28px 0;
	}
	.setup-strip div {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.setup-strip span:not(.flow-arrow) {
		color: var(--section-skills-color);
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
	.setup-strip strong {
		font-size: 0.75rem;
	}
	.setup-strip small {
		font-size: 0.66rem;
		line-height: 1.7;
		color: var(--date-color);
	}
	.flow-arrow {
		color: var(--date-color);
		font-size: 0.8rem;
	}
	.concept-note {
		border-left: 2px solid var(--section-skills-color);
		padding: 3px 0 3px 22px;
		margin: 32px 0 26px;
	}
	.concept-note p {
		color: var(--section-detail-color);
		font-size: 0.85rem;
		line-height: 1.9;
		margin: 0;
	}
	.code-notes {
		margin-top: 28px;
		border: 1px solid var(--border-color);
		border-radius: 6px;
		background: var(--surface-color);
	}
	.code-notes summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		padding: 17px 20px;
		font-size: 0.77rem;
		line-height: 1.6;
		cursor: pointer;
		list-style: none;
	}
	.code-notes summary::-webkit-details-marker {
		display: none;
	}
	.code-notes summary > span {
		color: var(--section-skills-color);
	}
	.code-notes[open] summary > span {
		transform: rotate(45deg);
	}
	.code-notes p {
		padding: 0 20px;
		font-size: 0.8rem;
		margin-bottom: 20px;
	}
	code {
		color: var(--section-skills-color);
		font-size: 0.85em;
		overflow-wrap: anywhere;
	}
	.learning-loop {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 23px 20px;
		margin: 28px 0 10px;
		border-radius: 6px;
		background: var(--section-skills-bubble-color);
	}
	.learning-loop span {
		font-size: 0.69rem;
		color: var(--font-color);
	}
	.learning-loop b {
		font-weight: 400;
		color: var(--section-skills-color);
	}
	.reward-row {
		display: flex;
		gap: 21px;
		padding: 23px 0;
		border-bottom: 1px solid var(--border-color);
	}
	.reward-number {
		font-size: 0.62rem;
		color: var(--section-skills-color);
		padding-top: 5px;
	}
	.reward-row p,
	.variation-row p {
		margin: 0;
		color: var(--section-detail-color);
		font-size: 0.83rem;
		line-height: 1.85;
	}
	.reward-row h3 {
		margin-bottom: 5px;
	}
	.iteration-heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		margin: 36px 0 19px;
	}
	.version-label {
		display: block;
		font-size: 0.64rem;
		letter-spacing: 1.3px;
		text-transform: uppercase;
		color: var(--section-skills-color);
		margin-bottom: 9px;
	}
	.iteration-heading h3 {
		font-size: 1.3rem;
		line-height: 1.4;
		letter-spacing: -0.03em;
		margin: 0;
	}
	.run-time {
		font-size: 2.5rem;
		font-weight: 500;
		letter-spacing: -0.06em;
		margin: 0;
		white-space: nowrap;
	}
	.run-time span {
		display: block;
		font-size: 0.61rem;
		font-weight: 400;
		letter-spacing: 0;
		color: var(--date-color);
		text-align: right;
	}
	.second-iteration {
		margin-top: 54px;
		padding-top: 36px;
		border-top: 1px solid var(--border-color);
	}
	.takeaway {
		border-left: 2px solid var(--section-skills-color);
		padding: 2px 0 2px 22px;
		margin-top: 32px;
	}
	.takeaway > span {
		font-size: 0.62rem;
		letter-spacing: 1.4px;
		text-transform: uppercase;
		color: var(--section-skills-color);
	}
	.takeaway p {
		font-size: 1.08rem;
		line-height: 1.7;
		letter-spacing: -0.02em;
		margin: 8px 0 0;
	}
	.chapter-body > .small-note {
		font-size: 0.7rem;
		color: var(--date-color);
		line-height: 1.8;
		margin: 20px 0 0;
	}
	.variation-list {
		margin-top: 30px;
		border-top: 1px solid var(--border-color);
	}
	.variation-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 175px;
		gap: 40px;
		align-items: center;
		padding: 27px 0;
		border-bottom: 1px solid var(--border-color);
	}
	.range-change {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 7px;
	}
	.range-change span {
		font-size: 0.72rem;
		color: var(--date-color);
	}
	.range-change b {
		color: var(--section-skills-color);
		font-size: 0.8rem;
		font-weight: 400;
	}
	.range-change strong {
		font-size: 0.82rem;
	}
	.closing-thought {
		margin: 42px 0 0;
		border-top: 1px solid var(--border-color);
		padding-top: 30px;
	}
	.closing-thought p {
		font-size: clamp(1.2rem, 2.5vw, 1.6rem);
		letter-spacing: -0.03em;
		line-height: 1.6;
		max-width: 680px;
		margin: 15px 0 0;
		text-wrap: pretty;
	}
	.project-footer {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding-top: 28px;
		border-top: 1px solid var(--border-color);
	}
	@media (max-width: 800px) {
		.chapter {
			grid-template-columns: 100px minmax(0, 1fr);
			gap: 24px;
		}
		.setup-strip {
			flex-wrap: wrap;
			gap: 20px;
		}
		.setup-strip .flow-arrow {
			display: none;
		}
		.variation-row {
			grid-template-columns: minmax(0, 1fr) 140px;
			gap: 25px;
		}
	}
	@media (max-width: 600px) {
		.drone-showcase {
			padding: 30px 22px 40px;
		}
		.page-navigation,
		.navigation-right {
			gap: 16px;
		}
		.page-navigation .text-link {
			font-size: 0.7rem;
			gap: 8px;
		}
		.project-intro {
			margin-top: 60px;
		}
		.intro-copy {
			font-size: 0.9rem;
		}
		.intro-links {
			gap: 20px;
		}
		.course-hero img {
			aspect-ratio: 16 / 10;
			object-fit: contain;
		}
		.course-hero figcaption {
			padding: 12px 14px;
			font-size: 0.63rem;
		}
		.course-hero figcaption > span:last-child {
			margin-left: 15px;
			flex-basis: 100%;
		}
		.project-facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 24px 15px;
		}
		.project-facts dd {
			font-size: 0.85rem;
		}
		.chapter-navigation {
			justify-content: flex-start;
			margin-bottom: 32px;
			gap: 10px 20px;
		}
		.chapter {
			display: block;
			padding: 38px 0;
		}
		.chapter-label {
			display: flex;
			align-items: baseline;
			gap: 10px;
			margin-bottom: 24px;
		}
		.chapter-label p {
			margin: 0;
		}
		.chapter-body > p {
			font-size: 0.87rem;
		}
		.setup-strip {
			align-items: flex-start;
		}
		.setup-strip div {
			flex-basis: 100%;
			gap: 5px;
		}
		.learning-loop {
			display: grid;
			grid-template-columns: 1fr auto;
			gap: 13px;
		}
		.learning-loop > span:last-child {
			grid-column: 1 / -1;
		}
		.reward-row {
			gap: 14px;
		}
		.iteration-heading {
			gap: 15px;
		}
		.iteration-heading h3 {
			font-size: 1.12rem;
		}
		.run-time {
			font-size: 2.1rem;
		}
		.variation-row {
			grid-template-columns: 1fr;
			gap: 17px;
		}
		.range-change {
			flex-direction: row;
			align-items: center;
			gap: 14px;
		}
		.range-change b {
			transform: rotate(-90deg);
		}
		.project-footer .text-link {
			font-size: 0.7rem;
			gap: 8px;
		}
	}
</style>
