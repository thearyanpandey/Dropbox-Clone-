import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ShrinkingBoxScroll() {
  // useRef to target the scrollable container if needed,
  // but for window scroll, we don't need to pass a target to useScroll.
  // const targetRef = useRef(null); // Use if scrolling within a specific div

  const { scrollYProgress } = useScroll({
    // target: targetRef, // Uncomment if scrolling within targetRef element
    // offset: ["start start", "end start"] // Adjust trigger points if needed
    // "start start": when the top of the target hits the top of the viewport
    // "end start": when the bottom of the target hits the top of the viewport
    // Default behaviour usually works well for full page scroll.
  });

  // --- Animation Mapping ---
  // scrollYProgress goes from 0 (top) to 1 (bottom)
  // We want the box to be large (scale 1) at the top (scrollYProgress 0)
  // and small (e.g., scale 0.1) at the bottom (scrollYProgress 1)
  //
  // If you specifically want the effect *only* when scrolling *up*,
  // that requires tracking scroll direction, which is more complex.
  // This setup links size to scroll *position*.
  const scale = useTransform(
    scrollYProgress,
    // Input range [0, 1] (start scroll, end scroll)
    [0, 1],
    // Output range [1, 0.1] (start scale, end scale)
    [1, 0.1] // Box shrinks as you scroll down
    // To make it shrink when scrolling up *from the bottom*, you might invert:
    // [1, 0] // Input range reversed (doesn't make logical sense with scrollYProgress)
    // Or adjust the offset in useScroll and the mapping ranges.
    // Let's stick to the standard "shrinks as you scroll down" for simplicity first.
  );

  // --- Optional: Opacity fade out ---
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]); // Fade out near the end


  return (
    // 1. Scrollable Container (make sure it's taller than the viewport)
    // ref={targetRef} // Add ref here if using a target scroll container
    <div className="relative h-[300vh] bg-gradient-to-b from-slate-900 to-black">

      {/* 2. Fixed/Sticky Container for Visuals */}
      {/* This stays in view while the above container scrolls */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">

        {/* 3. Background Lines (Centred Crosshair) */}
        {/* Horizontal Line */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-gray-400 opacity-50"></div>
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-gray-400 opacity-50"></div>

        {/* 4. The Animated Box */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 origin-center rounded-lg border border-white bg-black bg-opacity-30 backdrop-blur-sm shadow-xl"
          style={{
            scale, // Apply the dynamic scale
            opacity, // Apply dynamic opacity
            // Framer motion handles the transform origin and translate automatically
            // when using scale with absolute + top/left + translate centering.
            // We need manual centering because scale originates from top-left by default.
            // Applying translate *after* scale in style prop might be tricky.
            // Let's use translateX/Y in style prop linked to scale if needed,
            // but Framer Motion often handles this if positioned correctly.
            // The combination of top-1/2, left-1/2 and origin-center in className
            // with motion's scale usually works. Let's test.
             x: "-50%", // Ensure centering is maintained during scale
             y: "-50%"
          }}
        >
           {/* Optional: Content inside the box */}
           <div className="flex h-full w-full items-center justify-center text-white text-xl">
                Scroll Down
           </div>
        </motion.div>

      </div>
      {/* Add more content below the sticky container if needed */}
       <div className="h-screen flex justify-center items-center text-white/50">
            <p>More content down here...</p>
       </div>
    </div>
  );
}

export default ShrinkingBoxScroll;