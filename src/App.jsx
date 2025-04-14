// src/App.jsx
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

function App() {
  // Lenis setup... (keep as is)
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();

  const breakPoint1 = 0.25;
  const breakPoint2 = 0.60;

  // --- Center Box Scaling (keep as is) ---
  const startScale = 1;
  const finalScale = 0.15;
  const scaleAtBreak1 = startScale - breakPoint1 * (startScale - finalScale);
  const scaleAtBreak2 = startScale - breakPoint2 * (startScale - finalScale);
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

  // --- Side Box Animation Timing (Reused for all side boxes) ---
  const animationStartPoint = breakPoint1; // Start animation at 25% scroll
  const animationEndPoint = 1;       // End animation at 100% scroll

  // --- BOX 1 & 2 (Original Orange & Cyan) Movement Transforms (keep as is) ---
  const x1 = useTransform( scrollYProgress, [0, animationStartPoint, animationEndPoint], ["-68vw", "-60vw", "-17vw"] );
  const y1 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["18vh", "20.5vh"] );
  const x2 = useTransform( scrollYProgress, [0, animationStartPoint, animationEndPoint], ["68vw", "60vw", "17vw"] );
  const y2 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["-18vh", "-20.6vh"] );

  // --- BOX 1 & 2 Scaling Transforms ---
  const initialSideBoxWidth1 = 468;
  const initialSideBoxHeight1 = 445;
  const finalSideBoxWidth1 = 405;
  const finalSideBoxHeight1 = 382;
  const finalScaleX1 = finalSideBoxWidth1 / initialSideBoxWidth1;
  const finalScaleY1 = finalSideBoxHeight1 / initialSideBoxHeight1;

  const sideBoxScaleX1 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleX1] );
  const sideBoxScaleY1 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleY1] );

  // --- BOX 3 & 4 (Original Purple & Green) Movement Transforms (keep as is) --
  const x3 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["-26.5vw", "-13.5vw"] );
  const y3 = useTransform(scrollYProgress,[animationStartPoint, animationEndPoint],["-125vh", "-28vh"]);
  const x4 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["21.5vw", "13.5vw"] );
  const y4 = useTransform(scrollYProgress,[animationStartPoint, animationEndPoint],["127vh", "28vh"]);

  // --- BOX 3 & 4 Scaling Transforms ---
  const initialSideBoxWidth2 = 760;
  const initialSideBoxHeight2 = 400;
  const finalSideBoxWidth2 = 505;
  const finalSideBoxHeight2 = 282;
  const finalScaleX2 = (finalSideBoxWidth2 / initialSideBoxWidth2);
  const finalScaleY2 = (finalSideBoxHeight2 / initialSideBoxHeight2);

  const sideBoxScaleX2 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleX2] );
  const sideBoxScaleY2 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleY2] );

  // --- NEW: BOX 5 & 6 (Top-Left & Bottom-Left) Movement Transforms --
  const x6 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["-100vw","-40vw"] );
  const y6 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [ "80vh", "27.5vh"] );

  const x7 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["100vw", "40vw"] );
  const y7 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["-80vh", "-27.5vh"] );


  // --- NEW: BOX 7 & 6 Scaling Transforms ---
  const initialSideBoxWidth3 = 250;  
  const initialSideBoxHeight3 = 350;
  const finalSideBoxWidth3 = 282;   
  const finalSideBoxHeight3 = 332;
  const finalScaleX3 = finalSideBoxWidth3 / initialSideBoxWidth3;
  const finalScaleY3 = finalSideBoxHeight3 / initialSideBoxHeight3;
  const sideBoxScaleX3 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleX3] );
  const sideBoxScaleY3 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleY3] );

  // --- NEW: BOX 7 & 8 (Top-Right & Bottom-Right) Movement Transforms --
  const x5 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["-100vw", "-40vw"] );
  const y5 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["-80vh", "-21vh"] );


  
  const x8 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["100vw", "40vw"] );
  const y8 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], ["80vh",  "21vh"] );

  // --- NEW: BOX 5 & 8 Scaling Transforms ---
  const initialSideBoxWidth4 = 300;  
  const initialSideBoxHeight4 = 200;
  const finalSideBoxWidth4 = 335;    
  const finalSideBoxHeight4 = 251;

  const finalScaleX4 = finalSideBoxWidth4 / initialSideBoxWidth4;
  const finalScaleY4 = finalSideBoxHeight4 / initialSideBoxHeight4;

  const sideBoxScaleX4 = useTransform( scrollYProgress , [animationStartPoint, animationEndPoint], [1, finalScaleX4] );
  const sideBoxScaleY4 = useTransform( scrollYProgress, [animationStartPoint, animationEndPoint], [1, finalScaleY4] );


  return (
    <div className="h-[300vh] bg-black text-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* --- Center Box --- (keep as is) */}
        <motion.div
          style={{ scale: scaleWhite }}
          className="relative z-10 w-[40vw] h-[90vh] bg-white origin-center"
        >
          {/* Lines... (keep as is) */}
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
            {/* Red Lines */}
            <motion.div style={{ scaleY: scaleRed }} className="absolute left-1/3 bottom-full h-screen w-[1px] bg-red-500 origin-bottom"/>
            <motion.div style={{ scaleY: scaleRed }} className="absolute left-2/3 bottom-full h-screen w-[1px] bg-red-500 origin-bottom"/>
            <motion.div style={{ scaleY: scaleRed }} className="absolute left-1/3 top-full h-screen w-[1px] bg-red-500 origin-top"/>
            <motion.div style={{ scaleY: scaleRed }} className="absolute left-2/3 top-full h-screen w-[1px] bg-red-500 origin-top"/>
        </motion.div>

        {/* --- BOX 1 (Bottom-Left / Original Orange) --- */}
        <motion.div
          style={{
            x: x1, y: y1,
            scaleX: sideBoxScaleX1, scaleY: sideBoxScaleY1,
            transformOrigin: "center center",
          }}
          className="absolute w-[468px] h-[445px] bg-orange-500 z-20"
        >
          <motion.div style={{ scaleX: sideBoxScaleX1 }} className="absolute top-0 left-full w-[400vw] h-[1px] bg-green-500 origin-left"/>
        </motion.div>

        {/* --- BOX 2 (Top-Right / Original Cyan) --- */}
        <motion.div
          style={{
            x: x2, y: y2,
            scaleX: sideBoxScaleX1, scaleY: sideBoxScaleY1,
            transformOrigin: "center center",
          }}
          className="absolute w-[468px] h-[445px] bg-cyan-500 z-20"
        >
          <motion.div style={{ scaleX: sideBoxScaleX1 }} className=" absolute bottom-0 right-full w-[600vw] h-[1px] bg-green-500 origin-right"/>
        </motion.div>

        {/* --- BOX 3 (Top / Original Purple) --- */}
        <motion.div
          style={{
            x: x3, y: y3,
            scaleX: sideBoxScaleX2, scaleY: sideBoxScaleY2,
            transformOrigin: "center center",
          }}
          className="absolute w-[768px] h-[400px] bg-purple-500 z-20"
        >
        </motion.div>

        {/* --- BOX 4 (Bottom / Original Green) --- */}
        <motion.div
          style={{
            x: x4, y: y4,
            scaleX: sideBoxScaleX2, scaleY: sideBoxScaleY2,
            transformOrigin: "center center",
          }}
          className="absolute w-[768px] h-[400px] bg-green-500 z-20"
        >
        </motion.div>

        {/* --- NEW BOX 5 (Top-Left / Gray) --- */}
        <motion.div
          style={{
            x: x5, y: y5,
            scaleX: sideBoxScaleX4, scaleY: sideBoxScaleY4,
            transformOrigin: "center center",
          }}
          className="absolute w-[250px] h-[300px] bg-gray-600 z-20"
        >
        </motion.div>

        {/* --- NEW BOX 6 (Bottom-Left / Lime Green) --- */}
        <motion.div
          style={{
            x: x6, y: y6,
            scaleX: sideBoxScaleX3, scaleY: sideBoxScaleY3,
            transformOrigin: "center center",
          }}
          className="absolute w-[250px] h-[300px] bg-lime-500 z-20"
        >
        </motion.div>

        {/* --- NEW BOX 7 (Top-Right / Dark Red) --- */}
        <motion.div
          style={{
            x: x7, y: y7,
            scaleX: sideBoxScaleX3, scaleY: sideBoxScaleY3,
            transformOrigin: "center center",
          }}
          className="absolute w-[250px] h-[300px] bg-red-600 z-20"
        >
        </motion.div>

        {/* --- NEW BOX 8 (Bottom-Right / Light Violet) --- */}
        <motion.div
          style={{
            x: x8, y: y8,
            scaleX: sideBoxScaleX4, scaleY: sideBoxScaleY4,
            transformOrigin: "center center",
          }}
          className="absolute w-[250px] h-[300px] bg-violet-400 z-20"
        >
        </motion.div>

      </div>
    </div>
  );
}

export default App;