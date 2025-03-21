import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
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
