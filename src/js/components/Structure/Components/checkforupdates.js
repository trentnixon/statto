import React from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { Line, Circle } from 'rc-progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import {FindPlayersStats, SetLiveStats, CreateUserUI, SetProfileUpdate,SetProfileUpdateProgress} from "../../../actions/";

let Icon = <i class="fa fa-user"></i>;
let ArrayCount=[], AxioSent=[], ExtendThis = [];
export default class CheckforUpdates extends React.Component {
	
  constructor() { super(); 
  	
	this.state = {
			Status:'Checking for Updates',
			Searching:'',
			Count:0
		};
  	}
 
  IncludeGameData(GameID, num){}
  
  FindNewGames(Player){
	  
		// Create Array of Items for Extended update
		
		this.props.Player.map((game,i)=>{
			
			// Change this back once completed
			//if(game.Game_Details_Fetched )
			if(game.Game_Details_Fetched != 1)
				{
					//console.log("Outside "+game.GameID, ExtendThis.indexOf(game.GameID))
					if(ExtendThis.indexOf(game.GameID) == -1)
						{
							//console.log("Inside "+game.GameID)
							ExtendThis.push(game.GameID)
					}
			}
		})
		

		let i=0;
		if(ExtendThis.length > 0)
			{
			// Update UI to only run if process if false
			this.props.dispatch(SetProfileUpdateProgress(true));
			// SET Front end
			this.setState({
     				 Status:'Game Data: Updates Found',
					 Searching : <MuiThemeProvider><CircularProgress size={15} thickness={1} /></MuiThemeProvider>
    		})
			//Interval through Array
			var intervalId = setInterval( function(){		
			
				// Check for Extended Game Updates	
				//console.log(ExtendThis[i])
					if(ExtendThis[i] != null)
						{
							// POST Data to WP
							//console.log(AxioSent.indexOf(ExtendThis[i]));
							if(AxioSent.indexOf(ExtendThis[i]) == -1){
								AxioSent.push(ExtendThis[i])
								const request = axios.get("/lms/ajax/Register_Team_Game.php?GameID="+ExtendThis[i]);
								request.then(({data}) =>{  
									//console.log(data) 
									ArrayCount.push(data);
									
									this.setState({ Status:'Game Data updating', Count:ArrayCount.length })
									
									// check to see if the array count is the same as the array length
									//console.log(ArrayCount.length, ExtendThis.length);
									
									if(ArrayCount.length == ExtendThis.length){ 
											//console.log("Stop Loop")
											clearInterval(intervalId) ;
											this.setState({ Status:'Game Data: Completed',Searching :Icon})
											// Fire "GET DATA" Action again to get the new data into the reducer
											
											// Set UI to False to indicate completed
											this.props.dispatch(SetProfileUpdate(false));	
											this.props.dispatch(SetProfileUpdateProgress(false));
										}
								});		
							}				
					}
				i++;
						
			}.bind(this),3500);
		}
	else{
			// Set UI to False
			this.props.dispatch(SetProfileUpdate(false));
			// CHange Front end 
			this.setState({ Status:'Game Data: Up to date',Searching :Icon}) 
		}
	}

  
  componentWillMount(){
		//console.log(this.props.UI.items.UpdateProfile)
		// Add this to the update function as well
		if(this.props.UI.items.UpdateProfile == true) { this.FindNewGames(this.props.Player) }
	 }
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){
	  		
				if(nextProps.UI.items.UpdateProfile == true && 
				   nextProps.UI.items.UpdateProfileProgress == false) 
				  	{ 
						this.FindNewGames(nextProps.Player)
				
				 }	
				//console.log(nextProps.UI.items.UpdateProfile, nextProps.UI.items.UpdateProfileProgress)
	   }
  
  render() {
    
	return (
		<li><a href="javascript: void(0)">{this.state.Searching} <span> {this.state.Status}   </span></a></li>
    );
  }
}