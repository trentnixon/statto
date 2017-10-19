import React from "react";

export default  class Scorecard_Header extends React.Component {

	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ }
	
	render () { 
			return (
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
							<h4 class="modal-title">{this.props.TeamA} vs {this.props.TeamB}</h4>
							<h6>{this.props.Venue} - {this.props.Umpire}</h6>
					</div>
				)
	}
}		