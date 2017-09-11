import React from 'react';

const coinDetailStyle = {
    display: 'block',
    color: 'white'
}
const diffOneDayStyle = {
    display: 'block',
    color: 'green'
}
export default class Coin extends React.Component {
    render() {
        if (this.props.diffOneDay < 0) {
            diffOneDayStyle.color = 'red';
        }
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
                                <span style={coinDetailStyle}>{this.props.fullname}</span>
                                <span style={coinDetailStyle}>{this.props.usdPrice} $</span>
                                <span style={coinDetailStyle}>{this.props.eurPrice} €</span>
                                <br/>
                                <span style={diffOneDayStyle}>{this.props.diffOneDay} %</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 