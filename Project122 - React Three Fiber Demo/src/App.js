import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { useProgress, Html } from "@react-three/drei";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./CircularRings";
import { Boxes } from "./Box";
import { FloatingGrid } from "./Grid";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// Loading screen using Html from drei
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
      }}>
        <div style={{
          width: '300px',
          height: '4px',
          background: '#121212',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00ff87 0%, #60efff 100%)',
            transition: 'width 0.5s ease',
            borderRadius: '10px',
          }} />
        </div>
        <div style={{
          color: 'white',
          fontSize: '1.2em',
          fontWeight: '500',
          marginTop: '1em',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}>
          {progress.toFixed(0)}% loaded
        </div>
      </div>
    </Html>
  );
};

const CarShow = () => {
  return (
    <>
      <OrbitControls 
        target={[0, 0.35, 0]} 
        maxPolarAngle={1.5}
        enablePan={false}
        enableZoom={false}
      />
      <PerspectiveCamera makeDefault fov={60} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Suspense fallback={null}>
        <Rings />
      </Suspense>

      <Suspense fallback={null}>
        <Boxes />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingGrid />
      </Suspense>

      <spotLight
        color={[1, 0.45, 0.7]}
        intensity={4.2}
        angle={0.7}
        penumbra={0.7}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.001}
      />

      <spotLight
        color={[0.14, 0.7, 1]}
        intensity={3.2}
        angle={0.7}
        penumbra={0.7}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.001}
      />

      <Ground />
      
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
};

const App = () => {
  return (
    <Canvas 
      shadows 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed',
        top: 0,
        left: 0,
        touchAction: 'none'
      }}
      camera={{ position: [3, 2, 5], fov: 60 }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.02} />
        <CarShow />
      </Suspense>
    </Canvas>
  );
};

export default App;