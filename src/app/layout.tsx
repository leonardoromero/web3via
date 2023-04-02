'use client'
import React, { ReactElement } from 'react'
import { Marmelad, Cambay } from 'next/font/google'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { WagmiConfig, createClient, configureChains } from 'wagmi'

import Navigation from './Navigation'
import './styles/globals.scss'

const { chains, provider, webSocketProvider } = configureChains(
	[goerli],
	[publicProvider()]
)

const client = createClient({
	autoConnect: true,
	connectors: [
		new InjectedConnector({
			chains,
			options: {
				name: 'Connect Wallet',
				shimDisconnect: true,
			},
		}),
	],
	provider,
	webSocketProvider,
})

const marmelad = Marmelad({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-marmelad',
})

const cambay = Cambay({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-cambay',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): ReactElement {
	return (
		<html lang="en" className={`${marmelad.variable} ${cambay.variable}`}>
			<WagmiConfig client={client}>
				<body>
					<main>{children}</main>
					<footer>
						<Navigation />
					</footer>
				</body>
			</WagmiConfig>
		</html>
	)
}
