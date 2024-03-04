import { memo } from "react";

const generateUniqueID = () => {
  return "icon-magnifying-glass-" + new Date().getTime();
};

const SvgMagnifyingGlassicon = ({
  stroke,
  width,
  height,
  title,
}: {
  stroke: string;
  width: number;
  height: number;
  title: string;
}) => {
  const id = generateUniqueID();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      stroke={stroke}
      role="img"
      aria-labelledby={id}
    >
      <title>{title}</title>
      <g strokeLinejoin="round" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M17.5 17.5 22 22" />
        <path d="M20 11a9 9 0 1 0-18 0 9 9 0 0 0 18 0z" />
      </g>
    </svg>
  );
};
export default memo(SvgMagnifyingGlassicon);
