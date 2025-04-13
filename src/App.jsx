// src/App.jsx
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

function App() {
  // Lenis setup... (keep as is)
  useEffect(() => {
    const lenis = new Lenis(/* ... */);
    function raf(time) { /* ... */ }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  const { scrollYProgress } = useScroll();

  const breakPoint1 = 0.25;
  const breakPoint2 = 0.78; // Using this as the trigger for new boxes

  const startScale = 1;
  const finalScale = 0.15;

  const scaleAtBreak1 = startScale - breakPoint1 * (startScale - finalScale);
  const scaleAtBreak2 = startScale - breakPoint2 * (startScale - finalScale);

  // Scale transforms for center box/lines... (keep as is)
  const scaleWhite = useTransform(
    scrollYProgress,
    [0, breakPoint1, breakPoint2, 1],
    [startScale, scaleAtBreak1, scaleAtBreak1, finalScale]
  );
  const scaleRed = useTransform(
    scrollYProgress,
    [0, breakPoint1, breakPoint2, 1],
    [startScale, scaleAtBreak1, scaleAtBreak2, finalScale]
  );
  


  const animationStartPoint = breakPoint1; // Start animation at 78% scroll
  const animationEndPoint = 1; // End animation at 100% scroll
  const fadeInStartPoint = breakPoint1; // Start fade-in at 78%
  const fadeInEndPoint = 0.85; // Fully faded in by 85%

  // Box 1: Bottom-Left (Orange Example)
  const x1 = useTransform(scrollYProgress, [0, animationStartPoint, animationEndPoint], ['-64vw' ,'-60vw', '-17vw']);
  const y1 = useTransform(scrollYProgress, [animationStartPoint, animationEndPoint], ['50vh', '20.5vh']);
  //const opacity1 = useTransform(scrollYProgress, [fadeInStartPoint, fadeInEndPoint], [0, 1]);

  // Box 2: Top-Right (Cyan Example)
  const x2 = useTransform(scrollYProgress, [0, animationStartPoint, animationEndPoint], ['64vw','60vw', '17vw']);
  const y2 = useTransform(scrollYProgress, [animationStartPoint, animationEndPoint], ['-50vh', '-20.6vh']);
  //const opacity2 = useTransform(scrollYProgress, [fadeInStartPoint, fadeInEndPoint], [0, 1]);

  return (
    <div className="h-[300vh] bg-black text-white"> {/* Added text-white for visibility if needed */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* --- Center Box --- */}
        <motion.div
          style={{ scale: scaleWhite }}
          className="relative w-[40vw] h-[90vh] bg-white origin-center"
        >
  
          {/* Horizontal */}
          <motion.div style={{ scaleX: scaleWhite }} className="absolute top-[0%] right-full w-screen h-[1px] bg-white origin-right"/>
          <motion.div style={{ scaleX: scaleWhite }} className="absolute top-[0%] left-full w-screen h-[1px] bg-white origin-left"/>
          <motion.div style={{ scaleX: scaleWhite }} className="absolute bottom-[0%] right-full w-screen h-[1px] bg-white origin-right"/>
          <motion.div style={{ scaleX: scaleWhite }} className="absolute bottom-[0%] left-full w-screen h-[1px] bg-white origin-left"/>
          {/* Vertical */}
           <motion.div style={{ scaleY: scaleWhite }} className="absolute left-[0%] bottom-full h-screen w-[1px] bg-white origin-bottom"/>
           <motion.div style={{ scaleY: scaleWhite }} className="absolute left-[0%] top-full h-screen w-[1px] bg-white origin-top"/>
           <motion.div style={{ scaleY: scaleWhite }} className="absolute right-[0%] bottom-full h-screen w-[1px] bg-white origin-bottom"/>
           <motion.div style={{ scaleY: scaleWhite }} className="absolute right-[0%] top-full h-screen w-[1px] bg-white origin-top"/>


          {/* --- Red Lines (use scaleRed) --- */}
          {/* Horizontal */}
          <motion.div style={{ scaleX: scaleRed }} className="absolute top-1/3 right-full w-screen h-[1px] bg-red-500 origin-right"/>
          <motion.div style={{ scaleX: scaleRed }} className="absolute top-2/3 right-full w-screen h-[1px] bg-blue-500 origin-right"/>
          <motion.div style={{ scaleX: scaleRed }} className="absolute top-1/3 left-full w-screen h-[1px] bg-green-500 origin-left"/>
          <motion.div style={{ scaleX: scaleRed }} className="absolute top-2/3 left-full w-screen h-[1px] bg-red-500 origin-left"/>
          {/* Vertical */}
          <motion.div style={{ scaleY: scaleRed }} className="absolute left-1/3 bottom-full h-screen w-[1px] bg-red-500 origin-bottom"/>
          <motion.div style={{ scaleY: scaleRed }} className="absolute left-2/3 bottom-full h-screen w-[1px] bg-red-500 origin-bottom"/>
          <motion.div style={{ scaleY: scaleRed }} className="absolute left-1/3 top-full h-screen w-[1px] bg-red-500 origin-top"/>
          <motion.div style={{ scaleY: scaleRed }} className="absolute left-2/3 top-full h-screen w-[1px] bg-red-500 origin-top"/>
        </motion.div>

        {/* --- NEW BOX 1 (Bottom-Left / Orange) --- */}
        <motion.div
          style={{
            x: x1,
            y: y1,
          }}
          className="absolute w-[405px] h-[382px] bg-orange-500"
        >
          {/* lines */}
         
        </motion.div>

        {/* --- NEW BOX 2 (Top-Right / Cyan) --- */}
        <motion.div
          style={{
            x: x2, // Apply X transform
            y: y2, // Apply Y transform
          }}
          className="absolute w-[405px] h-[382px] bg-cyan-500"
        >
           {/* Optional: Add lines relative to this box, using opacity2 */}
          {/* Example line */}
         
        </motion.div>

      </div>
    </div>
  );
}

export default App;