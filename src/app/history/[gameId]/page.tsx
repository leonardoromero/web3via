import React from 'react'

interface IGameProps {
	params: {
		gameId: number
	}
}
const HistoryDetail = ({ params: { gameId } }: IGameProps) => {
	return <div>HistoryDetail:{gameId}</div>
}

export default HistoryDetail
