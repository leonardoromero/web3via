import Link from 'next/link'
import Image from 'next/image'

import { useAccount, useConnect } from 'wagmi'

import styles from './styles/common.module.scss'

const Navigation = () => {
	const routes = [
		{
			name: 'home',
			path: '/',
			icon: 'house',
		},
		{
			name: 'history',
			path: '/history',
			icon: 'list',
		},
		{
			name: 'create',
			path: '/create',
			icon: 'writing',
		},
	]
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect()
	const { address, isConnected } = useAccount()

	return (
		<div className={styles.navigation}>
			<ul className={styles.links}>
				{isConnected ? (
					<>
						{routes.map((route) => (
							<li key={route.name}>
								<Link href={route.path} className={styles.link}>
									<Image
										src={`${route.icon}.svg`}
										alt=""
										width={30}
										height={30}
									/>
								</Link>
							</li>
						))}
						<li className={styles.address}>{`${address?.substring(
							0,
							4
						)}...${address?.substring(38, 42)}`}</li>
					</>
				) : (
					<li>
						{connectors.map((connector) => (
							<button
								className="card"
								disabled={!connector.ready}
								key={connector.id}
								onClick={() => connect({ connector })}
							>
								{connector.name}
								{!connector.ready && ' (unsupported)'}
								{isLoading &&
									connector.id === pendingConnector?.id &&
									' (connecting)'}
							</button>
						))}
						{error && <div>{error.message}</div>}
					</li>
				)}
			</ul>
		</div>
	)
}

export default Navigation
