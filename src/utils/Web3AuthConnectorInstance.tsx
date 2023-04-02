// Web3Auth Libraries
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { Web3Auth } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { CHAIN_NAMESPACES } from '@web3auth/base'
import { Chain } from 'wagmi'

export default function Web3AuthConnectorInstance(chains: Chain[]) {
	// Create Web3Auth Instance
	const name = 'My App Name'
	const web3AuthInstance = new Web3Auth({
		clientId: process.env.WEB3AUTH_CLIENT_ID || '',
		chainConfig: {
			chainNamespace: CHAIN_NAMESPACES.EIP155,
			chainId: '0x' + chains[0].id.toString(16),
			rpcTarget: chains[0].rpcUrls.default.http[0],
			displayName: chains[0].name,
			tickerName: chains[0].nativeCurrency?.name,
			ticker: chains[0].nativeCurrency?.symbol,
		},
		uiConfig: {
			appName: name,
			theme: 'light',
			loginMethodsOrder: ['google'],
			defaultLanguage: 'en',
			appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
			modalZIndex: '2147483647',
		},
	})

	const openloginAdapterInstance = new OpenloginAdapter({
		adapterSettings: {
			uxMode: 'popup',
			whiteLabel: {
				name: 'Your app Name',
				logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
				logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
				defaultLanguage: 'en',
				dark: true,
			},
		},
	})
	web3AuthInstance.configureAdapter(openloginAdapterInstance)

	return new Web3AuthConnector({
		chains: chains,
		options: {
			web3AuthInstance,
		},
	})
}
