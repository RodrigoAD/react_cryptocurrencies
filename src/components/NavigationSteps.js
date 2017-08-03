import React from 'react';

import First from './First.js';
import Second from './Second.js';
import Third from './Third.js';

// class Title extends React.Component {
//     render () {
//         return (
//             <h1>{this.props.title}</h1>
//         )
//     }
// }

export default class NavigationSteps extends React.Component {
    constructor () {
        super();
        this.state = {
            step: 1,
            title: 'Bienvenido'
        };
        this.changeTitle = this.changeTitle.bind(this);

        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.firstStep = this.firstStep.bind(this);
    }

    nextStep () {
        this.setState({ step: this.state.step + 1 });
    }

    previousStep () {
        this.setState({ step: this.state.step - 1 });
    }

    firstStep () {
        this.setState({ step: 1 });
    }
    changeTitle (event) {
        const title = event.target.value;
        this.setState({ title });
    }

    render () {
        const step = this.state.step;
        switch (step) {
            case 1:
                return (
                    <First nextStep={this.nextStep} previousStep={this.previousStep} />
                )
            case 2:
               return (
                    <Second nextStep={this.nextStep} previousStep={this.previousStep} />
                )
            case 3:
                return (
                    <Third nextStep={this.nextStep} previousStep={this.previousStep} />
                )
            default: 
                break;
        }
    }
}

