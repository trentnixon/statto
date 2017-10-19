import React from "react";

import Team_Loading_UI_Widget from "./Components/Team_Loading_UI_Widget";
// import actions
import {Team_ready_index, StoreTeams, SelectedTeamID, FetchScorecards, Team_ready_complete} from '../../actions/';

// Import Comp
import TeamName from "./Components/TeamName";


let TeamID,Ready;	
export default class Fetching_Team extends React.Component {

	SyncTeam(TeamID){
		// Distpatch to Reducer
		SelectedTeamID(TeamID);	
		StoreTeams(TeamID);	
  	}
		
  	TeamID(id){ TeamID=id }

	TeamReadyIndex(state){ team_ready_index(state); }

  	componentWillMount(){ 
	
		// Index Ready
		Team_ready_index(true);
  		// Store Fetch ID
		this.TeamID(this.props.match.params.teamid)
		
	}
  	
	shouldComponentUpdate(nextProps, nextState){ return true;}
  	
	componentWillUpdate(nextProps, nextState){ 
  		
		Ready = nextProps.MYTEAMS.ready;
		// console.log(Ready)
  		// Store Fetch ID
		this.TeamID(nextProps.match.params.teamid)
		// Collect Team ID
		if(Ready.index == true && Ready.id == false)
			{ SelectedTeamID(nextProps.match.params.teamid); Team_ready_index(true); }
		// Collect Team Data
		if(Ready.id == true && Ready.team == false)
			{ StoreTeams(nextProps.match.params.teamid); }
		
		if(Ready.team == true && Ready.scorecards == false)
			{ FetchScorecards(this.props.MYTEAMS.SelectedTeam, this.props.MYTEAMS.SelectedTeamID)}
			
		if(Ready.scorecards == true && Ready.complete == false)	
			{ 
			//	console.log(this.props.MYTEAMS.SelectedScorecards, this.props.MYTEAMS.SelectedScorecards.length)
				if(this.props.MYTEAMS.SelectedScorecards.length > 0)
					{
						Team_ready_complete(true)
						console.log("If the length of the scorecards is more than 0 then. Start up Complete")
				}
				else if( this.props.MYTEAMS.SelectedScorecards.length == 0 )
					{
						FetchScorecards(this.props.MYTEAMS.SelectedTeam, this.props.MYTEAMS.SelectedTeamID)
				}
		}
		if(Ready.scorecards == true && Ready.complete == true)
			{
				console.log("Process Complete")
			}
	}
  
  render() {
	return (
		<div>
			<section id="basicInfo">
				<div class="row">	
					<div class="col-md-12">
							<h1 class="page-header">Fetching Details for:</h1>
					</div>	
				</div>
				<div class="row">
						<div class="panel panel-inverse" data-sortable-id="ui-widget-2">
                        	<div class="panel-heading">    
                            	<TeamName Teams={this.props.MYTEAMS.Teams} CurrentID={TeamID}/>
                        	</div>
                        	<div class="panel-body">
								<Team_Loading_UI_Widget title="Team ID:" value={this.props.MYTEAMS.SelectedTeamID} />
								<Team_Loading_UI_Widget title="Results Found:" value={this.props.MYTEAMS.SelectedTeam.length} />
								<Team_Loading_UI_Widget title="Scorecards Found:" value={this.props.MYTEAMS.SelectedScorecards.length} />
                     		</div>
                    	</div>
					</div>
				</section>
		</div>	
    );
  }
}