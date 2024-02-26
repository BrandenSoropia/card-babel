"use client";

import { ThemeUIProvider } from "theme-ui";
import theme from "./theme";
import React from "react";

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
);

export default ThemeProvider;
