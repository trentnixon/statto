import React from "react";
import { connect } from "react-redux";

import DisplayLineChart from "../../Charts/LineChart";
	
var data = [], ShowBars;

@connect((store) =>{
		return{
			AVERAGE:store.FORMGUIDE
		}
	})
export default class BattingAverage extends React.Component {
	
	createChart(chart)
		{
			data = []
			chart.map((game,i)=>{
				if(game.Batting_BallsFaced > 0)
					{
					data.push({ Date:game.Date,TeamName:game.Against, Average:parseInt(game.Batting_Average), OverallAverage:parseInt(this.props.AVERAGE.Facts["0"].Average) });
					}
			})
	}

	componentWillMount(){this.createChart(this.props.AVERAGE.FormGuide); }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){ this.createChart(nextProps.AVERAGE.FormGuide);}

	render () {
			
			if(data.length < 1){ ShowBars = 'Creating Averages';}
			else{ ShowBars = <DisplayLineChart 
								Data={data} 
								title={this.props.Title}
								XaxisLabel="Date"
								Line1="Average"
								Line2="OverallAverage"
								Height={this.props.Height}
							/>; }
			return (
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
  }

}