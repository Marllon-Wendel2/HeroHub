/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css';
import { useEffect } from "react";
import { Black_Ops_One } from 'next/font/google';

const blackOpsOne = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  })

  return (
    <html lang="en" className={blackOpsOne.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
