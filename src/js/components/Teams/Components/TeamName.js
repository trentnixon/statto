import React from "react";

let DisplayTeamName='Searching...';
export default class TeamName extends React.Component {

	findTeamName(Teams, ID)
		{
			if(Teams != false)
				{
					DisplayTeamName = Teams.map((team,i)=>{
						if(team.teamid == ID)
							return( team.team)
						})
			}
	}
  componentWillMount(){ this.findTeamName(this.props.Teams, this.props.CurrentID)}
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ this.findTeamName(nextProps.Teams, nextProps.CurrentID) }
  
  render() {
	return (
		<div>
			<h1 class="page-header">{ DisplayTeamName }</h1>
		</div>	
    );
  }
}