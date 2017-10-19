import React from "react";
import { connect } from "react-redux";


import DisplayLineCart from "../../Charts/LineChart";
	
	
var data = [], ShowBars, totalScore=0, TotalBallsFaced=0;

export default class BattingRunsVSBallsFaced extends React.Component {
	
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
				
				Score = parseInt(Score);
				if(isNaN(Score)){Score = 0;}
				totalScore = totalScore+Score;
				
				BallsFaced = parseInt(BallsFaced);
				if(isNaN(BallsFaced)){BallsFaced = 0;}
				TotalBallsFaced = TotalBallsFaced+BallsFaced;
				
				data.push({Date: GameDate, Runs: totalScore,BallsFaced: TotalBallsFaced, amt: Score});

			})
	}

	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayLineCart 
								Data={data} 
								title="Runs VS  Balls Faced"
								XaxisLabel="Date"
								Line1="Runs"
								Line2="BallsFaced"
							/>; }
			return (
				<div id="Chart_line"  class="col-md-6">
					{ShowBars}
				</div>
			)
  }

}