import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
	
var BattingAverage=0, totalScore=0, numbat=0,notout=0, totalBallsFaced=0, StrikeRate=0, fifty=0, hundreds=0, HighestScore=0, Ducks=0,AverageInnings=0;

export default class BasicStats extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){

		var Player = nextProps.PlayerStats;
		
		/****
			When i have time.. put all of these stats through a reducer
		****/
		Player.games.map((game,i)=>{
				var didibat = 1;
				var Score =  game.meta.Batting_Runscored[0];
				var BallsFaced = game.meta.Batting_BallsFaced[0];
				var TeamName = game.meta.Team[0];
			
				// NOt Outs
				if(Score.indexOf("*") != -1){ notout = notout+1;}
				
				
				// Total Score
				Score = parseInt(Score);
				if(isNaN(Score)){Score = 0;}
				totalScore = totalScore+Score;

				// Ducks
				if(Score == 0){ if(BallsFaced > 0){Ducks = Ducks +1;}}

				
				// Num Bat
				if(BallsFaced == ''){didibat = 0; BallsFaced=0}				
				numbat = numbat+didibat;
				
				// Batting Average	
				AverageInnings = numbat-notout;		
				BattingAverage = totalScore/AverageInnings;
				BattingAverage = BattingAverage.toFixed(2);
				
				
				// Total BallsFaces
				BallsFaced = parseInt(BallsFaced);
				totalBallsFaced = totalBallsFaced+BallsFaced;
				
				// Strike Rate
				StrikeRate = totalScore/totalBallsFaced*100;
				StrikeRate = StrikeRate.toFixed(2);
				
				// More then 50
				if(Score > 49){ fifty = fifty +1; }
				// More then 100
				if(Score > 100){ hundreds = hundreds +1; }
				// Highest Score
				if(Score > HighestScore){ HighestScore = Score;}
				
				
			})
	}

	render () {
			
			return (
				<div id="BasicStats">
					<ul class="BasicStats">
						<li>Career Runs : {totalScore}</li>
						<li>Batting Average : {BattingAverage}</li>
						<li>Career Bats: {numbat}</li>
						<li>Total Balls Faced: {totalBallsFaced}</li>
						<li>Strike Rate : {StrikeRate}</li>
						<li>Highest Score : {HighestScore} </li>
						<li>Not out: {notout}</li>
						<li>Ducks : {Ducks}</li>
						<li>50s :{fifty}</li>
						<li> 100s : {hundreds}</li>
						
					</ul>	
				</div>
			
			
			)
  }

}