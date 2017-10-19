import React from "react";
import { connect } from "react-redux";
var _ = require('lodash');

// import actions
import {SelectedTeamID, Clear_Reducer} from '../../actions/';

// import Compoennts
import Team_Stage from "./Team_Stage";
import Fetch_Teams from "./Fetch_Teams";

let CreateUI;

@connect((store) =>{
		return{
			MYTEAMS:store.MYTEAMS
		}
	})
export default class Teams extends React.Component {
	
  componentWillMount(){ CreateUI=<Fetch_Teams {...this.props}/>  } 
 
  shouldComponentUpdate(nextProps, nextState){ return true;}
  
  componentWillUpdate(nextProps, nextState){ 
		if(nextProps.match.params.teamid != nextProps.MYTEAMS.SelectedTeamID)
			{  
				// Clear out Reducer for new team
				Clear_Reducer(true);
				// Set Reducer ID
				SelectedTeamID(nextProps.match.params.teamid); 
		 }
	
		// console.log(nextProps.MYTEAMS.ready)
		if(nextProps.MYTEAMS.ready.complete == false)
			{   CreateUI=<Fetch_Teams {...nextProps} />; }
		else if(nextProps.MYTEAMS.ready.complete == true)
			{	CreateUI=<Team_Stage {...nextProps} /> }
		
}
  
  render() {
	return (
			<div>{CreateUI}</div>
    );
  }
}