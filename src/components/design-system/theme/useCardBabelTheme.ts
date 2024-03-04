import { ThemeUIContextValue, useThemeUI } from "theme-ui";
import { CardBabelTheme } from "./theme";

interface ExactContextValue extends Omit<ThemeUIContextValue, "theme"> {
  theme: CardBabelTheme;
}

export const useTheme = useThemeUI as unknown as () => ExactContextValue;
