import React from "react";
import { connect } from "react-redux";

import {Calculate_Achievements,Set_Achievements} from "../../actions/Achievements"

// Globals

import Achievement_table from "./components/achievement_table";

var AchievmentsList=[], CareerAchievements=[],BattingAchievements=[],BowlingAchievements=[], Display_Achievements,Breakdown,TH,TD;
var DisplayGamesPlayed;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.BATTING,
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})
export default class Achievements extends React.Component {
	
	
	CreateAchievement(Data, Achievement_value, PlayerTotal){
		
		var percentageVal = Achievement_value +1;
		var Percentage = percentageVal/Data.values.length*100;
		var LevelUp = 'Level up at: ' + Data.values[percentageVal] ;
		
		if(Percentage == 100) { LevelUp='Completed'; }
		
		return(	<div >	
					<div class="col-md-6 TableHeader">{Data.label} ({PlayerTotal})</div>
					<div class="col-md-6 TableHeader">{LevelUp}</div>				
					<div class="col-md-12">
						<div class="progress progress-striped active">
							<div class={AchievmentsList[Achievement_value].class+" progress-bar"} style={{width: Percentage+'%'}}>
								{AchievmentsList[Achievement_value].name}
							</div> 
						</div>
					</div>
				</div>
			)
	}
	
	
	Create_Achievements(ACHIEVEMENTS, Player){
		
		//console.log(ACHIEVEMENTS, Player)
		
		Display_Achievements = ACHIEVEMENTS.Display_Achievements
		AchievmentsList=ACHIEVEMENTS.Levels;
		Breakdown=ACHIEVEMENTS.Breakdown;
		var Fact = Player.Facts["0"];
		
		//console.log(Display_Achievements)
		//console.log(Fact)
		
		// Career		
		var Career = Breakdown.Career;
		CareerAchievements=[
			{name:"Games Played",level:"",Data:this.CreateAchievement(Career.NumberofGames, Display_Achievements.Career_Game,Fact.GameCount)}
		]
	
		var Batting = Breakdown.Batting;
		BattingAchievements=[
			{Data:this.CreateAchievement(Batting.NumberofRuns, Display_Achievements.Batting_Runs,Fact.TotalScore )},
			{Data:this.CreateAchievement(Batting.BattingAverage, Display_Achievements.Batting_Average,Fact.Average)},
			{Data:this.CreateAchievement(Batting.BallsFaced, Display_Achievements.Balls_Faced,Fact.BallsFaced)},
			{Data:this.CreateAchievement(Batting.Notouts, Display_Achievements.Batting_NotOut,Fact.NotOuts)},
			{Data:this.CreateAchievement(Batting.Ducks, Display_Achievements.Batting_Ducks,Fact.Ducks)},
			{Data:this.CreateAchievement(Batting.LT20, Display_Achievements.Batting_LT20,Fact.LessThantwenty)},
			{Data:this.CreateAchievement(Batting.Twenties, Display_Achievements.Batting_Twenties,Fact.twenty)},
			{Data:this.CreateAchievement(Batting.Thirties, Display_Achievements.Batting_Thirties,Fact.thirty)},
			{Data:this.CreateAchievement(Batting.LMS50, Display_Achievements.Batting_50s,Fact.fifty)},
			{Data:this.CreateAchievement(Batting.LMS100, Display_Achievements.Batting_100s,Fact.hundreds)},
			{Data:this.CreateAchievement(Batting.StrikeRate200, Display_Achievements.Batting_ST200,Fact.ST200)}
		]		

		// Bowling
		var Bowling = Breakdown.Bowling;

		BowlingAchievements=[
			{Data:this.CreateAchievement(Bowling.Bowling_Wickets, Display_Achievements.Bowling_Wickets,Fact.Bowling_CareerWickets )},
			
			{Data:this.CreateAchievement(Bowling.Bowling_Average, Display_Achievements.Bowling_Average,Fact.Bowling_Average_Career )},
			{Data:this.CreateAchievement(Bowling.Bowling_Economy, Display_Achievements.Bowling_Economy,Fact.Bowling_Career_Economy_Rate )},
			{Data:this.CreateAchievement(Bowling.Bowling_StrikeRate, Display_Achievements.Bowling_Strike_Rate,Fact.Bowling_Career_StrikeRate )},
			
			{Data:this.CreateAchievement(Bowling.Bowling_Overs, Display_Achievements.Bowling_Overs,Fact.Bowling_CompleteOvers )},
			{Data:this.CreateAchievement(Bowling.Bowling_under20, Display_Achievements.Bowling_under20,Fact.Bowling_under20 )},
			{Data:this.CreateAchievement(Bowling.Bowling_Over30, Display_Achievements.Bowling_Over30,Fact.Bowling_Over30 )},
			{Data:this.CreateAchievement(Bowling.Bowling_BowledOut, Display_Achievements.Bowling_BowledOut,Fact.Bowling_BowledOut )},
			{Data:this.CreateAchievement(Bowling.Bowling_2fa, Display_Achievements.Bowling_2fa,Fact.Bowling_2fa )},
			{Data:this.CreateAchievement(Bowling.Bowling_3fa, Display_Achievements.Bowling_3fa,Fact.Bowling_3fa )},
			{Data:this.CreateAchievement(Bowling.Bowling_4fa, Display_Achievements.Bowling_4fa,Fact.Bowling_4fa )},
			{Data:this.CreateAchievement(Bowling.Bowling_5fa, Display_Achievements.Bowling_5fa,Fact.Bowling_5fa )},
		]
	}
	
	componentWillMount(){ 

		if(this.props.Player.Facts && this.props.ACHIEVEMENTS.Set == false){
			this.props.dispatch(Calculate_Achievements(this.props.Player.Facts[0],this.props.ACHIEVEMENTS.Breakdown)) 
		}
		else{
			this.Create_Achievements(this.props.ACHIEVEMENTS,this.props.Player);
		}
	}
	
	shouldComponentUpdate(NewProps, NewState){ return true;}
	componentWillUpdate(NewProps, NewState){  
		if(NewProps.Player.Facts && NewProps.ACHIEVEMENTS.Set == false){
			this.props.dispatch(Calculate_Achievements(this.props.Player.Facts[0],this.props.ACHIEVEMENTS.Breakdown)) 
		}
		else{
			this.Create_Achievements(NewProps.ACHIEVEMENTS,NewProps.Player); 
		}
	}

	render () {
			return (
				<section id="basicInfo">
					<div class="col-md-12">
							<h1 class="page-header">Achievements</h1>
					</div>
					<Achievement_table Achievements={CareerAchievements}  size="col-md-12" Title="Career Achievements"/>	
					<Achievement_table Achievements={BattingAchievements} size="col-md-4" Title="Batting Achievements"/>
					<Achievement_table Achievements={BowlingAchievements}  size="col-md-4" Title="Bowling Achievements"/>	
					<Achievement_table Achievements={CareerAchievements}  size="col-md-4" Title="Keeping Achievements"/>					
				</section>
			)
  }

}