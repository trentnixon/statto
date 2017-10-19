import React from "react";
import { connect } from "react-redux";

import DisplayComposedChart from "../../Charts/ComposedChart";
		
var data = [], ShowBars;

@connect((store) =>{
		return{
			WICKETS:store.FORMGUIDE
		}
	})
export default class BattingRunsToAverage extends React.Component {
	
	createChart(chart){
		data = [];
		chart.map((game,i)=>{
			if(game.Bowling_Figures !='')
				{	data.push({TeamName:game.Against,Wickets:game.Bowling_Wickets,Runs:game.Bowling_RunsConceded}); }
			})	
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillMount(){this.createChart(this.props.WICKETS.FormGuide	);}
	componentWillUpdate(nextProps, nextState){ this.createChart(nextProps.WICKETS.FormGuide	);}
	render () {
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayComposedChart 
								Data={data} 
								title={this.props.Title}
								XAxis="TeamName"
								Bar="Wickets"
								Line="Runs"
							/>; }
			return (
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
  	}
}