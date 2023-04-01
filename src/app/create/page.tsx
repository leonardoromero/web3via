'use client'

import React, { useContext, useState } from 'react'
import styles from './create.module.scss'
import { EthersProviderContext } from '../contexts/providerContext'

const Create = () => {
	const { ethersProvider } = useContext(EthersProviderContext)
	const { createGame, getUserInfo } = ethersProvider

	const [buttonText, setButtonText] = useState('mandale')

	const handleCreate = () => {
		createGame({
			txInProcess: () => {
				setButtonText('corriendo')
			},
			txFinished: () => {
				setButtonText('finalizado')
			},
		})
	}
	return (
		<>
			<h1 className={styles.title}>Create</h1>
			<p id="console">take your prize home instantly</p>
			<button onClick={handleCreate} className={styles.links}>
				{buttonText}
			</button>
		</>
	)
}

export default Create
