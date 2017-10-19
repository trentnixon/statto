import React from "react";
import { connect } from "react-redux";


import DisplayComposedChart from "../../Charts/ComposedChart";
	
	
var data = [], ShowBars, average=0, totalScore=0, batted=0, notout=0, StrikeRate=0, totalBallsFaced=0, Limit,GameCount=1;

export default class BattingRunsToAverage extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){
		Limit = nextProps.Limit;
		var Player = nextProps.Player;
		
		Player.games.map((game,i)=>{
			
			if(GameCount <= Limit)
				{
					if(game.meta.Batting_BallsFaced[0] !='')
						{
					
					var didibat = 1;
					var TeamName = game.meta.Team[0];
					var BallsFaced = game.meta.Batting_BallsFaced[0];
					var GameDate = game.meta.Date[0];
					var Score =  game.meta.Batting_Runscored[0];
					
					TeamName = TeamName.replace(/'/g, " ").replace(/-/g, " ");
				
					
					/* **************************** */
					/* Batting Average
					/* ****************************** */
					// Get num Bats
					if(BallsFaced == ''){ didibat = 0; BallsFaced=0 }				
					// Not Outs
					if(Score.indexOf("*") != -1){ didibat = 0;}		
					batted = batted+didibat;
									
					// Get total Score
					Score = parseInt(Score);
					if(isNaN(Score)){Score = 0;}
					totalScore = totalScore+Score;				
									
					average = totalScore/batted;
					average = average.toFixed(2);
					average = parseInt(average)
					
					
					/* Batting Strike rate */
					
					BallsFaced = parseInt(BallsFaced);
					totalBallsFaced = totalBallsFaced+BallsFaced;
					// Strike Rate
					StrikeRate = totalScore/totalBallsFaced*100;
					StrikeRate = StrikeRate.toFixed(2);
					StrikeRate = parseInt(StrikeRate)
					
					data.push({TeamName:TeamName,RunsScored:Score,Average:average});
					GameCount++;
				}
			}
		}
	)
}

	render () {
			  
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayComposedChart 
								Data={data} 
								title={this.props.Title}
								XAxis="TeamName"
								Bar="RunsScored"
								Line="Average"
							/>; }
			return (
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
  }

}