'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './home.module.scss'

export default function Home() {
	const isWalletConnected: boolean = true
	const [gameId, setGameId] = useState(0)

	if (isWalletConnected) {
		return (
			<div className={styles.home}>
				<h1>web3via</h1>
				<p>take your prize home instantly</p>
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
							placeholder="enter a game code"
							type="number"
							required
							onChange={(e) => setGameId(+e.target.value)}
							value={gameId !== 0 ? gameId : ''}
						/>
						<Link href={`/play/${gameId}`} className={styles.link}>
							GO!
						</Link>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.home}>
			<h1>web3via</h1>
			<p>take your prize home instantly</p>
			<div className={styles.actions}>
				<button>connect wallet</button>
			</div>
		</div>
	)
}
