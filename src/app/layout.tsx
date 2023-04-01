import React, { ReactElement } from 'react'
import Link from 'next/link'
import { Marmelad, Cambay } from 'next/font/google'

import './styles/globals.scss'
import styles from './styles/common.module.scss'

export const metadata = {
	title: 'web3via',
}

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
		</html>
	)
}
