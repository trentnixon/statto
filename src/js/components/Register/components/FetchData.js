import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

import {AddGameArrayToWP} from "../../../actions/";
import {FindPlayersStats, SetLiveStats, CreateUserUI} from "../../../actions/";
import {Calculate_Achievements,Set_Achievements} from "../../../actions/Achievements"

import RegisterTimer from "./RegisterTimer";

let Searching= <MuiThemeProvider><CircularProgress size={15} thickness={2} /></MuiThemeProvider>;
let Collecting = 'Collecting Games';
let Percentage;
let WarningText = 'Searching LMS for game data. Please note this process will take a few minutes. Please do not close the browser';
let APPURL = <Link to="/" class="btn btn-success btn-block btn-lg">Registration Complete</Link>


@connect((store) =>{
		return{
			UI: store.UI,
		}
	})
export default class LoginHeader extends React.Component {

	constructor() { 
		super();
		this.state = {
			GamesFound:0,
			GamesAdded:0,
			ShowUI:false,
			Search:Searching,
			Next:'',
		};
	  }
	  
	 
	/* ******************* */
	/* Fetch Players WP Details and set up the UI
	/* ******************* */

	FetchNewRegisteredPlayer(UserID) {
	
	
		console.log('Fetch DATA', UserID)
		const request = axios.get("/lms/ajax/FetchPlayerDetails.php?UserID="+UserID);
		request.then(({data}) =>{ 
				console.log('Player WP ID', data)
				this.props.dispatch(FindPlayersStats(data.UserID));
				this.props.dispatch(CreateUserUI(data));
				this.props.dispatch(SetLiveStats());		
				
		});
	}

	/* ********************* */
	/* Fetch data from LMS */
	/* Pass Array to Action for parsing */
	/* ************************** */

	FetchPlayerData(userID){
		
		const request = axios.get("/lms/ajax/RegisterNewPlayerData.php?UserID="+userID);
	
		request.then(({data}) =>{ 
			this.props.dispatch(AddGameArrayToWP(data));
		}); 
	}

 	componentWillMount(){ 
		// Fecth Player Game Data
		this.FetchPlayerData(this.props.Player.LMSID)	
		
		
	}	
	shouldComponentUpdate(NewProps, NewState){ return true;}

	componentWillUpdate(NewProps, NewState){
		
		if(this.state.GamesAdded != NewProps.UI.Register.GamesAdded)
			{
				
				this.setState({
					GamesFound:NewProps.UI.Register.FoundGames,
					GamesAdded:NewProps.UI.Register.GamesAdded,
					Search:Collecting,
				})
		}
		
		
		// All data is set in WP, Fire Action to store in Reducers
		// Re work this!! 
		if(this.state.GamesFound > 0 && this.state.prepareStage != true && this.state.GamesAdded == this.state.GamesFound)
			{
				
					this.setState({ prepareStage: true })
					this.FetchNewRegisteredPlayer(this.props.UI.PLAYER.LMSID);
							
		}
		// show proceed button once Players Data is in reducer
		if(NewProps.UI.items.Batting == true && this.state.ShowUI == false)
			{
				console.log("Registeration Complete, Fetch UI ",this.props.UI.PLAYER.LMSID);
				APPURL = <Link to="/" class="btn btn-success btn-block btn-lg">Registration Complete</Link>
				this.setState({ Next:APPURL, ShowUI:true })
		}
	}  	
	
	render(){

				return(
						<div>	
							<p>{WarningText}</p>
							<p>{this.state.Search} {this.state.GamesAdded} of {this.state.GamesFound}.</p>			
							<RegisterTimer Found={this.state.GamesFound} Added={this.state.GamesAdded}/>
							<p>{this.state.Next}</p>
						</div>
					)
				
	}			
}