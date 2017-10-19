import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
var data = [], ShowBars;

@connect((store) =>{
		return{
			RUNS:store.FORMGUIDE
		}
	})
export default class BattingScoresBar extends React.Component {
	
	createBars(Runs){
		data = [];
		Runs.map((game,i)=>{
			if(game.Batting_BallsFaced > 0){
				data.push({Team:game.Against,GameDate:game.Date, RunsScored: game.Batting_Runs});
			}
		})
	
	}
	
	componentWillMount(){ this.createBars( this.props.RUNS.FormGuide ); }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){ this.createBars(nextProps.RUNS.FormGuide ); }
	
	render () {
			
			if(data.length == 0){ ShowBars = 'Creating Bar Chart';}
			else{ ShowBars = <DisplayBarChart 
								Data={data} 
								title={this.props.Title}
								XaxisLabel="Team"
								Bars="RunsScored"
								Line2=""
								Color="#ff5b57"
							/>; }
		return (
			<div class="ShowChart"> {ShowBars} </div>
		)
	}
}