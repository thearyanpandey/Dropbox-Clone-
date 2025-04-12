// src/App.jsx
import { useEffect } from 'react'; // Removed useState as we don't need windowHeight state for transforms
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

function App() {
  // Set up Lenis for smooth scrolling (keep this part)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // No need to track windowHeight state for the animation logic itself anymore
    // Lenis might use viewport dimensions internally, but we don't need the state here.

    return () => {
      // Cleanup Lenis instance on component unmount
      lenis.destroy();
    };
  }, []);

  // Use Framer Motion's scroll progress hook
  // This targets the scroll progress of the entire page by default
  const { scrollYProgress } = useScroll();

  // --- Define Animation Parameters ---
  const breakPoint1 = 0.35; // 35% scroll depth
  const breakPoint2 = 0.78; // 78% scroll depth

  const startScale = 1;
  const finalScale = 0.2; // Adjust if you want a different end scale

  // Calculate the scale values at the breakpoints assuming a linear scale overall
  const scaleAtBreak1 = startScale - breakPoint1 * (startScale - finalScale);
  const scaleAtBreak2 = startScale - breakPoint2 * (startScale - finalScale);

  // --- Create Transformations ---

  // Scale for the white box and white lines
  const scaleWhite = useTransform(
    scrollYProgress,
    // Input scroll progress points: start, break1, break2, end
    [0, breakPoint1, breakPoint2, 1],
    // Output scale values: scale down, STAY FIXED, scale down again
    [startScale, scaleAtBreak1, scaleAtBreak1, finalScale]
  );

  // Scale for the red lines
  const scaleRed = useTransform(
    scrollYProgress,
    // Input scroll progress points: start, break1, break2, end
    [0, breakPoint1, breakPoint2, 1],
    // Output scale values: scale down continuously
    [startScale, scaleAtBreak1, scaleAtBreak2, finalScale]
  );


  return (
    // Ensure the outer div allows for scrolling beyond the viewport height
    <div className="h-[300vh] bg-black"> {/* Total scrollable height */}
      {/* Sticky container holds the animated elements */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Center box that uses scaleWhite */}
        <motion.div
          style={{ scale: scaleWhite }} // Apply scaleWhite here
          className="relative w-[40vw] h-[90vh] bg-white origin-center"
        >
          {/* --- White Lines (use scaleWhite) --- */}
          {/* Horizontal */}
          <motion.div
            style={{ scaleX: scaleWhite }}
            className="absolute top-[0%] right-full w-screen h-[1px] bg-white origin-right"
          />
          <motion.div
            style={{ scaleX: scaleWhite }}
            className="absolute top-[0%] left-full w-screen h-[1px] bg-white origin-left"
          />
          <motion.div
            style={{ scaleX: scaleWhite }}
            className="absolute bottom-[0%] right-full w-screen h-[1px] bg-white origin-right"
          />
          <motion.div
            style={{ scaleX: scaleWhite }}
            className="absolute bottom-[0%] left-full w-screen h-[1px] bg-white origin-left"
          />
          {/* Vertical */}
           <motion.div
            style={{ scaleY: scaleWhite }}
            className="absolute left-[0%] bottom-full h-screen w-[1px] bg-white origin-bottom"
          />
          <motion.div
            style={{ scaleY: scaleWhite }}
            className="absolute left-[0%] top-full h-screen w-[1px] bg-white origin-top"
          />
          <motion.div
            style={{ scaleY: scaleWhite }}
            className="absolute right-[0%] bottom-full h-screen w-[1px] bg-white origin-bottom"
          />
          <motion.div
            style={{ scaleY: scaleWhite }}
            className="absolute right-[0%] top-full h-screen w-[1px] bg-white origin-top"
          />


          {/* --- Red Lines (use scaleRed) --- */}
          {/* Horizontal */}
          <motion.div
            style={{ scaleX: scaleRed }}
            className="absolute top-1/3 right-full w-screen h-[1px] bg-red-500 origin-right"
          />
          <motion.div
            style={{ scaleX: scaleRed }}
            className="absolute top-2/3 right-full w-screen h-[1px] bg-red-500 origin-right"
          />
          <motion.div
            style={{ scaleX: scaleRed }}
            className="absolute top-1/3 left-full w-screen h-[1px] bg-red-500 origin-left"
          />
          <motion.div
            style={{ scaleX: scaleRed }}
            className="absolute top-2/3 left-full w-screen h-[1px] bg-red-500 origin-left"
          />
          {/* Vertical */}
          <motion.div
            style={{ scaleY: scaleRed }}
            className="absolute left-1/3 bottom-full h-screen w-[1px] bg-red-500 origin-bottom"
          />
          <motion.div
            style={{ scaleY: scaleRed }}
            className="absolute left-2/3 bottom-full h-screen w-[1px] bg-red-500 origin-bottom"
          />
          <motion.div
            style={{ scaleY: scaleRed }}
            className="absolute left-1/3 top-full h-screen w-[1px] bg-red-500 origin-top"
          />
          <motion.div
            style={{ scaleY: scaleRed }}
            className="absolute left-2/3 top-full h-screen w-[1px] bg-red-500 origin-top"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;