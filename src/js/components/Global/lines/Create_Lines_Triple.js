import React from "react";

import Stage_LineChart_Triple from "../../Charts/Stage_LineChart_Triple";

export default class BattingAverage extends React.Component {
	
	componentWillMount(){ }
	render () {
			return (
				<div>
					<Stage_LineChart_Triple 
						Data={this.props.Data} 
						title={this.props.Title}
						XaxisLabel={this.props.XaxisLabel}
						Line1={this.props.Line1}
						Line2={this.props.Line2}
						Line3={this.props.Line3}
						Height={this.props.Height}
					/>
				</div>
			)
 	}
}