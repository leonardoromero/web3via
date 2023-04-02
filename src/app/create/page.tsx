'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
} from 'wagmi'
import GameManager from '../../../smartcontracts/artifacts/contracts/GameManager.sol/GameManager.json'
import { v4 as uuidv4 } from 'uuid'


import styles from './create.module.scss'

const Create = () => {
	const router = useRouter()
	const [buttonText, setButtonText] = useState('CREATE')
	const [txHash, setTxHash] = useState('')
	const { config } = usePrepareContractWrite({
		address: process.env.GAME_CONTRACT_ADDRESS as `0x${string}`,
		abi: GameManager.abi,
		functionName: 'createGame',
		args: [6, 1],
		overrides: {
			value: 1,
		},
	})
	const { data, write } = useContractWrite(config)
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	})
	console.log(write)

	useEffect(() => {
		console.log({ isLoading })
		if (isLoading) {
			setButtonText('CREATING GAME...')
			setTxHash(JSON.stringify(data?.hash))
		}
	}, [isLoading])

	useEffect(() => {
		if (isSuccess) {
			setButtonText('CREATED')
			router.push(`/create/${5}?txHash=${txHash}`)
		}
	}, [isSuccess])

	const handleCreateGame = (e: any) => {
		e.preventDefault()

		if (write) {
			console.log({ write })
			write()
		}
	}

	return (
		<div className={styles.create}>
			<h3>create new game</h3>
			<form>
				<label htmlFor="title">Title</label>
				<input
					type="string"
					name="title"
					id="title"
					value="History of Bitcoin"
				/>
				<div className={styles.divider} />
				<label htmlFor="question-1">Question 1</label>
				<input
					type="string"
					name="question-1"
					id="question-1"
					value="Who created Bitcoin?"
				/>
				<div className={styles.answer}>
					<label htmlFor="question-1-answer-1" className={styles.answerLabel}>
						Answer 1
					</label>
					<div className={styles.answerInputs}>
						<label className={styles.checkboxContainer}>
							<input type="checkbox" checked />
							<span className={styles.checkboxCheckmark} />
						</label>
						<input
							type="string"
							name="question-1-answer-1"
							id="question-1-answer-1"
							value="Satoshi Nakamoto"
						/>
					</div>
				</div>
				<div className={styles.answer}>
					<label htmlFor="question-1-answer-2" className={styles.answerLabel}>
						Answer 2
					</label>
					<div className={styles.answerInputs}>
						<label className={styles.checkboxContainer}>
							<input type="checkbox" />
							<span className={styles.checkboxCheckmark} />
						</label>
						<input
							type="string"
							name="question-1-answer-2"
							id="question-1-answer-2"
							value="Vitalik Buterin"
						/>
					</div>
				</div>
				<div className={styles.divider} />
				<label htmlFor="question-2">Question 2</label>
				<input
					type="string"
					name="question-2"
					id="question-2"
					value="Who created Ethereum?"
				/>
				<div className={styles.answer}>
					<label htmlFor="question-2-answer-1" className={styles.answerLabel}>
						Answer 1
					</label>
					<div className={styles.answerInputs}>
						<label className={styles.checkboxContainer}>
							<input type="checkbox" />
							<span className={styles.checkboxCheckmark} />
						</label>
						<input
							type="string"
							name="question-2-answer-1"
							id="question-2-answer-1"
							value="Satoshi Nakamoto"
						/>
					</div>
				</div>
				<div className={styles.answer}>
					<label htmlFor="question-2-answer-2" className={styles.answerLabel}>
						Answer 2
					</label>
					<div className={styles.answerInputs}>
						<label className={styles.checkboxContainer}>
							<input type="checkbox" checked />
							<span className={styles.checkboxCheckmark} />
						</label>
						<input
							type="string"
							name="question-2-answer-2"
							id="question-2-answer-2"
							value="Vitalik Buterin"
						/>
					</div>
				</div>
				<div className={styles.divider} />
				<label htmlFor="prize">Prizes</label>
				<div className={styles.prize}>
					<p>1º</p>
					<input type="number" name="prize" id="prize" value="10" />
					<select name="unit" id="unit">
						<option value="">Please choose a crypto</option>
						<option value="eth" selected>
							eth
						</option>
					</select>
				</div>
				<div className={styles.prize}>
					<p>2º</p>
					<input type="number" name="prize" id="prize" value="5" />
					<select name="unit" id="unit">
						<option value="">Please choose a crypto</option>
						<option value="eth" selected>
							eth
						</option>
					</select>
				</div>
				<div className={styles.prize}>
					<p>3º</p>
					<input type="number" name="prize" id="prize" value="1" />
					<select name="unit" id="unit">
						<option value="">Please choose a crypto</option>
						<option value="eth" selected>
							eth
						</option>
					</select>
				</div>
				<button className={styles.createButton} onClick={handleCreateGame}>
					{buttonText}
				</button>
			</form>
		</div>
	)
}

export default Create
