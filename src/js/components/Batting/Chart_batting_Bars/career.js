import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
var data = [], ShowBars, Limit=0, GameCount=1,didibat = 0;
@connect((store) =>{
		return{
			RUNS:store.BATTING
		}
	})
export default class BattingScoresBar extends React.Component {
	
	
	createBars(Runs){
		data = [];
		Runs.map((game,i)=>{
				if(game.BallsFaced > 0){
					data.push({Team:game.Against,GameDate:game.Date, RunsScored: game.Runs_parsed});
				}
		})
	}

	componentWillMount(){ this.createBars( this.props.RUNS.BattingObject ); }
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){ 
		if(this.props.RUNS.Facts["0"].Batting_World_Rank != nextProps.RUNS.Facts["0"].Batting_World_Rank){	
			this.createBars(nextProps.RUNS.BattingObject ); 
		}
	}
	
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
				<div class="ShowChart">
					{ShowBars}
				</div>
			)
	}
}