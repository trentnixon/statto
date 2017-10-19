import React from "react";

export default  class Scorecard_Close extends React.Component {

	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ }
	
	render () { 
			return (
					<div class="modal-footer">
						<a href="javascript:;" class="btn btn-primary" data-dismiss="modal">Close</a>
					</div>
				)
	}
}		