import React from "react";
import { connect } from "react-redux";

import DisplayLineChart from "../../Charts/LineChart";
	
var data = [], ShowBars, Average=0, Limit, BowlingRuns, OversBowled;
@connect((store) =>{
		return{
			AVERAGE:store.FORMGUIDE
		}
	})
export default class BattingAverage extends React.Component {

	createChart(chart){
		data = []
		chart.map((game,i)=>{ 
			if(game.Bowling_Figures !=''){
				data.push({TeamName:game.Against,Average:game.Bowling_OverAverage,OversBowled:game.Bowling_OversBowled});
			}
		})
	}

	componentWillMount(){this.createChart(this.props.AVERAGE.FormGuide); }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){ this.createChart(nextProps.AVERAGE.FormGuide);}
	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayLineChart 
								Data={data} 
								title={this.props.Title}
								XaxisLabel="TeamName"
								Line1="Average"
								Line2="OversBowled"
								Height={this.props.Height}
							/>; }
			return (
					<div class="ShowChart">
						{ShowBars}
					</div>
				)
  	}
}