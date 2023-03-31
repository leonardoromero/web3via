/** @type {import('next').NextConfig} */
const path = require('path')
require('dotenv').config()

const nextConfig = {
	experimental: {
		appDir: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	env: {
		WEB3AUTH_CLIENT_ID: process.env.WEB3AUTH_CLIENT_ID,
	},
}

module.exports = nextConfig
