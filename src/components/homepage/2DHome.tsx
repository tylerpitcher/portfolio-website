import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Resume from "../resume/Resume";
import InfoScreen from "./InfoScreen";

function Home2D() {
  const [showInfo, setShowInfo] = useState(true);

  const handleOnClick = () => setShowInfo(false);

  return (
    <main className="w-screen h-screen">
      <AnimatePresence>
        {showInfo && <InfoScreen onClick={handleOnClick}/>}
      </AnimatePresence>
      {!showInfo && <Resume/>} 
    </main>
  );
}

export default Home2D;
