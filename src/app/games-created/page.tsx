import React from 'react'
import styles from './gamesCreated.module.scss'

const GamesCreated = () => {
	return (
		<div className={styles.gamesCreated}>
			<h4 className={styles.title}>games created</h4>
			<div className={styles.gameCreated}>
				<p>252863</p>
				<button className={styles.button}>start</button>
			</div>
		</div>
	)
}

export default GamesCreated
