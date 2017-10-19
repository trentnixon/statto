import React from "react";
import { connect } from "react-redux";


import DisplayLineCart from "../../Charts/LineChart";
	
	
var data = [], ShowBars;

export default class BattingRunsToBallsFaced extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){

		var Player = nextProps.PlayerStats;
		
		Player.games.map((game,i)=>{
				
				var TeamName = game.meta.Team[0];
				var BallsFaced = game.meta.Batting_BallsFaced[0];
				var GameDate = game.meta.Date[0];
				TeamName = TeamName.replace(/'/g, " ").replace(/-/g, " ");
				var Score =  game.meta.Batting_Runscored[0];
				
				// if no balls faced then DNB
				if(game.meta.Batting_BallsFaced[0] != '')
					{
						if(Score == ''){Score=0;} else{Score = parseInt(Score);}
						data.push({Date: GameDate, Runs: Score,Balls: BallsFaced});
						}
			})
	}

	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayLineCart 
								Data={data} 
								title="Runs to Balls Faced"
								XaxisLabel="Date"
								Line1="Runs"
								Line2="Balls"
							/>; }
			return (
				<div id="Chart_line"  class="col-md-6">
					{ShowBars}
				</div>
			)
  }

}