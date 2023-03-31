interface IGameProps {
	params: {
		gameId: number
	}
}

const Game = ({ params: { gameId } }: IGameProps) => {
	return <div style={{ color: 'white' }}>{gameId}</div>
}

export default Game
