/**
 * Using rems for better accessibility.
 */
const _8px = "0.5rem";
const _16px = "1rem";
const _24px = "1.5rem";
const _32px = "2rem";
const _48px = "2.5rem";
const _64px = "4rem";

const theme = {
  root: { maxWidth: "100vw", overflowX: "hidden" },
  fontSizes: [_8px, _16px, _24px, _32px, _48px, _64px],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  spaces: [0, 4, 8, 16, 32, 64],
  colors: {
    black: "#252323",
    white: "#f7f4ea",
    grey: "#E5E5E5",
    mustard: "#FCA311",
    navy: "#14213D",
  },
  buttons: {
    primary: {
      color: "white",
      bg: "mustard",
    },
    secondary: {
      color: "black",
      bg: "white",
    },
  },
};

// Aliases

export default theme;
