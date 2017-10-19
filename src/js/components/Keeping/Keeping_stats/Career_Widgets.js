import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
import Widget from "../../Global/Widget";	
	
var 	Stat_1 = 0, Stat_2=0,Stat_3=0,Stat_4=0,
		Batting_Runs_level, Batting_Average_level, Batting_Highest_level, Batting_SR; 

@connect((store) =>{
		return{
			BATTING:store.BATTING.Facts["0"],
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})

export default class BasicStats extends React.Component {
	
	componentWillMount(){ 

				var BATTING = this.props.BATTING;
				var Achievements = this.props.ACHIEVEMENTS.Display_Achievements;
				var Levels = this.props.ACHIEVEMENTS.Levels;
				
				Stat_1 = BATTING.Keeping_Games;
				Stat_2 = BATTING.Keeping_catches_career;
				Stat_3 = BATTING.Keeping_stumpings_career;
				Stat_4 = BATTING.Keeping_ranking;
				
				Batting_Runs_level = Levels[Achievements.Batting_Runs].class;
				Batting_Average_level = Levels[Achievements.Batting_Average].class;
				Batting_Highest_level = Levels[Achievements.Batting_HighestScore].class; 
				Batting_SR = Levels[Achievements.Batting_StrikeRate].class; 
				
				
	}
	render () {
			return (
				<div id="BasicStats">
					<div class="row">
						<Widget Archclass={Batting_Average_level}  heading="Career Games" icon="fa-trophy" value={Stat_1}/>
						<Widget Archclass={Batting_Runs_level}  heading="Career Catches" icon="fa-trophy" value={Stat_2}/>
						<Widget Archclass={Batting_Highest_level}  heading="Career Stumpings" icon="fa-trophy" value={Stat_3}/>
						<Widget Archclass={Batting_SR}  heading="Ranking" icon="fa-trophy" value={Stat_4}/>
					</div>
				</div>
			)
  		}
}