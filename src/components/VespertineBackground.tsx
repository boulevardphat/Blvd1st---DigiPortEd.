import React, { useState } from 'react';
import { motion } from 'motion/react';

interface VespertineBackgroundProps {
  shiftLeft?: boolean;
}

export const VespertineBackground = ({ shiftLeft = false }: VespertineBackgroundProps) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [sjLoaded, setSjLoaded] = useState(false);
  
  const isLoaded = bgLoaded && sjLoaded;

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      initial={{ x: 0 }}
      animate={{ x: shiftLeft ? '-25%' : '0%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Layer */}
      <img
        src="https://i.ibb.co/JFvk9wzr/vespertine-bg.png"
        alt="Background layer"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] pointer-events-none"
        onLoad={() => setBgLoaded(true)}
      />
      
      {/* Middle empty layer (for future use) */}
      <div className="absolute inset-0 pointer-events-none z-0" id="middle-layer">
        
      </div>

      {/* Subject Layer */}
      <img
        src="https://i.ibb.co/jPHPJSG7/vespertine-sj.png"
        alt="Subject layer"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] pointer-events-none"
        onLoad={() => setSjLoaded(true)}
      />

      {/* Fallback / Original Image (On top, fades out when others load) */}
      <motion.img 
        src="https://i.ibb.co/vy4ykmw/vespertine.png" 
        alt="Fallback background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] pointer-events-none z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0 }}
      />
    </motion.div>
  );
};
