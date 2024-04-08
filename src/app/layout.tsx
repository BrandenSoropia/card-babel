"use client";

import {
  NotificationFactoryProvider,
  NotificationFactory,
} from "@/components/notification-factory";
import { ThemeProvider } from "@/components/design-system";
import { Box } from "theme-ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Box
        as="body"
        sx={{
          backgroundColor: "grey",
        }}
      >
        <ThemeProvider>
          <NotificationFactoryProvider>
            <NotificationFactory />
            {children}
          </NotificationFactoryProvider>
        </ThemeProvider>
      </Box>
    </html>
  );
}
