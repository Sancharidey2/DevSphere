import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearEncoding } from "@react-three/drei/helpers/deprecated";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function Ground(){
    const [roughness, normal] = useLoader(TextureLoader,
        [
            process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
            process.env.PUBLIC_URL + "textures/terrain-normal.jpg"
        ]
    );

    useEffect(() => {
        [normal,roughness].forEach((t)=>{
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(30,30);
        });

        normal.encoding = LinearEncoding;
    },[normal,roughness]);

    useFrame((state,delta)=>{
        let t= -state.clock.getElapsedTime() * 0.828;
        roughness.offset.set(0,t);
        normal.offset.set(0,t);
    })

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[50,30]}/>
            <MeshReflectorMaterial
                envMapIntensity={0}  // Added some environment map intensity
                normalMap={normal}
                // normalScale={[.1000000, .1000000]}  // Significantly increased normal map effect
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.15]}  // Significantly lightened the base color
                roughness={0.2}  // Increased roughness to show more texture
                blur={[500, 100]}  // Reduced blur for sharper reflections
                mixBlur={15}  // Reduced blur mixing
                mixStrength={12}  // Significantly reduced reflection strength
                mixContrast={2}  // Increased contrast
                resolution={1920}
                mirror={1}  // Added some mirror effect
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.15}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    ) 
}