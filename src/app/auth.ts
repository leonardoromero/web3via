import { useEffect, useState } from 'react'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import {
	CHAIN_NAMESPACES,
	SafeEventEmitterProvider,
	WALLET_ADAPTERS,
} from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import {
	WalletConnectV2Adapter,
	getWalletConnectV2Settings,
} from '@web3auth/wallet-connect-v2-adapter'
import QRCodeModal from '@walletconnect/qrcode-modal'
import RPC from './ethersRPC' // for using ethers.js

const clientId: string = process.env.WEB3AUTH_CLIENT_ID || ''

export default function useWeb3Auth() {
	const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null)
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
		null
	)

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

				// adding wallet connect v2 adapter
				const defaultWcSettings = await getWalletConnectV2Settings(
					'eip155',
					[1, 137, 5],
					'04309ed1007e77d1f119b85205bb779d'
				)
				const walletConnectV2Adapter = new WalletConnectV2Adapter({
					adapterSettings: {
						qrcodeModal: QRCodeModal,
						...defaultWcSettings.adapterSettings,
					},
					loginSettings: { ...defaultWcSettings.loginSettings },
				})

				web3auth.configureAdapter(walletConnectV2Adapter)

				await web3auth.init()
				if (web3auth.provider) {
					setProvider(web3auth.provider)
				}
			} catch (error) {
				console.error(error)
			}
		}

		init()
	}, [])
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

	const loginWCModal = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet')
			return
		}
		const web3authProvider = await web3auth.connectTo(
			WALLET_ADAPTERS.WALLET_CONNECT_V2
		)
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

	function uiConsole(...args: any[]): void {
		const el = document.querySelector('#console')
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2)
		}
	}
	return {
		login,
		loginWCModal,
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
		provider,
	}
}
