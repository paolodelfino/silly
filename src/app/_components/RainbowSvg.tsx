import { FC, SVGProps } from "react";

/**
 * @description You should fill white the path element
 */
export const RainbowSvg: FC<SVGProps<SVGSVGElement>> = ({
  children,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient id="grd" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2400"></stop>
          <stop offset="11%" stopColor="#e81d1d"></stop>
          <stop offset="22%" stopColor="#e8b71d"></stop>
          <stop offset="33%" stopColor="#e3e81d"></stop>
          <stop offset="44%" stopColor="#1de840"></stop>
          <stop offset="55%" stopColor="#2b1de8"></stop>
          <stop offset="66%" stopColor="#ff2400"></stop>
          <stop offset="77%" stopColor="#dd00f3"></stop>
          <stop offset="88%" stopColor="#e8b71d"></stop>
          <stop offset="100%" stopColor="#dd00f3"></stop>
        </linearGradient>
        <mask id="msk">{children}</mask>
      </defs>
      <g
        style={{
          mask: "url(#msk)",
        }}
      >
        <rect x="-200" width="224" height="224" fill="url(#grd)">
          <animateTransform
            attributeType="XML"
            attributeName="transform"
            type="translate"
            values="0,0; 200,0; 0,0"
            dur="10s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
};
