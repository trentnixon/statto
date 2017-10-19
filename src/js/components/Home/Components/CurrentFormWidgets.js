import React from "react";
import {  Link } from 'react-router-dom';
import { connect } from "react-redux";
	
import Widget from "../../Global/Widget";	
	
let GamesPlayed=0, TotalRun=0, batted=0,Average=0, TotalWickets = 0, Limit=0, bowlingRuns=0, BowlingAverage=0,bRuns=0, GameCount=1,Career_level ,Batting_Runs_level,Batting_Average_level,Wickets_level, Economy_level, Facts, Achievements, Levels;	
	
	
@connect((store) =>{
		return{
			FORMGUIDE:store.FORMGUIDE,
			ACHIEVEMENTS: store.ACHIEVEMENTS,
			UI: store.UI,
		}
	})	
export default class HomePageTopWidgets extends React.Component {

	createWidgets(Facts,Achievements,Levels){
		if(Achievements && Facts){
				
				TotalRun = Facts["0"].TotalRuns;
				Average = Facts["0"].Average;
				TotalWickets= Facts["0"].WicketsTaken;
				BowlingAverage = Facts["0"].BowlingAverage;
				
				Batting_Runs_level = Levels[Achievements.Batting_Runs].class;
				Batting_Average_level = Levels[Achievements.Batting_Average].class;
				Wickets_level = Levels[Achievements.Bowling_Wickets].class;
				Economy_level = Levels[Achievements.Bowling_Economy].class;
				
			}
		
	}  
  
  componentWillMount(){
		this.createWidgets(this.props.FORMGUIDE.Facts,this.props.ACHIEVEMENTS.Display_Achievements,this.props.ACHIEVEMENTS.Levels)
	  }  
	componentWillUpdate(nextProps, nextState){ 
		this.createWidgets(nextProps.FORMGUIDE.Facts,nextProps.ACHIEVEMENTS.Display_Achievements,nextProps.ACHIEVEMENTS.Levels)
	}
	
  render() {
  
	return (
		<div class="row">
			<Widget Archclass={Batting_Runs_level} heading="Total Runs" icon="fa-user" value={TotalRun} Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/total-runs"}/>
			<Widget Archclass={Batting_Average_level}heading="Batting Average" icon="fa-star" value={Average} Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/career-at-bat"}/>
			<Widget Archclass={Wickets_level} heading="Wickets Taken" icon="fa-fire" value={TotalWickets} Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/wickets"}/>
			<Widget Archclass={Economy_level} heading="Economy" icon="fa-trophy" value={BowlingAverage} Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/economy"}/>
		</div>
    );
  }
}