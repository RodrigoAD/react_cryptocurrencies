import React from 'react';
import ReactDOM from 'react-dom';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';

import MainCrypto from './components/MainCrypto';
// import Coin from './components/Coin';
// import NavigationSteps from './components/NavigationSteps';

ReactDOM.render(
    // <Router>
    //     <div>
    //         <Route exact path="/" component={MainCrypto}/>
    //         <Route exact path="/coins/BTC" component={Coin}/>
    //         <Route exact path="/coins/ETH" component={Coin}/>
    //     </div>
    // </Router>,
    <MainCrypto/>,
    document.getElementById('root')
);
