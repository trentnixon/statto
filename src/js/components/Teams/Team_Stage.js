import React from "react";
import { connect } from "react-redux";
var _ = require('lodash');


import TeamName from "./Components/TeamName";
// Col-8
import Player_Roster from "./Components/player_roster";
import Todolist from "./Components/todolist";
// Col-4
import Fetch_Missing_Games from "./Components/Fetch_Missing_Games";
import Variable_Filter_Results from "./Components/Variable_Filter_Results";
import TeamWinLoseRatio from "./Components/TeamWinLoseRatio";	
import Variables from "./Components/Variables";	




let Filtered_Game_IDs=[],Updated_Game_Results=[], Filtered_Scorecards=[], Filtered_Results=[], Store_Filtered_Cards=[], Hold_Filtered_Cards=[],i;
export default class Team_Stage extends React.Component {

 constructor(props) {
		super(props);
		this.state = {
		  Filtered_Results:false,
		};
	  }
	  	
 checkGrade(game,grade)
		{
			if(grade != '*') {if(game.Grade == grade){ return true; }else{ return false;}
			}else{ return true }
	}
	
	checkYear(game,year)
		{
			// split game date
			let FindYear = game.GameDate.split('/');
			if(year != '*') {if(FindYear[2] == year){ return true; }else{ return false;}
			}else{ return true }
	}
	


	FilterScorecards(Filtered_IDS, Scorecards)
		{
			Filtered_Scorecards=[], Updated_Game_Results=[], Filtered_Results=[],Hold_Filtered_Cards=[],Store_Filtered_Cards=[], i=0;
			
			Filtered_IDS.map((id,i)=>{
				var index = _.findIndex(Scorecards, {Gameid: id.GameID});
				//
				if(index != -1){
					Hold_Filtered_Cards.push(Scorecards[index]);
				}
			})
			
			Filtered_Results.push({Filtered_Scorecards:Hold_Filtered_Cards});
			Filtered_Results.push({Filtered_IDS:Filtered_IDS});
	
			//return Filtered_Results, Amend State to rerender 
			this.setState({ Filtered_Results: Filtered_Results});
			
	}

	FilterResults(MyTeam){

		Filtered_Game_IDs=[] ;
		
		MyTeam.SelectedTeam.map((game,i)=>{
			
			if(this.checkGrade(game,MyTeam.grade) == true && 
			   this.checkYear(game,MyTeam.year) == true )
				{ Filtered_Game_IDs.push(game); }

		})	
		
		this.FilterScorecards(Filtered_Game_IDs,MyTeam.SelectedScorecards)
	
	}

	componentWillMount(){ 
  		if(this.state.Filtered_Results == false){this.FilterResults(this.props.MYTEAMS); console.log("Team Stage Mounted")}
  	}
  	shouldComponentUpdate(nextProps, nextState){ return true;}
  	componentWillUpdate(nextProps, nextState){
		
	    if(this.state.Filtered_Results == false ||
			nextProps.MYTEAMS.grade != this.props.MYTEAMS.grade ||
			nextProps.MYTEAMS.year != this.props.MYTEAMS.year
		){this.FilterResults(nextProps.MYTEAMS); console.log("Team Stage Updated")}
		// Update if the filters change
		
  	}
  
  render() {
	  	
		// Send TeamResults to Components
		// COmponents to filter games by
		/*
			GameDate"12/08/17"
			GameID:"195136"
			GameResult:"W"
			Gamepoints:"16"
			Grade:"A Grade"
			OppoID:"7730"
			OppoName:"The Primary Club of Australia"
			TeamRank:"55"
			first:"131"
			second:"127"
		*/
	  
	return (
		<div>	
				<div class="col-md-3 col-sm-12">
					
					<TeamName Teams={this.props.MYTEAMS.Teams} CurrentID={this.props.MYTEAMS.SelectedTeamID}/>
					<Fetch_Missing_Games Results={this.state.Filtered_Results} />
					<Variable_Filter_Results {...this.props} />
					<Variables Results={this.state.Filtered_Results} />
					<TeamWinLoseRatio Results={this.state.Filtered_Results} {...this.props}/>

				</div>
				
				<div class="col-md-9 col-sm-12">
					<Player_Roster Results={this.state.Filtered_Results} />
					<Todolist />
				</div>
				
		</div>	
    );
  }
}