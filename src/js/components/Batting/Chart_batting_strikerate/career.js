import React from "react";
import { connect } from "react-redux";

import DisplayLineCart from "../../Charts/LineChart";
	
var data = [], ShowBars; 
@connect((store) =>{
		return{
			STRIKERATE:store.BATTING
		}
	})
export default class BattingStrikeRate extends React.Component {
	
	createChart(SR){

		var StrikeRate = SR.BattingObject;
		var TotalBalls = SR.Facts["0"].BallsFaced;
		var TotalScore = SR.Facts["0"].TotalScore
		var CareerStrikeRate = TotalScore/TotalBalls*100;
	
		data = []
		
		StrikeRate.map((game,i)=>{
				data.push({Date:game.Date,StrikeRate:game.StrikeRate,CareerStrikeRate:CareerStrikeRate});
			})
	 }
	 
	 
	componentWillMount(){ this.createChart(this.props.STRIKERATE); }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){  
		
		if(this.props.STRIKERATE.Facts["0"].Batting_World_Rank != nextProps.STRIKERATE.Facts["0"].Batting_World_Rank){
				this.createChart(nextProps.STRIKERATE) 
		 }
	} 
	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayLineCart 
								Data={data} 
								title="Career Strike Rate"
								XaxisLabel="Date"
								Line1="StrikeRate"
								Line2=""
							/>; }
			return (
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
	}
}