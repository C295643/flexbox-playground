import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flex Container Styler',
  description: 'Interactive CSS Flex Container Styler',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}