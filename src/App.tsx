/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Hand } from "lucide-react";

export default function App() {
  const [interacted, setInteracted] = useState(false);
  
  // Mouse parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove(event: React.MouseEvent) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    x.set((clientX / innerWidth - 0.5) * 40); // Move range -20 to 20
    y.set((clientY / innerHeight - 0.5) * 40);
  }

  const rotateX = useTransform(mouseY, [-20, 20], [5, -5]);
  const rotateY = useTransform(mouseX, [-20, 20], [-5, 5]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background decorative circles */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-10"
      >
        <div className="glass-panel p-12 md:p-16 rounded-3xl shadow-2xl text-center max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight mb-2 text-white drop-shadow-lg">
              Warm Welcome
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-8 opacity-90">
              <span className="h-px w-12 bg-white/60"></span>
              <p className="text-white/90 uppercase tracking-[0.2em] text-sm font-semibold">
                by Harshith
              </p>
              <span className="h-px w-12 bg-white/60"></span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4 mb-10"
          >
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              I'm absolutely delighted you've stopped by.
            </p>
            <p className="text-lg md:text-xl text-white/80 font-light">
              This is a space designed for connection and creativity.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInteracted(!interacted)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {interacted ? (
                <>
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span>Glad you're here!</span>
                </>
              ) : (
                <>
                  <Hand className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Say Hello</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {interacted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-white/80 text-sm italic"
            >
              Thanks for saying hi! I hope you have a wonderful day.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
