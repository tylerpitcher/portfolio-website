import { useState, useEffect } from "react";
import Home2D from "./components/homepage/2DHome";
import Home3D from "./components/homepage/3DHome";

function App() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (mobile) return (
    <Home2D/>
  );

  return (
    <Home3D/>
  );
}

export default App;
