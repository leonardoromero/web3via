'use client'
import React, { useState, ReactElement } from 'react'
import Link from 'next/link'
import styles from './home.module.scss'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home(): ReactElement {
	const [gameId, setGameId] = useState(0)
	const [isWarningVisible, setIsWarningVisible] = useState(false)
	const gameLink: string = gameId !== 0 ? `/play/${gameId}` : '/'
	const handleClick = (): void => {
		if (gameId === 0) setIsWarningVisible(true)
	}

	const { address, connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { disconnect } = useDisconnect()

	if (isConnected) {
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
					<div onClick={disconnect as any} className={styles.links}>
						<button>Desconectar</button>
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
			<h1>web3via</h1>
			<p>take your prize home instantly</p>
			<div id="console" style={{ whiteSpace: 'pre-line' }}>
				<p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
			</div>
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
		</div>
	)
}
