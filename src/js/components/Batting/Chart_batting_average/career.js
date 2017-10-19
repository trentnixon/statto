import React from "react";
import { connect } from "react-redux";

import DisplayLineCart from "../../Charts/LineChart";
	
var data = [],ShowBars;

@connect((store) =>{
		return{
			RUNS:store.BATTING
		}
	})

export default class BattingAverage extends React.Component {
	
	createChart(Average,CareerAverage)
		{
			data = []
			Average.map((game,i)=>{
				if(game.BallsFaced > 0){
					data.push({Date:game.Date,Average:game.Average,CareerAverage:CareerAverage});
				}
			})
	}
	
	componentWillMount(){ this.createChart(this.props.RUNS.BattingObject, this.props.RUNS.Facts["0"].Average); }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){  
		if(this.props.RUNS.Facts["0"].Batting_World_Rank != nextProps.RUNS.Facts["0"].Batting_World_Rank){
				this.createChart(nextProps.RUNS.BattingObject, nextProps.RUNS.Facts["0"].Average) 
		 }
	}
	
	
	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayLineCart 
								Data={data} 
								title={this.props.Title}
								XaxisLabel="Date"
								Line1="Average"
								Line2="CareerAverage"
								Height={this.props.Height}
							/>; }
			return (
				<div class="ShowChart">{ShowBars} </div>
			)
 	}
}