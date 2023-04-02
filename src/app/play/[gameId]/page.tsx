'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import sandClock from '../../../../public/sand-clock.svg'
import styles from './play.module.scss'
import { setTimeout } from 'timers'
interface IGameProps {
	params: {
		gameId: number
	}
}

const Game = ({ params: { gameId } }: IGameProps) => {
	const [isGameReady, setIsGameReady] = useState(false)
	setTimeout(() => {
		setIsGameReady(true)
	}, 1500)
	const router = useRouter()

	if (isGameReady)
		return (
			<div className={styles.play}>
				<div className={styles.header}>
					{' '}
					<p>Question 1</p>
					<h4>Who created Bitcoin</h4>
				</div>
				<div className={styles.content}>
					<div className={styles.answer}>
						<div className={styles.answerInputs}>
							<label className={styles.checkboxContainer}>
								<input
									type="checkbox"
									onClick={() => router.push('/leaderboard')}
								/>
								<span className={styles.checkboxCheckmark} />
							</label>
							<p>Satoshi Nakamoto</p>
						</div>
					</div>
					<div className={styles.answer}>
						<div className={styles.answerInputs}>
							<label className={styles.checkboxContainer}>
								<input
									type="checkbox"
									onClick={() => router.push('/leaderboard')}
								/>
								<span className={styles.checkboxCheckmark} />
							</label>
							<p>Vitalik Buterin</p>
						</div>
					</div>
				</div>
			</div>
		)
	return (
		<div className={styles.loading}>
			<Image src={sandClock} alt="loading image" width={250} height={250} />
			<h4>the game will start when all players are ready</h4>
		</div>
	)
}

export default Game
