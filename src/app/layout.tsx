'use client'

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import { Marmelad, Cambay } from 'next/font/google'

import './styles/globals.scss'
import styles from './styles/common.module.scss'
import { ContextProvider } from './contexts/providerContext'
import Web3AuthConnectorInstance from './Web3AuthConnectorInstance'

const { chains, provider, webSocketProvider } = configureChains(
	[mainnet, arbitrum, polygon],
	[publicProvider()]
)

// Set up client
const client = createClient({
	autoConnect: true,
	connectors: [
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'wagmi',
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: 'Injected',
				shimDisconnect: true,
			},
		}),
		Web3AuthConnectorInstance(chains),
	],
	provider,
	webSocketProvider,
})

export const metadata = {
	title: 'web3via',
}
// WAGMI Libraries

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

const routes = [
	{
		name: 'home',
		path: '/',
	},
	{
		name: 'history',
		path: '/history',
	},
	{
		name: 'create',
		path: '/create',
	},
]

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): ReactElement {
	return (
		<html lang="en" className={`${marmelad.variable} ${cambay.variable}`}>
			<WagmiConfig client={client}>
				<ContextProvider>
					<body>
						<header className={styles.header}>
							<ul className={styles.links}>
								{routes.map((route) => (
									<li key={route.name}>
										<Link href={route.path} className={styles.link}>
											{route.name}
										</Link>
									</li>
								))}
							</ul>
						</header>
						<main>{children}</main>
					</body>
				</ContextProvider>
			</WagmiConfig>
		</html>
	)
}
