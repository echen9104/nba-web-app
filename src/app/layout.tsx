import "./globals.css";
import { ReactNode } from "react";
import Providers from "./Providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={"font-sans bg-background text-foreground"}
        style={{ fontFamily: 'Geist, ui-sans-serif, system-ui, sans-serif' }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
