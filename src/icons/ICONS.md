# Icons

Uses [command-line SVGR to optimize and generate React components from SVG files](https://react-svgr.com/docs/cli/).

## Install SVGR Command Line tool

1. Just run `npx @svgr/cli` and follow the instructions to install.

## How to Generate an SVG into a React Component

1. Download your SVG and place it somewhere easily accessible. You'll be deleting it later since we're only keeping the component version.

2. Run `svgr`

```bash
npx @svgr/cli -- path/to/svg/file > path/to/destination/IconName.tsx
```

3. Update the generated component to include:

- width, height, stroke (colour string) and title as props
  - Since I wanted to try and be a little more accessibility minded, I added some extra props to the component. `<svg role="img" aria-labbeledBy="...">` and the `<title>...</title>` are there because of that. Read about that all here - https://css-tricks.com/accessible-svgs/#aa-2-inline-svg
- The component is also memoized since I figured the component shouldn't ever really change!

Example:

```typescript
import { memo } from "react";

const generateUniqueID = () => {
  return "icon-<NAME>-" + new Date().getTime();
};

const MyIcon = ({
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
      // ...
    </svg>
  );
};

export default memo(MyIcon);
```
