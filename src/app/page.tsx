'use client'
import React, { useState, ReactElement, useContext } from 'react'
import Link from 'next/link'
import styles from './home.module.scss'
import { EthersProviderContext } from './contexts/providerContext'

export default function Home(): ReactElement {
	const [gameId, setGameId] = useState(0)
	const [isWarningVisible, setIsWarningVisible] = useState(false)
	const gameLink: string = gameId !== 0 ? `/play/${gameId}` : '/'
	const { ethersProvider } = useContext(EthersProviderContext)
	const { login, loginMetamask, provider, logout, getUserInfo } = ethersProvider
	const isWalletConnected: boolean = provider !== null
	const handleClick = (): void => {
		if (gameId === 0) setIsWarningVisible(true)
	}

	if (isWalletConnected) {
		return (
			<div className={styles.home}>
				<h1>web3via</h1>
				<p id="console">take your prize home instantly</p>

				<div className={styles.actions}>
					<Link href="/create" className={styles.link}>
						create new game
					</Link>
					<Link href="/history" className={styles.link}>
						history
					</Link>
					<input placeholder="enter an alias" />
					<div className={styles.play}>
						<input
							placeholder="enter a game id"
							type="number"
							required
							onChange={(e) => setGameId(+e.target.value)}
							value={gameId !== 0 ? gameId : ''}
						/>
						<Link href={gameLink} className={styles.link} onClick={handleClick}>
							GO!
						</Link>
					</div>
					<button onClick={getUserInfo} className={styles.links}>
						getUserInfo
					</button>
					<button onClick={logout} className={styles.links}>
						LOGOUT
					</button>
					<span
						style={isWarningVisible ? { color: 'white' } : { opacity: '0' }}
						className={styles.warning}
					>
						bummer! game id is not valid 🥲
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.home}>
			<h1>web3via</h1>
			<p>take your prize home instantly</p>
			<div id="console" style={{ whiteSpace: 'pre-line' }}>
				<p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
			</div>
			<div onClick={login} className={styles.links}>
				<button>connect via Email</button>
			</div>
			<div onClick={loginMetamask} className={styles.links}>
				<button>connect wallet</button>
			</div>
		</div>
	)
}
