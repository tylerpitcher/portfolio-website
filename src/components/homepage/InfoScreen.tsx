import { motion } from "framer-motion";

function InfoScreen({ onClick }: any) {
  return (
    <motion.div
      className="absolute top-0 z-9 w-screen h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>The full experience requires a larger screen.</h1>
      <button className="pulse" onClick={onClick}>
        <svg fill="#ffffff" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.787 511.787" stroke="#ffffff">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> 
            <g> 
              <g> 
                <path d="M508.667,125.707c-4.16-4.16-10.88-4.16-15.04,0L255.76,363.573L18,125.707c-4.267-4.053-10.987-3.947-15.04,0.213 c-3.947,4.16-3.947,10.667,0,14.827L248.293,386.08c4.16,4.16,10.88,4.16,15.04,0l245.333-245.333 C512.827,136.693,512.827,129.867,508.667,125.707z"></path> 
              </g> 
            </g> 
          </g>
          </svg>
      </button>
    </motion.div>
  );
}

export default InfoScreen;
