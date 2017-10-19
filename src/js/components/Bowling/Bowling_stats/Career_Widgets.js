import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
import Widget from "../../Global/Widget";	
	
var CareerWickets = 0, BestBowling=0,Career_Economy_Rate=0,CareerStrikeRate=0,Bowling_Wickets_level,Bowling_Economy_level,Bowling_Strike_Rate; 

@connect((store) =>{
		return{
			BATTING:store.BATTING.Facts["0"],
			ACHIEVEMENTS: store.ACHIEVEMENTS,
			UI: store.UI,
		}
	})

export default class BasicStats extends React.Component {
	
	componentWillMount(){ 

				var BATTING = this.props.BATTING;
				var Achievements = this.props.ACHIEVEMENTS.Display_Achievements;
				var Levels = this.props.ACHIEVEMENTS.Levels;
				
				CareerWickets = BATTING.Bowling_CareerWickets;
				BestBowling = BATTING.Bowling_Best;
				Career_Economy_Rate = BATTING.Bowling_Career_Economy_Rate;
				CareerStrikeRate = BATTING.Bowling_Career_StrikeRate;
				
				console.log(Achievements)
				Bowling_Wickets_level = Levels[Achievements.Bowling_Wickets].class;
				Bowling_Economy_level = Levels[Achievements.Bowling_Economy].class;
				Bowling_Strike_Rate = Levels[Achievements.Bowling_Strike_Rate].class; 
				
				
	}
	render () {
			return (
				<div id="BasicStats">
					<div class="row">
						<Widget Archclass={Bowling_Wickets_level}  heading="Career Wicket" icon="fa-trophy" value={CareerWickets}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/wickets"}/>
						<Widget Archclass={Bowling_Wickets_level}  heading="Best Bowling" icon="fa-trophy" value={BestBowling}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/bowled"}/>
						<Widget Archclass={Bowling_Economy_level}  heading="Economy" icon="fa-trophy" value={Career_Economy_Rate}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/economy"}/>
						<Widget Archclass={Bowling_Strike_Rate}  heading="Strike Rate" icon="fa-trophy" value={CareerStrikeRate}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/bowling/strikerate"}/>
					</div>
				</div>
			)
  		}
}