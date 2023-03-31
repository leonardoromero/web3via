interface IPrize {
	position: number
	prize: {
		amount: number
		unit: string
	}
}

export interface IGame {
	id: number
	date: string
	organizer: string
	position: number
	prizes: IPrize[]
	prizesToClaim: boolean
	prizesAlreadyClaimed: boolean
}

const history: IGame[] = [
	{
		id: 123456,
		date: '03/28/2023',
		organizer: 'Solow',
		position: 1,
		prizes: [
			{
				position: 1,
				prize: {
					amount: 10,
					unit: 'eth',
				},
			},
			{
				position: 2,
				prize: {
					amount: 5,
					unit: 'eth',
				},
			},
			{
				position: 3,
				prize: {
					amount: 1,
					unit: 'eth',
				},
			},
		],
		prizesToClaim: true,
		prizesAlreadyClaimed: false,
	},
	{
		id: 234567,
		date: '02/02/2023',
		organizer: 'Defiant',
		position: 3,
		prizes: [
			{
				position: 1,
				prize: {
					amount: 10,
					unit: 'eth',
				},
			},
			{
				position: 2,
				prize: {
					amount: 5,
					unit: 'eth',
				},
			},
			{
				position: 3,
				prize: {
					amount: 1,
					unit: 'eth',
				},
			},
		],
		prizesToClaim: false,
		prizesAlreadyClaimed: true,
	},
	{
		id: 345678,
		date: '01/01/2023',
		organizer: 'Speezard',
		position: 14,
		prizes: [
			{
				position: 1,
				prize: {
					amount: 10,
					unit: 'eth',
				},
			},
			{
				position: 2,
				prize: {
					amount: 5,
					unit: 'eth',
				},
			},
			{
				position: 3,
				prize: {
					amount: 1,
					unit: 'eth',
				},
			},
		],
		prizesToClaim: false,
		prizesAlreadyClaimed: false,
	},
]

export default history
