import { useEffect, useState } from 'react'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import {
	CHAIN_NAMESPACES,
	SafeEventEmitterProvider,
	WALLET_ADAPTERS,
} from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import RPC from '../../utils/ethersRPC'
import { MetamaskAdapter } from '@web3auth/metamask-adapter'
import GameContract from '@/utils/gameContract'

const clientId: string = process.env.WEB3AUTH_CLIENT_ID || ''

export default function useWeb3Auth() {
	const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
		null
	)
	const [initExecuted, setInitExecuted] = useState<boolean>(false)

	useEffect(() => {
		const init = async () => {
			try {
				const web3auth = new Web3AuthNoModal({
					clientId,
					chainConfig: {
						chainNamespace: CHAIN_NAMESPACES.EIP155,
						chainId: '0x5',
						rpcTarget: 'https://rpc.ankr.com/eth_goerli',
					},
				})

				setWeb3auth(web3auth)
				const openloginAdapter = new OpenloginAdapter()
				web3auth.configureAdapter(openloginAdapter)

				const metamaskAdapter = new MetamaskAdapter({
					clientId,
					sessionTime: 3600,
					chainConfig: {
						chainNamespace: CHAIN_NAMESPACES.EIP155,
						chainId: '0x5',
						rpcTarget: 'https://rpc.ankr.com/eth_goerli',
					},
				})

				web3auth.configureAdapter(metamaskAdapter)

				await web3auth.init()
				if (web3auth.provider) {
					setProvider(web3auth.provider)
				}
				setInitExecuted(true)
			} catch (error) {
				console.error(error)
			}
		}

		if (!initExecuted) {
			init()
		}
	}, [initExecuted])
	const login = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet')
			return
		}
		const web3authProvider = await web3auth.connectTo(
			WALLET_ADAPTERS.OPENLOGIN,
			{
				loginProvider: 'google',
			}
		)

		setProvider(web3authProvider)
	}

	const loginMetamask = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet')
			return
		}
		const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.METAMASK)
		setProvider(web3authProvider)
	}

	const authenticateUser = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet')
			return
		}
		const idToken = await web3auth.authenticateUser()
		uiConsole(idToken)
	}

	const getUserInfo = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet')
			return
		}
		const user = await web3auth.getUserInfo()
		uiConsole(user)
	}

	const logout = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet')
			return
		}
		await web3auth.logout()
		setProvider(null)
	}

	const getChainId = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new RPC(provider)
		const chainId = await rpc.getChainId()
		uiConsole(chainId)
	}

	const addChain = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const newChain = {
			chainId: '0x5',
			displayName: 'Goerli',
			chainNamespace: CHAIN_NAMESPACES.EIP155,
			tickerName: 'Goerli',
			ticker: 'ETH',
			decimals: 18,
			rpcTarget: 'https://rpc.ankr.com/eth_goerli',
			blockExplorer: 'https://goerli.etherscan.io',
		}
		await web3auth?.addChain(newChain)
		uiConsole('New Chain Added')
	}

	const switchChain = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		await web3auth?.switchChain({ chainId: '0x5' })
		uiConsole('Chain Switched')
	}

	const getAccounts = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new RPC(provider)
		const address = await rpc.getAccounts()
		uiConsole(address)
	}

	const getBalance = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new RPC(provider)
		const balance = await rpc.getBalance()
		uiConsole(balance)
	}

	const sendTransaction = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new RPC(provider)
		const receipt = await rpc.sendTransaction()
		uiConsole(receipt)
	}

	const signMessage = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new RPC(provider)
		const signedMessage = await rpc.signMessage()
		uiConsole(signedMessage)
	}

	const getPrivateKey = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new RPC(provider)
		const privateKey = await rpc.getPrivateKey()
		uiConsole(privateKey)
	}

	const createGame = async ({ txInProcess, txFinished }: any) => {
		if (!provider) {
			uiConsole('provider not initialized yet')
			return
		}
		const rpc = new GameContract(provider)
		const privateKey = await rpc.createGame({
			txInProcess,
			txFinished,
		})
		uiConsole(privateKey)
	}

	function uiConsole(...args: any[]): void {
		const el = document.querySelector('#console')
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2)
		}
	}
	console.log({ provider })
	return {
		login,
		loginMetamask,
		authenticateUser,
		getUserInfo,
		logout,
		getChainId,
		addChain,
		switchChain,
		getAccounts,
		getBalance,
		sendTransaction,
		signMessage,
		getPrivateKey,
		createGame,
		provider,
	}
}
