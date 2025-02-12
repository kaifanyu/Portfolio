<script>
    import { T } from '@threlte/core';
    import { OrbitControls, Environment, Sky } from '@threlte/extras';
    import Cat from './models/cat.svelte';
    import Stars from './Stars.svelte';
</script>
 
 <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={80} near={0.1} far={1000}>
 <OrbitControls
       allowPan={false}
       enableDamping
       maxDistance={200}
       minDistance={10}
    />
 </T.PerspectiveCamera>

 <Cat position={[0, -10, 0]}/>
 <Stars />
