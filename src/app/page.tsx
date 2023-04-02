'use client'
import React, { useState, ReactElement } from 'react'
import Link from 'next/link'
import styles from './home.module.scss'
// WAGMI Libraries
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home(): ReactElement {
	const [gameId, setGameId] = useState(0)
	const [isWarningVisible, setIsWarningVisible] = useState(false)
	const gameLink: string = gameId !== 0 ? `/play/${gameId}` : '/'

	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()

	const handleClick = (): void => {
		if (gameId === 0) setIsWarningVisible(true)
	}

	if (isConnected) {
		return (
			<div className={styles.home}>
				<div className="title">Connected to {connector?.name}</div>
				<div>{address}</div>
				<h1>triwiz</h1>
				<p>take your prize home instantly</p>
				<div className={styles.actions}>
					<Link href="/create" className={styles.link}>
						create new game
					</Link>
					<Link href="/history" className={styles.link}>
						history
					</Link>
					<input placeholder="enter an alias" />
					<div className="main">
						<button className="card" onClick={disconnect as any}>
							Disconnect
						</button>
					</div>
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
			<h1>triwiz</h1>
			<p>take your prize home instantly</p>
			<div className="main">
				{connectors.map((connector) => (
					<button
						className="card"
						disabled={!connector.ready}
						key={connector.id}
						onClick={() => connect({ connector })}
					>
						{connector.name}
						{!connector.ready && ' (unsupported)'}
						{isLoading &&
							connector.id === pendingConnector?.id &&
							' (connecting)'}
					</button>
				))}
				{error && <div>{error.message}</div>}
			</div>
		</div>
	)
}
