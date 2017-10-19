import React from "react";
import { connect } from "react-redux";


import DisplayLineCart from "../../Charts/LineChart";
	
	
var data = [], ShowBars, average=0, totalScore=0, batted=0, notout=0, StrikeRate=0, totalBallsFaced=0;

export default class BattingRank extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){

		var Player = nextProps.PlayerStats;
		
		Player.games.map((game,i)=>{
				
				var Rank = parseInt(game.meta.Batting_Rank[0]);
				var GameDate = game.meta.Date[0];
				
				if(Number.isInteger(Rank)){ 
					data.push({GameDate:GameDate,Rank:Rank,amt:StrikeRate});
				}
			})
	}

	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayLineCart 
									Data={data} 
									title="Career Rank Progress"
									XaxisLabel="GameDate"
									Line1="Rank"
									Line2=""
									
									
							/>; }
			return (
				<div id="Chart_line" class="col-md-6">
					{ShowBars}
				</div>
			)
  }

}