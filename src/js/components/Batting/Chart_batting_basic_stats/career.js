import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
import Widget from "../../Global/Widget";	
	
var CareerRuns = 0, HighestScore=0,CareerAverage=0,CareerStrikeRate=0,Batting_Runs_level,Batting_Average_level,Batting_Highest_level, Batting_SR; 

@connect((store) =>{
		return{
			BATTING:store.BATTING.Facts["0"],
			ACHIEVEMENTS: store.ACHIEVEMENTS,
			UI: store.UI,
		}
	})

/*
	I believe there is a refresh bug in here. 
	The achievements reducer is not being called early enough to populate the store!
*/
export default class BasicStats extends React.Component {

	createWidgets(BATTING,Achievements,Levels){

		if(Achievements && BATTING){
				
				CareerRuns = BATTING.TotalScore;
				HighestScore = BATTING.HighestScore;
				CareerAverage = BATTING.Average;
				CareerStrikeRate = BATTING.StrikeRate;
				
				Batting_Runs_level = Levels[Achievements.Batting_Runs].class;
				Batting_Average_level = Levels[Achievements.Batting_Average].class;
				Batting_Highest_level = Levels[Achievements.Batting_HighestScore].class; 
				Batting_SR = Levels[Achievements.Batting_StrikeRate].class; 
			}
	}

	componentWillMount(){
		this.createWidgets(this.props.BATTING,this.props.ACHIEVEMENTS.Display_Achievements,this.props.ACHIEVEMENTS.Levels)
	  }  
	shouldComponentUpdate(nextProps, nextState){ return true;}  
	
	componentWillUpdate(nextProps, nextState){
		this.createWidgets(nextProps.BATTING,nextProps.ACHIEVEMENTS.Display_Achievements,nextProps.ACHIEVEMENTS.Levels)
	}
	render () {
			return (
				<div id="BasicStats">
					<div class="row">
						<Widget Archclass={Batting_Runs_level}  heading="Career Runs" icon="fa-trophy" value={CareerRuns}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/total-runs"}/>
						<Widget Archclass={Batting_Highest_level}  heading="Highest Score" icon="fa-trophy" value={HighestScore}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/high-scores"}/>
						<Widget Archclass={Batting_Average_level}  heading="Batting Average" icon="fa-trophy" value={CareerAverage}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/"}/>
						<Widget Archclass={Batting_SR}  heading="Strike Rate" icon="fa-trophy" value={CareerStrikeRate}
						Link={"/"+this.props.UI.PLAYER.LMSID+"/batting/balls-faced"}/>
					</div>
				</div>
			)
  		}
}