import React from 'react';
import axios from 'axios';

import Coin from './Coin.js';
// It simply creates an object to insert in reactive vars
const buildCoinInfo = function (name, fullname, usdPrice, lastUpdate, diffOneDay) {
	return { name, fullname, usdPrice, lastUpdate, diffOneDay };
}

export default class MainCrypto extends React.Component {
    constructor () {
        super();

        this.state = {
            coins: [{
                name: '',
                fullname: '',
                usdPrice: '',
                lastUpdate: '',
                diffOneDay: '',
                url: 'BTC',
            }, {
                name: '',
                fullname: '',
                usdPrice: '',
                lastUpdate: '',
                diffOneDay: '',
            }, {
                name: '',
                fullname: '',
                usdPrice: '',
                lastUpdate: '',
                diffOneDay: '',
            }],
            BTC: {
                name: '',
                fullname: '',
                usdPrice: '',
                lastUpdate: '',
                diffOneDay: '',
            },
            ETH: {
                name: '',
                fullname: '',
                usdPrice: '',
                lastUpdate: '',
                diffOneDay: '',
            },
            XRP: {
                name: '',
                fullname: '',
                usdPrice: '',
                lastUpdate: '',
                diffOneDay: '',
            },
            allLoaded: false,
            showDetail: false,
        }

        this.coinDetail.bind(this);
    }

    componentDidMount() {
        const instance = this;

        const io = require('socket.io-client');
        const socket = io.connect('http://socket.coincap.io');

        socket.on('trades', (data) => {
            const coinName = data.message.coin;
            const msg = data.message.msg;
            // Differ from BTC,ETH and XRP
            switch (coinName) {
                case 'BTC':
                    instance.setState({ BTC: buildCoinInfo(msg.short, msg.long, msg.price, msg.time, '') });
                    break;
                case 'ETH': 
                    instance.setState({ ETH: buildCoinInfo(msg.short, msg.long, msg.price, msg.time, '') });
                    break;
                case 'XRP':
                    instance.setState({ XRP: buildCoinInfo(msg.short, msg.long, msg.price, msg.time, '') });
                    break;
            }
        });
        
    }

    componentWillMount() {
        const instance = this;
        const coinsLoad = [false, false, false];
        function allLoaded() {
            let response = 0;
            coinsLoad.forEach(function (e) {
                if (e) response++;
            });
            return response === 3;
        }
        // BTC call
        axios.get('https://www.coincap.io/page/BTC').then(function (response) {
            const coins = instance.state.coins;
            const coinInfo = buildCoinInfo(response.data.short, response.data.long, response.data.usdPrice, response.data.time, '');
            coins[0] = coinInfo;
            instance.setState({ coins });
            coinsLoad[0] = true;
            if (allLoaded()) instance.setState({ allLoaded: true });
        });
        // ETH Call
        axios.get('https://www.coincap.io/page/ETH').then(function (response) {
            const coins = instance.state.coins;
            const coinInfo = buildCoinInfo(response.data.short, response.data.long, response.data.usdPrice, response.data.time, '');
            coins[1] = coinInfo;
            instance.setState({ coins });
            coinsLoad[1] = true;
            if (allLoaded()) instance.setState({ allLoaded: true });
        });
        // XRP Call
        axios.get('https://www.coincap.io/page/XRP').then(function (response) {
            const coins = instance.state.coins;
            const coinInfo = buildCoinInfo(response.data.short, response.data.long, response.data.usdPrice, response.data.time, '');
            coins[2] = coinInfo;
            instance.setState({ coins });
            coinsLoad[2] = true;
            if (allLoaded()) instance.setState({ allLoaded: true });
        });
    }

    coinDetail (event) {
        console.log('trololo');
    }

    render () {
        if (this.state.allLoaded && !this.state.showDetail) {
            const instance = this;
            const allCoins = this.state.coins.map(function (coinInfo, index) {
                const href = `/coins/${coinInfo.name}`;
                return <a href={href} key={index} onClick={instance.coinDetail}><Coin name={coinInfo.name}
                        fullname={coinInfo.fullname}
                        usdPrice={coinInfo.usdPrice}
                        lastUpdate={coinInfo.lastUpdate} 
                        coinDetail={instance.coinDetail} 
                        key={index} /></a>
            });
            return (
                <div className="aligner">
                    {allCoins}
                </div>
            )
        } else if (this.state.allLoaded && this.state.showDetail) {
            return (<h5>Detalle...</h5>)
        } else {
            return (<h5>Loading...</h5>)
        }
    }
}