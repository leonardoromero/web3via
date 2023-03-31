interface IGameProps {
	params: {
		gameId: number
	}
}

const Game = ({ params }: IGameProps) => {
	const { gameId } = params
	return <div style={{ color: 'white' }}>{gameId}</div>
}

export default Game
