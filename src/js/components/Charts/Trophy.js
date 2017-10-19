import React from "react";

export default  class Trophy extends React.Component {
	
	render(){
			return(
					<div class={this.props.TrophyClass}>
						<i class="fa fa-trophy" aria-hidden="true"></i>
					</div>
			)
		}
	}	