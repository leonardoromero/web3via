'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import styles from './leaderboard.module.scss'
import competition from '../../../public/competition.svg'
import confeti from '../../../public/confeti.png'

const Leaderboard = () => {
	const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false)
	setTimeout(() => {
		setIsLeaderboardVisible(true)
	}, 2500)

	if (isLeaderboardVisible)
		return (
			<div className={styles.leaderboard}>
				<h4>congrats!</h4>
				<Image src={confeti} alt="confeti image" width={200} height={200} />
				<h3>1º place</h3>
				<button className={styles.button}>claim prize</button>
			</div>
		)

	return (
		<div className={styles.loading}>
			<Image
				src={competition}
				alt="leaderboard image"
				width={250}
				height={250}
			/>
			<h4>waiting for other players to submit their answer</h4>
		</div>
	)
}

export default Leaderboard
