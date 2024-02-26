"use client";

import NotificationFactoryProvider from "@/components/notification-factory/NotificationFactoryProvider";
import NotificationFactory from "@/components/notification-factory/NotificationFactory";
import { ThemeProvider } from "@/components/design-system";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NotificationFactoryProvider>
            <NotificationFactory />
            {children}
          </NotificationFactoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
