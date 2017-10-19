import React from "react";

import Stage_LineChart_Double from "../../Charts/Stage_LineChart_Single";

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
						Height={this.props.Height}
					/>
				</div>
			)
 	}
}