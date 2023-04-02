'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './play.module.scss'

import clock from '../../../../public/sand-clock.svg'
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

	if (isGameReady)
		return (
			<div className={styles.play}>
				<div className={styles.header}>
					<p>Question 1</p>
					<h4>Who created Bitcoin?</h4>
				</div>
				<div className={styles.content}>
					<div className={styles.answer}>
						<label htmlFor="question-2-answer-1" className={styles.answerLabel}>
							Answer 1
						</label>
						<div className={styles.answerInputs}>
							<label className={styles.checkboxContainer}>
								<input type="checkbox" />
								<span className={styles.checkboxCheckmark} />
							</label>
							Satoshi Nakamoto
						</div>
					</div>
					<div className={styles.answer}>
						<label htmlFor="question-2-answer-2" className={styles.answerLabel}>
							Answer 2
						</label>
						<div className={styles.answerInputs}>
							<label className={styles.checkboxContainer}>
								<input type="checkbox" />
								<span className={styles.checkboxCheckmark} />
							</label>
							Vitalik Buterin
						</div>
					</div>
				</div>
			</div>
		)

	return (
		<div className={styles.loading}>
			<Image src={clock} alt="sand clock" width={250} height={250} />
			<h4>the game will start automatically when all players are ready</h4>
		</div>
	)
}

export default Game
