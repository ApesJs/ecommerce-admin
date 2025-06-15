/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['m101.sgp1.digitaloceanspaces.com'],
        remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    }
}

module.exports = nextConfig