import React from "react";
import { connect } from "react-redux";
import {  Link } from 'react-router-dom';
	
import Widget from "../../Global/Widget";	
	
let  Stats, GamesPlayed=0, totalScore=0, batted=0,Average=0, totalWickets = 0, Career_level ,Batting_Runs_level,Batting_Average_level,Wickets_level, Achievements, Levels;	
	
@connect((store) =>{
		return{
			BATTING:store.BATTING.Facts,
			ACHIEVEMENTS: store.ACHIEVEMENTS,
			UI: store.UI,
		}
	})	
export default class HomePageTopWidgets extends React.Component {
  constructor() { super();  }
 
 createWidgets(Stats,Achievements,Levels){

		if(Achievements && Stats)
			{
				
				GamesPlayed = Stats["0"].GameCount; 
				Average = Stats["0"].Average;
				totalScore = Stats["0"].TotalScore;
				totalWickets = Stats["0"].Bowling_CareerWickets;
		
				Career_level = Levels[Achievements.Career_Game].class;
				Batting_Runs_level = Levels[Achievements.Batting_Runs].class;
				Batting_Average_level = Levels[Achievements.Batting_Average].class;
				Wickets_level = Levels[Achievements.Bowling_Wickets].class;			
		}
}
	
 componentWillMount(){
	 	Stats = this.props.BATTING;
		Achievements = this.props.ACHIEVEMENTS.Display_Achievements;
		Levels = this.props.ACHIEVEMENTS.Levels;
		
		this.createWidgets(Stats,Achievements,Levels)
	 }
 
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ 
 		 Stats = nextProps.BATTING;
		Achievements = nextProps.ACHIEVEMENTS.Display_Achievements;
		Levels = nextProps.ACHIEVEMENTS.Levels;
		
		this.createWidgets(Stats,Achievements,Levels)
  		
   }
  
  render() {
	return (
		<div>
			<Widget  Archclass={Career_level} heading="Games Played" icon="fa-trophy" value={GamesPlayed} Link={"/"+this.props.UI.PLAYER.LMSID+"/history"} />
			<Widget  Archclass={Batting_Runs_level} heading="Total Runs" icon="fa-user" value={totalScore} Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/total-runs"}/>
			<Widget  Archclass={Batting_Average_level} heading="Batting Average" icon="fa-star" value={Average} Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/career-at-bat"}/>
			<Widget  Archclass={Wickets_level} heading="Wickets Taken" icon="fa-fire" value={totalWickets} Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/wickets"}/>
		</div>
    );
  }
}