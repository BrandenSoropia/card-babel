import { Theme } from "theme-ui";

/**
 * Using rems for better accessibility.
 */
const _4px = "0.25rem";
const _8px = "0.5rem";
const _16px = "1rem";
const _24px = "1.5rem";
const _32px = "2rem";
const _48px = "2.5rem";
const _64px = "4rem";

/**
 * Variant Base Styles
 *
 * I couldn't figure out a documented way of defining base styles,
 * so I'll just do it the object spreading way.
 */
const INPUT_BASE_STYLES = {
  backgroundColor: "slate",
  borderColor: "darkGrey",
  color: "white",
  fontSize: 1,
};

const makeTheme = <T extends Theme>(t: T) => t;

const theme = makeTheme({
  styles: { root: { fontSize: 1, maxWidth: "100vw", overflowX: "hidden" } },
  fontSizes: [_8px, _16px, _24px, _32px, _48px, _64px],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  // TODO: alias these as "t-shirt" sizes to make it easier to remember!
  spaces: [0, _4px, _8px, _16px, _24px, _32px, _48px, _64px],
  colors: {
    black: "#111111",
    slate: "#252525",
    darkGrey: "#424242",
    grey: "#E5E5E5",
    white: "#f7f4ea",
    mustard: "#FCA311",
    navy: "#14213D",
  },
  // Components
  buttons: {
    primary: {
      color: "white",
      bg: "mustard",
    },
    secondary: {
      color: "black",
      bg: "white",
    },
    clear: {
      backgroundColor: "transparent",
    },
  },
  forms: {
    pill: {
      ...INPUT_BASE_STYLES,
      borderRadius: "100px",
      borderWidth: "3px",
    },
  },
});

export type CardBabelTheme = typeof theme;

export default theme;
