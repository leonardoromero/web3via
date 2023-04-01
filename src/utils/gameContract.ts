import type { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'
import abiERC721 from '../utils/abiERC721.json'

export default class GameContract {
	private provider: SafeEventEmitterProvider

	constructor(provider: SafeEventEmitterProvider) {
		this.provider = provider
	}

	async createGame({
		txInProcess,
		txFinished,
	}: {
		txInProcess: any
		txFinished: any
	}): Promise<any> {
		try {
			const ethersProvider = new ethers.providers.Web3Provider(this.provider)
			const signer = ethersProvider.getSigner()
			const contractAddress = '0x8B503347795042444f9395a9d31E44F2425d3AeD' || ''
			console.log(ethersProvider.getSigner())
			const contract = new ethers.Contract(
				contractAddress,
				abiERC721.result,
				signer
			)
			const tx = await contract.addHotel({
				value: ethers.utils.parseUnits('1', 'gwei'),
			})
			txInProcess()
			const receipt = await tx.wait()
			txFinished()
			return receipt
		} catch (error) {
			console.log({ error })
			return error as string
		}
	}
}
