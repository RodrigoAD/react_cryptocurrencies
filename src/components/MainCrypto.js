import React from 'react';
import axios from 'axios';

import Coin from './Coin.js';
export default class MainCrypto extends React.Component {
	constructor() {
		super();
		this.constants = {
			COINBASE_URL: 'https://www.coincap.io/page/',
			BTC: 'BTC',
			ETH: 'ETH',
			XRP: 'XRP'
		};
		
		this.state = {
			coins: {
				BTC: {
					loaded: false,
					fullname: '',
					usdPrice: '',
					eurPrice: '',
					diffOneDay: ''
				},
				ETH: {
					loaded: false,
					fullname: '',
					usdPrice: '',
					eurPrice: '',
					diffOneDay: ''
				},
				XRP: {
					loaded: false,
					fullname: '',
					usdPrice: '',
					eurPrice: '',
					diffOneDay: ''
				}
			},
			showDetail: false
		}

		this.coinDetail.bind(this);
		this.startSocket.bind(this);
		this.initCoins.bind(this);
		this.allLoaded.bind(this);
	}

	startSocket () {
		const instance = this;
		const io = require('socket.io-client');
		// Socket is over HTTP protocol, will not work with https deployment
		const socket = io.connect('http://socket.coincap.io');
		socket.on('trades', (data) => {
			const coinName = data.message.coin;
			const msg = data.message.msg;

			const coins = this.state.coins;
			if (coins[coinName]) {
				const coinInfo = {
					usdPrice: msg.price,
					diffOneDay: msg.cap24hrChange
				}
				Object.assign(coins[coinName], coinInfo);
				instance.setState({ coins });
			}
		});
	}

	// Sets the init values for the 3 coins
	initCoins () {
		const coinBaseUrl = this.constants.COINBASE_URL;
		function setCoin (response) {
			const coins = this.state.coins;
			const coinInfo = {
				name: response.data.id, 
				fullname: response.data.display_name, 
				usdPrice: response.data.price_usd,
				eurPrice: response.data.price_eur, 
				diffOneDay: response.data.cap24hrChange,
				loaded: true
			};
			coins[response.data.id] = coinInfo;
			this.setState({ coins });
		}
		axios.get(coinBaseUrl.concat('BTC')).then(setCoin.bind(this));
		axios.get(coinBaseUrl.concat('ETH')).then(setCoin.bind(this));
		axios.get(coinBaseUrl.concat('XRP')).then(setCoin.bind(this));
	}

	allLoaded () {
		const coins = this.state.coins;
		return coins.BTC.loaded && coins.ETH.loaded && coins.XRP.loaded;
	}

	componentDidMount() {
		this.startSocket();
	}

	componentWillMount() {
		this.initCoins();
	}

	coinDetail(event) {
		console.log('Detail...');
	}

	render() {
		if (this.allLoaded() && !this.state.showDetail) {
			const stateCoins = this.state.coins;
			const allCoins = Object.keys(stateCoins).map(function (coinName, index) {
				const thisCoinInfo = stateCoins[coinName];
				const href = `/coins/${thisCoinInfo.name}`;
				return <a className="col-sm-4" key={index} href={'#'} /*onClick={instance.coinDetail}*/>
					<Coin name={thisCoinInfo.name}
						fullname={thisCoinInfo.fullname}
						usdPrice={thisCoinInfo.usdPrice}
						eurPrice={thisCoinInfo.eurPrice}
						coinDetail={false}
						diffOneDay={thisCoinInfo.diffOneDay}
						key={index} /></a>
			});
			return (
				<div className="aligner">
					<div className="row mainRow">
						{allCoins}
					</div>
				</div>
			)
		} else if (this.allLoaded() && this.state.showDetail) {
			return (<h5>Detalle...</h5>)
		} else {
			return (<h5>Loading...</h5>)
		}
	}
}