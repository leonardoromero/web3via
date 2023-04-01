'use client'
import { createContext } from 'react'
import useWeb3auth from '../services/auth'

export const EthersProviderContext = createContext<any>({})

export const ContextProvider = ({ children }: { children: any }) => {
	const ethersProvider = useWeb3auth()
	console.log(ethersProvider)

	return (
		<EthersProviderContext.Provider value={{ ethersProvider }}>
			{children}
		</EthersProviderContext.Provider>
	)
}
