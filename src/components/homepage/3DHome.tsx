import { useProgress, Html, ContactShadows, OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Laptop from "../laptop/Laptop";

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <span>{progress.toFixed(0)}%</span>
    </Html>
  );
}

function Home3D() {
  return (
    <main className="w-screen h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
        <pointLight position={[10, 10, 10]} intensity={2}/>
        <Suspense fallback={<Loader/>}>
          <Laptop/>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5}/>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} maxPolarAngle={Math.PI / 2.2}/>
      </Canvas>
    </main>
  );
}

export default Home3D;
