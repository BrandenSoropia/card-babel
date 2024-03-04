import { memo } from "react";

const generateUniqueID = () => {
  return "icon-x-" + new Date().getTime();
};

const XIcon = ({
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
      <title id={id}>{title}</title>
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M19 5 5 19M5 5l14 14" />
      </g>
    </svg>
  );
};

export default memo(XIcon);
