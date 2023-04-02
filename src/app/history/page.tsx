import React, { ReactElement } from 'react'
import Link from 'next/link'
import styles from './history.module.scss'

import history, { IGame } from '../../utils/history'

const History = (): ReactElement => {
	function dateDiffInDays(date: string): number {
		const _MS_PER_DAY = 1000 * 60 * 60 * 24
		const today = new Date()
		const dayOfTheGame = new Date(date)

		const utc1 = Date.UTC(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		)
		const utc2 = Date.UTC(
			dayOfTheGame.getFullYear(),
			dayOfTheGame.getMonth(),
			dayOfTheGame.getDate()
		)

		return Math.floor((utc1 - utc2) / _MS_PER_DAY)
	}

	const getPrizesStatus = (game: IGame): ReactElement => {
		if (game.prizesAlreadyClaimed)
			return <td className={styles.dimmed}>claimed</td>
		if (game.prizesToClaim)
			return (
				<td>
					<button className={styles.claim}>claim!</button>
				</td>
			)
		return <td className={styles.dimmed}>nope</td>
	}
	
	return (
		<div className={styles.history}>
			<h1>triwiz</h1>
			<p>past games</p>
			<div className={styles.gamesList}>
				<table>
					<thead>
						<tr>
							<th>position</th>
							<th>days ago</th>
							<th>organizer</th>
							<th>prizes</th>
						</tr>
					</thead>
				</table>
				{history.map((game) => (
					<div key={game.date} className={styles.gameContainer}>
						<Link href="/history" className={styles.game}>
							<div>{game.position}</div>
							<div>{dateDiffInDays(game.date)}</div>
							<div>{game.organizer}</div>
						</Link>
						<div className={styles.gameCTA}>{getPrizesStatus(game)}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default History
