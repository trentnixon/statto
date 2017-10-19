import React from "react";

export default  class Scorecard_Summary extends React.Component {

	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ }
	
	render () { 
			return (
					<div class="alert alert-info fade in m-b-15">
						<p>
							<strong>{this.props.Winner}</strong> {this.props.Summary} | <span>Man of the Match {this.props.MOM}</span>
						</p>
					</div>
				)
	}
}		