"use client";

import NotificationFactoryProvider from "@/components/notification-factory/NotificationFactoryProvider";
import NotificationFactory from "@/components/notification-factory/NotificationFactory";
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
          marginX: 2,
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
