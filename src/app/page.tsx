'use client'
import React, { useState, ReactElement } from 'react'
import Link from 'next/link'

import { useAccount } from 'wagmi'

import styles from './home.module.scss'

export default function Home(): ReactElement {
	const [gameId, setGameId] = useState('')
	const [isWarningVisible, setIsWarningVisible] = useState(false)
	const { isConnected } = useAccount()

	const gameLink: string = gameId !== '' ? `/play/${gameId}` : '/'

	const handleClick = (): void => {
		if (gameId === '') setIsWarningVisible(true)
	}

	if (isConnected) {
		return (
			<div className={styles.home}>
				<h1>triwiz</h1>
				<p>fun quizzes, instant prizes</p>
				<div className={styles.actions}>
					<div className={styles.play}>
						<input
							placeholder="enter a game id"
							type="string"
							required
							onChange={(e) => setGameId(e.target.value)}
							value={gameId !== '' ? gameId : ''}
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
			<p>fun quizzes, instant prizes</p>
		</div>
	)
}
