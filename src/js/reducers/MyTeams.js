const InitialState ={
	Teams:false,
	ready:{
		index:false,
		id:false,
		team:false,
		scorecards:false,
		complete:false
	},
	SelectedTeamID:false,
	SelectedTeam:[],
	SelectedScorecards:[],
	SelectedPlayers:[],
	year:'*',
	grade:'*',
	Missing_Games:0
}

const MyTeams_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "RESET_REDUCER" :{
					return  {...state, 
								SelectedTeamID:false,
								SelectedTeam:[],
								SelectedScorecards:[], 
								ready:{...state.ready, 
										index:false,
										id:false,
										team:false,
										scorecards:false,
										complete:false
									}
						}
					
					break
				}
			case "SET_TEAMS":{
					console.log(action.payload)
					return {...state, Teams:action.payload}
					break
				}
			case "SET_SELECTED_TEAM":{
					return {...state, SelectedTeam:action.payload, ready:{...state.ready, team:true}}
					break
				}
				
			case "SET_SELECTED_TEAM_ID":{
					return {...state, SelectedTeamID:action.payload}
					break
				}
			case "SET_SELECTED_TEAM_YEAR" :{
					return {...state, year:action.payload}
					break
				}
			case "SET_SELECTED_TEAM_GRADE":{
					return {...state, grade:action.payload}
					break
				}
			case "SET_FILTERED_GAME_RESULTS":{
					return {...state, SelectedScorecards:action.payload, ready:{...state.ready, scorecards:true}}
					break
				}
			case "SET_TEAM_MISSING_GAMES_NUM":{
				return {...state, Missing_Games:action.payload}
					break
				}
			case "SET_TEAM_READY_INDEX":{
					return {...state, ready:{...state.ready, index:action.payload}}
					break
				}
			case "SET_TEAM_READY_ID":{
					return {...state, ready:{...state.ready, id:action.payload}}
					break
				}
			case "SET_TEAM_READY_TEAM":{
					return {...state, ready:{...state.ready, team:action.payload}}
					break
				}
			case "SET_TEAM_READY_SCORECARD":{
					return {...state, ready:{...state.ready, scorecards:action.payload}}
					break
				}
			case "SET_TEAM_READY_COMPLETE":{
					return {...state, ready:{...state.ready, complete:action.payload}}
					break
				}
			}
		return state;
	}
export default MyTeams_reducer;	