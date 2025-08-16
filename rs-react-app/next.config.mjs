/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
