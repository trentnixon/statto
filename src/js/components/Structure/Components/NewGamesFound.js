import React from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { Line, Circle } from 'rc-progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import {
		AddGameArrayToWP, 
		FindPlayersStats, 
		SetLiveStats, 
		CreateUserUI,
		SetProfileUpdate,
		SetProfileUpdateProgress
	} from "../../../actions/";

let Icon = <i class="fa fa-user"></i>;
let ExtendThis = [], ProcessIDs=[];

export default class CheckforUpdates extends React.Component {
	
  constructor() { super(); 
  	
	this.state = {
			Status:'Checking Profile',
			Searching:'',
			updateInit:false,
			updateComplete:true,
			updateInProgress:false,
			updateID:false,
			GamesFound:false,
			
		};
  }


	UpdateUIState(PlayerID)
		{
			const request = axios.get("/lms/ajax/FetchPlayerDetails.php?UserID="+PlayerID);
			request.then(({data}) =>{ 
						this.props.dispatch(FindPlayersStats(data.UserID));
						this.props.dispatch(CreateUserUI(data));
						this.props.dispatch(SetLiveStats());	
				});
	
		}
  
 	updateGames(Player,PlayerID){
	 
	 	// Vars
		let i=0, a;
		
		/*Change Component State*/
		/*Store update ID as a comparison on update*/
			 this.setState({
     				 Status:' Searching LMS',
					 Searching : <MuiThemeProvider><CircularProgress size={15} thickness={1} /></MuiThemeProvider>,
					 updateComplete:false,
					 updateInProgress:true,
					 updateInit:true,
					 updateID:PlayerID
    			})
	 
	 	// Create Array of Items for Extended update
			Player.map((game,i)=>{ ExtendThis.push(game.GameID) })	

	 	/* Send for new games */
	 			const request = axios.get("/lms/ajax/RegisterNewPlayerData.php?UserID="+PlayerID);

				request.then(({data}) =>{ 

					data.map((game,i)=>{
							a = ExtendThis.indexOf(game.GameID);
						    if(a == -1) { ProcessIDs.push(game) }
						})

					if(ProcessIDs.length > 0){
								this.setState({ 
									Status: 'Updating '+ ProcessIDs.length +' Games',
									GamesFound:ProcessIDs.length,
								})
								this.props.dispatch(AddGameArrayToWP(ProcessIDs));
					
					}
					else if(ProcessIDs.length == 0)
						{
							this.setState({ 
								Status:'Profile Up to date',
								Searching : Icon,
								updateInProgress:false,
								updateComplete : true,
								GamesFound: ProcessIDs.length,
							})
					}
			})
	 }

  shouldComponentUpdate(nextProps, nextState){ return true;}
  
  componentWillUpdate(nextProps, nextState){
		
		
		/* IF current player is updting and has completed the reflect in UI*/
		if(nextState.updateInit == true && nextState.updateInProgress == true)
			{
				
				this.setState({ Status: 'Updating '+nextProps.UI.Register.GamesAdded+'  of '+ nextProps.UI.Register.FoundGames +' Games'}) 
				
				if(nextProps.UI.Register.FoundGames > 0 && nextProps.UI.Register.FoundGames == nextProps.UI.Register.GamesAdded)
					{
						// Update State
						this.setState({ 
							updateInProgress:false,
							updateComplete : true,
							Status:'Profile Update Complete',
							Searching : Icon,
							GamesFound:false,
						})

						// Fire New Stats
						this.UpdateUIState(nextProps.UI.PLAYER.LMSID);

					}
				else if(nextProps.UI.Register.FoundGames == 0)
					{
				
						this.setState({ 
							updateInProgress:false,
							updateComplete : true,
							Status:'Profile up to data',
							Searching : Icon,
							GamesFound:false,
						})
				}
				
			}
		
		
		/*IF New player loaded and needs update check, then run*/
		if(nextProps.UI.PLAYER.update == true && nextState.updateID != nextProps.UI.PLAYER.LMSID)
			{ 
				// Update State to new ID to stop loop
				this.setState({  updateID:nextProps.UI.PLAYER.LMSID })
				// Fire Update
				this.updateGames(nextProps.Player,nextProps.UI.PLAYER.LMSID); 		
			}
	}
  
  
  componentWillMount(){

		let ShouldIUpdate = this.props.UI.PLAYER.update;
		let i=0;
		if(ShouldIUpdate == true)
			{ 
				
				this.updateGames(this.props.Player,this.props.UI.PLAYER.LMSID); 
		}
		else{ this.setState({ Status:'Profile Up to date',Searching : Icon}) }
		
	 }
  
  render() {
    
	return (
		<li><a href="javascript: void(0)">{this.state.Searching} <span> {this.state.Status}   </span></a></li>
    );
  }
}