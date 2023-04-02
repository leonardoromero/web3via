'use client'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import { Marmelad, Cambay } from 'next/font/google'

import './styles/globals.scss'
import styles from './styles/common.module.scss'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import Web3AuthConnectorInstance from '../utils/Web3AuthConnectorInstance'

const { chains, provider, webSocketProvider } = configureChains(
	[goerli],
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
		new WalletConnectConnector({
			chains,
			options: {
				qrcode: true,
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
			</WagmiConfig>
		</html>
	)
}
