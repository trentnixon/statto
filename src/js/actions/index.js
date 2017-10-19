// JavaScript Document
import store from "../store/store";
import axios from 'axios';
var _ = require('lodash');
import { clean_Player } from "./Data_Clean";


/* *************************************************** */
/* Action Functions */
/* *************************************************** */

function foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}
	
/* *************************************************** */
/* *************************************************** */
export function FindPlayersStats(Tag){ 

	const request = axios.get("/lms/wp-json/wp/v2/lms_player_data/?tags="+Tag+'&per_page=1000');

	return (dispatch) => {
			request.then(({data}) =>{ clean_Player(data) })
		};
	}
// Register Game Data

/* PLAYER NAME AND PLAYER ID */
export function Register_Player_Name(Name)
	{	
		return (dispatch) => {
				dispatch({type:"SET_UI_PLAYER_NAME_FETCHED",payload:Name});
		}
	}

export function Register_Player_WP_ID(ID)
	{	
		return (dispatch) => {
				dispatch({type:"SET_UI_PLAYER_WP_ID_FETCHED",payload:ID});
		}
	}
	
/* END Player NAME */


/* *************************************************** */
/* GAME DATA */
/* *************************************************** */
export function AddGameArrayToWP(Games)
	{

		let i=0, num=0, Games_Played = Games.length;
		let ArrayCount=[];
		// Set Game Num in Store
		store.dispatch({ type:"SET_UI_NUM_GAMES_FOUND_FETCHED",payload:Games_Played });
		
		// If no Result, Return to UI with 0
		if(Games_Played == 0 ){ store.dispatch({ type:"SET_UI_GAME_ADDED_FETCHED",payload:-1 }); }
		// else loop through array every 4 secs to not overload the server
		else{
			
			var intervalId = setInterval( function(){
				
				if(Games[i] != null)
					{	
						const request = axios.post("/lms/ajax/AddGametoWP.php", Games[i]);
						  request.then(({data}) =>{ 
								
								ArrayCount.push(data.GameID);
								
								// Update the UI
								store.dispatch({ type:"SET_UI_GAME_ADDED_FETCHED",payload:ArrayCount.length});	
								
								// Stop the Loop
								if(ArrayCount.length == Games_Played ){  clearInterval(intervalId) }				
						})
					  request.catch(function(reason) { console.log(reason) })	
					}
				i++;

		// Close Interval
		}.bind(this), 3500);
	}
		
		// Return UI True
		return (dispatch) => {
				dispatch({type:"SET_REGISTERED_PLAYER_FETCHED",payload:true});
			}
	}


/* END GAME DATA */	

/* *************************************************** */	
// SET UI Data	
/* *************************************************** */
export function SetLiveStats()
	{
		return (dispatch) => {
				dispatch({type:"SET_LIVE_FETCHED",payload:{Live:true}});
			}
		}	

export function CreateUserUI(data)
	{
		return (dispatch) => {
				dispatch({type:"SET_UI_PLAYER_FETCHED",payload:data});
		}
			
}

export function SetProfileUpdate(data)
	{
		return (dispatch) => {
				dispatch({type:"SET_UI_UPDATEPROFILE",payload:data});
		}
			
}
export function SetProfileUpdateProgress(data)
	{
		return (dispatch) => {
				dispatch({type:"SET_UI_UPDATEPROFILE_PROGRESS",payload:data});
		}
			
}

export function SetSearchBar(data)
	{
		return (dispatch) => {
				dispatch({type:"SET_SEARCH_BAR",payload:data});
		}
		
		}

export function SetStatto(data){
		return (dispatch) => {
				dispatch({type:"SET_STATTO_UPDATE",payload:data});
		}
	}
/* *************************************************** */
/* Scorecard*/
/* *************************************************** */


export function scorecard(GameID,first,second)
	{
		const request = axios.get("/lms/wp-json/wp/v2/lms_game/?slug="+GameID);
		 request.then(({data}) =>{ 
					store.dispatch({ type:"SET_SCORECARD",payload:data});									
				})	
		}
/* *************************************************** */
/* My Teams */
/* *************************************************** */
export function Register_Team_Object(id)
	{
		console.log('Register_Team_Object',id)
		const request = axios.get("/lms/ajax/Register_Team_Results.php?teamid="+id);
		request.then(({data}) =>{
				console.log(data)
				store.dispatch({ type:"SET_TEAM_READY_TEAM",payload:false});	
		})
}


// Load sequence
export function Team_ready_index(state) { store.dispatch({ type:"SET_TEAM_READY_INDEX",payload:state});	 }
export function Team_ready_id(state) { store.dispatch({ type:"SET_TEAM_READY_ID",payload:state});	 }
export function Team_ready_team(state) { store.dispatch({ type:"SET_TEAM_READY_TEAM",payload:state});	 }
export function Team_ready_scorecard(state) { store.dispatch({ type:"SET_TEAM_READY_SCORECARD",payload:state});	 }
export function Team_ready_complete(state) { store.dispatch({ type:"SET_TEAM_READY_COMPLETE",payload:state});	 }
export function Clear_Reducer(state) { store.dispatch({ type:"RESET_REDUCER",payload:state});	 }


