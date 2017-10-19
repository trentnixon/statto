import React from "react";
import { connect } from "react-redux";

import DisplayStackedBarChart from "../../Charts/StackedBarChart";

var data = [];
@connect((store) =>{
		return{
			UI: store.UI,
			BOWLING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	componentWillMount(){
		/*
		var Wickets = this.props.BOWLING.BattingObject;
		data = []
		Wickets.map((game,i)=>{
				if(game.Bowling_BallsBowled > 0)
					{
						//{name: 'Page A', uv: 4000, pv: 2400, amt: 2400}
						data.push({Team:game.Against,Runs:game.Bowling_RunsConceded,Wickets:game.Bowling_WicketsTaken});		
				}	
		})
	
	*/
	}
	render () {	
			return (
				<div id="Stage">
					<DisplayStackedBarChart 
						Data={this.props.Data} 
						title={this.props.Title}
						XaxisLabel={this.props.XaxisLabel}
						Bar1={this.props.Bar1}
						Bar2={this.props.Bar2}
						Height={this.props.Height}	
					/>
				</div>
			)
	}
}