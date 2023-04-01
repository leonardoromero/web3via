interface IQuestion {
	question: string
	options: string[]
	correctAnswer: number
}

interface IGameCreated {
	organizer: string
	id: number
	questions: IQuestion[]
	timestamp: Date
	prizes: {
		first: {
			amount: number
			unit: string
		}
	}
}

const gamesCreated: IGameCreated[] = []

export default gamesCreated
