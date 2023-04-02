'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './leaderboard.module.scss'
import competition from '../../../public/competition.svg'
import confeti from '../../../public/confeti.png'

const Leaderboard = () => {
	const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false)
	const [buttonText, setButonText] = useState('claim prize')
	const [, setTxHash] = useState('')
  let gameId: string = '';
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries());
	  gameId = params.gameId;
  }
	setTimeout(() => {
		setIsLeaderboardVisible(true)
	}, 2500)
	useEffect(() => {
		const init = async () => {
			const body = { gameId }
			const response: Response = await fetch('/api/games', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
			console.log(response)
			setTxHash(JSON.stringify(response))
		}
		init()
	}, [])

	async function handleButton() {
		setButonText('PLEASE WAIT')
	}

	if (isLeaderboardVisible)
		return (
			<div className={styles.leaderboard}>
				<h4>congrats!</h4>
				<Image src={confeti} alt="confeti image" width={200} height={200} />
				<h3>1º place</h3>
				<button className={styles.button} onClick={handleButton}>
					{buttonText}
				</button>
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
