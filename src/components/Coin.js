import React from 'react';

const coinDetail = {
    display: 'block',
    color: 'white'
}

export default class Coin extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="coinContainer">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <h1 className="centered" id="coinName">{this.props.name}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="centered">
                                <span style={coinDetail}>{this.props.fullname}</span>
                                <span style={coinDetail}>{this.props.usdPrice} $</span>
                                <span style={coinDetail}>{this.props.lastUpdate}</span>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 