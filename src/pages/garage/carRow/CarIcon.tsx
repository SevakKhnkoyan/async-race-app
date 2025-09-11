import * as React from 'react';

type CarIconProps = { color: string };

export function CarIcon({ color }: CarIconProps) {
  const id = React.useId().replace(/:/g, '');
  const filtId = `neon-${id}`;

  const Shapes = () => (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      {/* outer body */}
      <rect x="7" y="8" width="50" height="112" rx="10" />
      {/* cabin */}
      <rect x="14" y="44" width="36" height="40" rx="6" />
      {/* wheels */}
      <rect x="1.5" y="18" width="8" height="18" rx="2" />
      <rect x="54.5" y="18" width="8" height="18" rx="2" />
      <rect x="1.5" y="92" width="8" height="18" rx="2" />
      <rect x="54.5" y="92" width="8" height="18" rx="2" />
    </g>
  );

  return (
    <svg viewBox="0 0 12.8 6.4" width="64" height="32" role="img">
      <defs>
        <filter id={filtId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor={color} floodOpacity="1" />
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={color} floodOpacity="0.9" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={color} floodOpacity="0.6" />
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor={color} floodOpacity="0.35" />
        </filter>
      </defs>

      <g transform="translate(12.8 0) rotate(90) scale(0.1)">
        {/* colored glow layer */}
        <g stroke={color} strokeWidth={4} filter={`url(#${filtId})`}>
          <Shapes />
        </g>
        {/* white neon tube core */}
        <g stroke="#fff" strokeWidth={1}>
          <Shapes />
        </g>
      </g>
    </svg>
  );
}
