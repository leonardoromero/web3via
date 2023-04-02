import Image from 'next/image'
import Link from 'next/link'

import styles from './gameCreated.module.scss'
import successIllustration from '../../../../public/tick.svg'

interface IGameProps {
	params: {
		gameId: number
	}
}

const Game = ({ params: { gameId } }: IGameProps) => {
	return (
		<div className={styles.gameCreated}>
			<h2>
				You have created the game <span>{gameId}</span>
			</h2>
			<Image
				src={successIllustration}
				alt="success illustration"
				width={250}
				height={250}
			/>
			<Link href="/games-created" className={styles.link}>
				my games
			</Link>
		</div>
	)
}

export default Game
