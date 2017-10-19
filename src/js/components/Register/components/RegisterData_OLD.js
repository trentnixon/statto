import React from "react";
import { connect } from "react-redux";
import { Line, Circle } from 'rc-progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';


import {FindPlayersStats, SetLiveStats, CreateUserUI} from "../../../actions/";

export default class LoginHeader extends React.Component {

	FetchPlayerData(userID){
		
		const request = axios.get("/lms/ajax/RegisterNewPlayerData.php?UserID="+userID);
		
		request.then(({data}) =>{ 
		
			this.props.dispatch(Register_Num_Games(data.length));
			var promises = [];
			
			console.log(data.length, data, data[1])
			
			
			var i=0
			num=0;
			var GamesPlayed = data.length;
			
				// insert set Ingterval in here to a ADD TO WP FUNCTION
				var intervalId = setInterval( function(){
						
						console.log('Send Data', data[i])
				
						const request = axios.post("/lms/ajax/AddGametoWP.php", data[i]);
							request.then(({data}) =>{ 
		
							console.log('Returned data ', data)
			
							if(data.Added == true)
								{
									num++;
									this.props.dispatch(Register_Game_Added(num));

									//console.log(num,GamesPlayed)
								
									if(num == GamesPlayed){
										clearInterval(intervalId)
									}
						
							}
							request.catch(function(reason) {
									console.log(reason)
								})		
							request.catch((err) => {
								//dispatch(getStuffError(err))
								console.log(err)
							  })				
						});
						//
						i++;
						
					}.bind(this),4500);
					
				// End New Code
		}); 
	}
	
	
	
 	componentWillMount(){ 
		// Fecth Player Game Data
		RegisteredNum = this.FetchPlayerData(this.props.Player.LMSID)		
	}	
	shouldComponentUpdate(NewProps, NewState){ return true;}
	componentWillUpdate(NewProps, NewState){}  	
	render(){
	
		return(
				<div>
					REGISTER DATA IN HERE		
				</div>
		)
	}			
}