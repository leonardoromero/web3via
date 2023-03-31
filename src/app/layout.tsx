import React from 'react'
import Link from 'next/link'

import './styles/globals.scss'
import styles from './styles/common.module.scss'

export const metadata = {
	title: 'web3via',
}

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
}) {
	return (
		<html lang="en">
			<body>
				<header>
					<ul className={styles.links}>
						{routes.map((route) => (
							<li key={route.name}>
								<Link href={route.path} className={styles.link}>{route.name}</Link>
							</li>
						))}
					</ul>
				</header>
				<main>{children}</main>
			</body>
		</html>
	)
}
