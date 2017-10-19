import React from "react";

import Stage_LineChart_Double from "../../Charts/Stage_LineChart_Double";

export default class BattingAverage extends React.Component {
	
	componentWillMount(){ }
	render () {
			return (
				<div>
					<Stage_LineChart_Double 
						Data={this.props.Data} 
						title={this.props.Title}
						XaxisLabel={this.props.XaxisLabel}
						Line1={this.props.Line1}
						Line2={this.props.Line2}
						Height={this.props.Height}
					/>
				</div>
			)
 	}
}