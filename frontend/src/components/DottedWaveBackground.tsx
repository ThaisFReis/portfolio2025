import React from 'react';

export const DottedWaveBackground: React.FC = () => {
  return (
    <div className="dotted-wave-background">
      {/* Generate multiple wave layers */}
      {[...Array(3)].map((_, layerIndex) => (
        <div key={layerIndex} className={`wave-layer wave-layer-${layerIndex + 1}`}>
          {/* Generate dots for each wave */}
          {[...Array(200)].map((_, dotIndex) => (
            <div
              key={dotIndex}
              className="wave-dot"
              style={{
                '--dot-index': dotIndex,
                '--layer-index': layerIndex,
                '--random-x': Math.random(),
                '--random-y': Math.random(),
                '--random-delay': Math.random() * 3,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
};