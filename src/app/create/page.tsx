'use client'

import React, { useState, useEffect } from 'react'
import styles from './create.module.scss'
import {
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
	useAccount,
} from 'wagmi'

import abiERC721 from '../../utils/abiERC721.json'

const Create = () => {
	const [buttonText, setButtonText] = useState('crear')
	const successText = 'creado'
	const contractAddress = '0x8B503347795042444f9395a9d31E44F2425d3AeD'
	const a = useAccount()
	console.log(a)
	/*
	const akk = usePrepareContractWrite({
		addressOrName: contractAddress,
		contractInterface: JSON.parse(abiERC721.result),
		functionName: 'addHotel',
		args: [],
	})
	console.log(akk)
	const { data: createGameData, write: createGame } = useContractWrite(
		akk.config
	) */
	const SELLER_ADDRESS = '0xA81895CE092398F043432bCe85D4579332aC61d8'
	const RESERVATION_ID = 3
	const PRICE_ERC20 = 1
	const { config } = usePrepareContractWrite({
		address: contractAddress,
		abi: JSON.parse(abiERC721.result),
		functionName: 'changeReservationOwner',
		args: [SELLER_ADDRESS, RESERVATION_ID, PRICE_ERC20],
	})
	console.log(config)
	const { data, error, write } = useContractWrite(config)
	console.log(error)
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	})

	useEffect(() => {
		if (isLoading) {
			console.log('CREANDO')
			setButtonText('Creando juego')
		}
	}, [isLoading])

	useEffect(() => {
		if (isSuccess) {
			setButtonText(successText)
		}
	}, [isSuccess])

	const onClick = () => {
		write()
	}

	return (
		<>
			<h1 className={styles.title}>Create</h1>
			<p id="console">take your prize home instantly</p>
			<button onClick={onClick} className={styles.links}>
				{buttonText}
			</button>
		</>
	)
}

export default Create
