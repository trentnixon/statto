import React from "react";
import { connect } from "react-redux";


import DisplayLineCart from "../../Charts/LineChart";
	
	
var data = [], ShowBars, average=0, totalScore=0, batted=0, notout=0, StrikeRate=0, totalBallsFaced=0;
@connect((store) =>{
		return{
			RANK:store.BATTING
		}
	})
export default class BattingRank extends React.Component {
	
	createChart(Rank){
		data = []
		Rank.map((game,i)=>{
				if(game.Batting_World_Rank != 0)
					{
						data.push({GameDate:game.Date,Rank:game.Batting_World_Rank});
						}
		})
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillMount(){ this.createChart(this.props.RANK.BattingObject); }
	componentWillUpdate(nextProps, nextState){  
		
		console.log(this.props.RANK)
		
		if(this.props.RANK.Facts["0"].Batting_World_Rank != nextProps.RANK.Facts["0"].Batting_World_Rank){
				this.createChart(nextProps.RANK.BattingObject) 
		 }
	} 
	
	
	render () {
			
			if(data.length == 0){ ShowBars = 'Creating World Rankings';}
			else{ ShowBars = <DisplayLineCart 
									Data={data} 
									title={this.props.Title}
									XaxisLabel="GameDate"
									Line1="Rank"
									Line2=""	
							/>; }
			return (
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
	}
}