export function StoreTeams(id)
	{
		const request = axios.get("/lms/wp-json/wp/v2/lms_team_data/?slug="+id);
		 request.then(({data}) =>{ 
		 	
			let TeamResults, CreateArray;
		 
		 	// console.log(id, data,  data.length);
		 // if no results found
			 if(data.length > 0)
				{
					if(data["0"].meta.Team_Results == "Array"){
						
						console.log("THIS ARRAY IS CURRUPT");
						Register_Team_Object(id);
					}
					else
					{  
						CreateArray = JSON.parse("["+data["0"].meta.Team_Results["0"]+"]");
						TeamResults = _.map(CreateArray[0]).map(function(x) {
							return _.assign(x, { GameID: x.GameID });
						});
						store.dispatch({ type:"SET_SELECTED_TEAM",payload:TeamResults});
					}
					
				}
			else 
				{
					console.log("There are no results returned! Fetch the game Object from LMS. NOW");
					Register_Team_Object(id)
				}
		})	
	}

export function SelectedTeamID(id)
	{	
		console.log(id)
		store.dispatch({ type:"SET_SELECTED_TEAM_ID",payload:id});
		store.dispatch({ type:"SET_TEAM_READY_ID",payload:true});	
	}


export function Team_Select_Year(year)
	{  store.dispatch({ type:"SET_SELECTED_TEAM_YEAR",payload:year}); }	
	
export function Team_Select_Grade(grade)
	{  store.dispatch({ type:"SET_SELECTED_TEAM_GRADE",payload:grade}); }
	
export function Team_Missing_Games(Num)
	{  store.dispatch({ type:"SET_TEAM_MISSING_GAMES_NUM",payload:Num}); }	
	
// 	
	
export function FetchScorecards(obj, id)
	{
		let GameStr='', StoredIDs=[];
		
		obj.map((game,i)=>{
				GameStr = GameStr+game.GameID+',';
				StoredIDs.push(game.GameID)
		})
		
		const request = axios.get("/lms/wp-json/wp/v2/lms_game/?slug="+GameStr+'&per_page=1000');
		 request.then(({data}) =>{ 
					 
			let InningsArray=[],HoldPlayerRoster=[],Hold_Filtered_Cards=[],Store_Filtered_Cards=[],DisplayTeamRoster,i=0, MyScoreCard,OppoScorecard, Store_MyCard_Filtered=[],Store_oppo_Filtered=[] ;
			
			data.map((game,i)=>{
				
				MyScoreCard=[], OppoScorecard, Hold_Filtered_Cards=[], Store_Filtered_Cards=[];
				
				if(game.meta.Batted_First_ID[0] == id)
					{ 
						Store_MyCard_Filtered = JSON.parse("["+game.meta["1st_Innings"][0]+"]");
						
						MyScoreCard = _.map(Store_MyCard_Filtered[0]).map(function(x) {
					 		 return _.assign(x, { Player_Name: x.Player_Name });
						});
					}	
				else{ 
						Store_Filtered_Cards = JSON.parse("["+game.meta["2nd_Innings"][0]+"]");
						MyScoreCard = _.map(Store_Filtered_Cards[0]).map(function(x) {
					 		 return _.assign(x, { Player_Name: x.Player_Name });
						});
					}	
			
				
				InningsArray.push(
							{	
								Gameid:game.title.rendered, 
								Batted_First:game.meta.Batted_First["0"],
								Batted_First_ID:game.meta.Batted_First_ID["0"],
								Batting_Second:game.meta.Batting_Second["0"],
								Batting_Second_ID:game.meta.Batting_Second_ID["0"],
								Game_Date:game.meta.Date["0"],
								First_Overs:game.meta.First_Overs["0"],
								First_Score:game.meta.First_Score["0"],
								First_Wickets:game.meta.First_Wickets["0"],
								MOM:game.meta.MOM["0"],
								MOM_ID:game.meta.MOM_ID["0"],
								Second_Overs:game.meta.Second_Overs["0"],
								Second_Score:game.meta.Second_Score["0"],
								Second_Wickets:game.meta.Second_Wickets["0"],
								Umpire:game.meta.Umpire["0"],
								Venue:game.meta.Venue["0"],
								Winner_ID:game.meta.Winner_ID["0"],
								Winner_Name:game.meta.Winner_Name["0"],
								Winner_Summary:game.meta.Winner_Summary["0"],
								MyTeamScorecard:MyScoreCard,
								OppoScorecard:OppoScorecard,
							})
			})
				 
				 store.dispatch({ type:"SET_FILTERED_GAME_RESULTS",payload:InningsArray});	
		
		})
	}

// Fetch missing games for Team stats
export function FetchMissingGames(obj)
	{
	if(obj.length > 0)
		{
			// set UI to update
			console.log(obj);
			let i=0, num=0, Games_Played = obj.length;
			let ArrayCount=[];
			
			var intervalId = setInterval( function(){
				
				if(obj[i] != null)
					{	
						const request = axios.get("/lms/ajax/Register_Team_Game.php?GameID="+obj[i]);
						  request.then(({data}) =>{ 
								
								ArrayCount.push(i);
								
								console.log(ArrayCount, ArrayCount.length,Games_Played)
								
								// Stop the Loop
								if(ArrayCount.length == Games_Played ){  
									// resync component
									console.log("Fetch Missing Completed. Update Component")
									clearInterval(intervalId) 
								}				
						})
					  request.catch(function(reason) { console.log(reason) })	
					}
				i++;
			// Close Interval
			}.bind(this), 5000);
	}
}	