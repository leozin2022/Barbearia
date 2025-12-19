
import React, { useState } from 'react';

interface Props {
  antes: string;
  depois: string;
}

export const BeforeAfterSlider: React.FC<Props> = ({ antes, depois }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="relative w-full aspect-square md:aspect-video overflow-hidden rounded-[2.5rem] border border-white/10 group shadow-2xl">
      {/* Depois Image */}
      <img
        src={depois}
        alt="Resultado Depois"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Antes Image (Clipping) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={antes}
          alt="Resultado Antes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Input Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />

      {/* Visual Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gold z-10 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,1)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold border-4 border-dark flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <svg className="w-5 h-5 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7l-4 4m0 0l4 4m-4-4h16m0 0l-4-4m4 4l-4 4" />
          </svg>
        </div>
      </div>

      {/* Labels Visual Indicators */}
      <div className="absolute bottom-6 left-6 z-10 bg-dark/70 backdrop-blur-md px-4 py-2 text-[10px] font-black tracking-widest rounded-lg border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity uppercase">
        ANTES
      </div>
      <div className="absolute bottom-6 right-6 z-10 bg-gold/80 backdrop-blur-md px-4 py-2 text-[10px] text-dark font-black tracking-widest rounded-lg border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity uppercase">
        DEPOIS
      </div>
    </div>
  );
};
