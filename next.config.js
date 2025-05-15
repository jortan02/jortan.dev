/** @type {import('next').NextConfig} */
const nextConfig = {}

const { withContentlayer } = require("next-contentlayer2")
module.exports = withContentlayer(nextConfig)