'use client'
import React from 'react'

import styles from './gamesCreated.module.scss'

const GamesCreated = () => {
	const urlSearchParams = new URLSearchParams(window && window.location.search)
	const { gameId } = Object.fromEntries(urlSearchParams.entries())
	return (
		<div className={styles.gamesCreated}>
			<h4 className={styles.title}>games created</h4>
			<div className={styles.gameCreated}>
				<p>{gameId}</p>
				<button className={styles.button}>start</button>
			</div>
		</div>
	)
}

export default GamesCreated
