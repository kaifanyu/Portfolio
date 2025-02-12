<script lang="ts">
    import { T } from '@threlte/core'
    import { Align, OrbitControls } from '@threlte/extras'
    import { BufferGeometry, Vector3 } from 'three'

    const size = 100 // Increase the spread size
    const count = 1000 // Adjust number of points

    const vectorPositions: Vector3[] = []

    for (let i = 0; i < count; i++) {
      // Random position in a cube range (-size, size)
      const x = (Math.random() - 0.5) * size * 2
      const y = (Math.random() - 0.5) * size * 2
      const z = (Math.random() - 0.5) * size * 2

      vectorPositions.push(new Vector3(x, y, z))
    }

    const pointsBufferGeometry = new BufferGeometry().setFromPoints(vectorPositions)
  </script>
  
  <T.PerspectiveCamera
    makeDefault
    position={[50, 50, 50]}
    fov={15}
  >
    <OrbitControls 
    
    allowPan={false}
    enableDamping
    maxDistance={200}
    minDistance={10}
    />
  </T.PerspectiveCamera>
  
  <T.DirectionalLight
    position.y={10}
    position.z={10}
  />
  
  <Align>
    <T.Points>
      <T is={pointsBufferGeometry} />
      <T.PointsMaterial size={2} />
    </T.Points>
  </Align>
  