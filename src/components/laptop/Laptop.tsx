import { useGLTF, Center, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { SnackbarProvider } from "../resume/Snackbar";
import Resume from "../resume/Resume";

type GLTF = {
  nodes: {
    [name: string]: {
      geometry?: THREE.BufferGeometry; 
    };
  };
  materials: {
    [name: string]: THREE.Material;
  };
};

function Laptop() {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const clock = useRef(new THREE.Clock());
  const screenRef: any = useRef();
  const htmlRef: any = useRef();

  const { nodes, materials } = useGLTF("/laptop.glb") as GLTF;

  useEffect(() => {
    if (!open && hovered) document.body.style.cursor = "pointer";
    if (open || !hovered) document.body.style.cursor = "auto";
  }, [hovered, open]);

  useFrame(() => {
    if (open && htmlRef?.current?.style?.opacity == 1) return;

    if (!open) screenRef.current.rotation.x = -Math.PI/2;

    const delta = clock.current.getDelta()
    if (open && screenRef.current.rotation.x <= Math.PI / 16) {
      screenRef.current.rotation.x += 2 * delta
    }

    if (screenRef.current.rotation.x >= Math.PI / 16) {
      const currentOpacity = parseFloat(htmlRef.current.style.opacity) || 0;
      const newOpacity = currentOpacity + (1 * delta);
      htmlRef.current.style.opacity = newOpacity.toFixed(2);
    }
  });

  return (
    <group rotation-y={Math.PI/16} position={[0, 1.5, 0]}>
      <Center>
        <group 
          scale={40} 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)} 
          onClick={() => setOpen(true)}
        >
          <group position={[0, -0.0031, 0.1025]} rotation={[0, 0, 0]}>
            {!open && <Html
              className="text-lg font-bold"
              rotation-y={-Math.PI} 
              position={[0, 0.1, 0.00431573]} 
              scale={0.031} 
              style={{ backfaceVisibility: "hidden" }}
              transform 
            >
              Click on the computer to begin!
            </Html>}
            <mesh ref={screenRef} material={materials?.ComputerScreen} geometry={nodes["Screen_ComputerScreen_0"]?.geometry}>
              <Html 
                ref={htmlRef}
                className="content overflow-hidden" 
                rotation-y={-Math.PI} 
                position={[0, 0.1, 0.00431573]} 
                scale={0.031} 
                transform 
                occlude
              >
                <SnackbarProvider>
                <Resume/>
                </SnackbarProvider>
              </Html>
            </mesh>
          </group>
          <group rotation={[Math.PI / 2, Math.PI, 0]}>
            <mesh material={materials?.ComputerFrame} geometry={nodes["Frame_ComputerFrame_0"]?.geometry}/>
          </group>
        </group>
      </Center>
    </group>
  );
}

export default Laptop;
