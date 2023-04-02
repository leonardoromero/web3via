import GameManagerJSON from '../../../../smartcontracts/artifacts/contracts/GameManager.sol/GameManager.json'
import { GameManager } from '../../../../smartcontracts/typechain-types'
const { ethers } = require('ethers')

interface GameResultDTO {
	gameId: number
}

const contractAddress = process.env.GAME_CONTRACT_ADDRESS
const privateKey = process.env.PRIVATE_KEY
const providerUrl = process.env.RPC_PROVIDER_URL

const provider = new ethers.providers.JsonRpcProvider(providerUrl)
const wallet = new ethers.Wallet(privateKey, provider)
const gameManagerInterface = new ethers.utils.Interface(GameManagerJSON.abi)
const contract: GameManager = new ethers.Contract(
	contractAddress,
	gameManagerInterface,
	wallet
)

export async function POST(req: Request, res: Response) {
	try {
		const data: GameResultDTO = await req.json()
		console.log(data)

		if (!data.gameId) {
			throw new Error('Datos de entrada inválidos')
		}

		const publishTx = await contract.publishGameResult(data.gameId, [
			'0x7a12C99F9C695cC547a8f2af9E53f8A978fc6d44',
		])
		await publishTx.wait()
		const airdropTx = await contract.airdropPrize(data.gameId)
		return new Response(airdropTx.hash)
	} catch (error) {
		console.error(error)
		return new Response('Ha ocurrido un error al procesar la solicitud')
	}
}
