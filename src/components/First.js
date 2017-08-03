import React from 'react';


export default class First extends React.Component {
    render() {
        return (
            <div className="aligner">
                
                <div className="menu-button-container">
					<button className='btn btn-default' onClick={this.props.resetToFirstStep}>Menu</button>
				</div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <p className="centered">Primera Pagina</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="centered">
                                <button className="btn btn-default" onClick={this.props.nextStep}><i className="fa fa-arrow-right fa-2x"></i></button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
} 