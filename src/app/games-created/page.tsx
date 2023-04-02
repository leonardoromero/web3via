'use client'
import React from 'react'

import styles from './gamesCreated.module.scss'

const GamesCreated = () => {
	let gameId: string = '';
  if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries());
	  gameId = params.gameId;
  }
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
