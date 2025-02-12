<script>
  import { T } from '@threlte/core'
  import { interactivity, useGltf } from '@threlte/extras'
  import { useCursor } from '@threlte/extras'
	import { Spring } from 'svelte/motion';


  let { fallback, error, children, ref = $bindable(), ...props } = $props()

  const gltf = useGltf('models/cat.glb')
  const { onPointerEnter, onPointerLeave } = useCursor()

  // Load audio file
  const audio = new Audio('audio/meow.mp3') // Replace with your actual file path

  function playAudio() {
    if (audio.readyState >= 2) {  // Ensure the audio is loaded before setting currentTime
      audio.currentTime = 0.2  // Skip the first 200ms
      audio.play().catch(error => console.error("Audio play failed:", error))
    } else {
      audio.addEventListener("canplay", () => {
        audio.currentTime = 0.2
        audio.play().catch(error => console.error("Audio play failed:", error))
      }, { once: true }) // Ensure this listener runs only once
    }
  }
  interactivity()

  const scale = new Spring(5)


</script>

<T.Group
  bind:ref
  dispose={false}
  {...props}
>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
  
    <!-- Entire Model -->
    <T.Group 
    scale={scale.current}
    onpointerenter={() => {
      onPointerEnter()
      scale.target = 6
      playAudio()  // Play audio on hover
    }}
    onpointerleave={() => {
      onPointerLeave()
      scale.target = 5
    }}
      >
        
        <!-- Bowl + Dirt inside -->
        <T.Group
          position={[0, 0.53, 0]}
          scale={[0.85, 0.83, 0.85]}
        >
          <!-- Bowl -->
          <T.Mesh
          scale={[1, 1.07, 1]}
          
          geometry={gltf.nodes.polySurface240_lambert4_0.geometry}
          material={gltf.materials.lambert4}
          
        />
        
          <!-- Dirt inside bowl -->
          <T.Mesh
            geometry={gltf.nodes.polySurface241_lambert7_0.geometry}
            material={gltf.materials.lambert7}
            position={[0, -0.03, 0]}
            scale={1.12}
          />
        </T.Group>

      
      <!-- Left Eye -->
      <T.Group
        position={[-0.06, 0.01, -0.01]}
        rotation={[0.02, -0.02, 0]}
      >
        <T.Mesh
          geometry={gltf.nodes.pCylinder4_lambert3_0.geometry}
          material={gltf.materials.lambert3}
        />
        <T.Mesh
          geometry={gltf.nodes.pCylinder4_lambert8_0.geometry}
          material={gltf.materials.lambert8}
        />
      </T.Group>


      <!-- Right Eye -->
      <T.Group
        position={[-0.04, 0.04, -0.12]}
        rotation={[-0.03, 0.28, 0.01]}
      >
        <T.Mesh
          geometry={gltf.nodes.pCylinder5_lambert3_0.geometry}
          material={gltf.materials.lambert3}
        />
        <T.Mesh
          geometry={gltf.nodes.pCylinder5_lambert8_0.geometry}
          material={gltf.materials.lambert8}
        />
      </T.Group>


      <!-- Plants -->
      <T.Group position={[-2.89, 0, -0.03]}>
        <!-- Light Green -->
        <T.Mesh
          geometry={gltf.nodes.polySurface190_lambert5_0.geometry}
          material={gltf.materials.lambert5}
        />
        <!-- Dark Green -->
        <T.Mesh
          geometry={gltf.nodes.polySurface190_lambert6_0.geometry}
          material={gltf.materials.lambert6}
        />
      </T.Group>

      <!-- Cat body -->
      <T.Mesh
        geometry={gltf.nodes.polySurface130_lambert3_0.geometry}
        material={gltf.materials.lambert3}
      />

      <!-- White Plate underneith bowl -->
      <T.Mesh
        geometry={gltf.nodes.pDisc1_lambert10_0.geometry}
        material={gltf.materials.lambert10}
        position={[0, 0.12, 0]}
        scale={[0.8, 1, 0.8]}
      />

      <!-- Left Whiskers -->
      <T.Mesh
        geometry={gltf.nodes.polySurface244_lambert3_0.geometry}
        material={gltf.materials.lambert3}
      />

      <!-- Right Whiskers -->
      <T.Mesh
        geometry={gltf.nodes.polySurface245_lambert3_0.geometry}
        material={gltf.materials.lambert3}
        position={[0.26, 0.21, 0.3]}
        rotation={[0.05, -0.37, 0.27]}
      />
      
      <!-- Lower yellow flower -->
      <T.Mesh
        geometry={gltf.nodes.pCone1_lambert9_0.geometry}
        material={gltf.materials.lambert9}
        position={[-0.03, 0.61, 0.39]}
        rotation={[-2.13, 0, 0]}
        scale={[0.04, 0.03, 0.04]}
      />

      <!-- Top yellow flower -->
      <T.Mesh
        geometry={gltf.nodes.pCone2_lambert9_0.geometry}
        material={gltf.materials.lambert9}
        position={[-0.06, 1.73, -0.06]}
        rotation={[-1.31, 0, 0]}
        scale={[0.05, 0.04, 0.05]}
      />

      <!-- Middle yellow flower -->
      <T.Mesh
        geometry={gltf.nodes.pCone3_lambert9_0.geometry}
        material={gltf.materials.lambert9}
        position={[-0.25, 1.29, 0.07]}
        rotation={[-1.31, 0, 0.01]}
        scale={[0.04, 0.03, 0.04]}
      />

    </T.Group>
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>
