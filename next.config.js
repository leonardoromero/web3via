/** @type {import('next').NextConfig} */
const path = require('path')
require('dotenv').config()
console.log(process.env.WEB3AUTH_CLIENT_ID)
const nextConfig = {
	experimental: {
		appDir: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	env: {
		WEB3AUTH_CLIENT_ID: process.env.WEB3AUTH_CLIENT_ID,
		GAME_CONTRACT_ADDRESS: process.env.GAME_CONTRACT_ADDRESS,
	},
}

module.exports = nextConfig
