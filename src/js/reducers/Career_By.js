const InitialState ={items:{
		SelectTeam:false,
		SelectTeamArray:false,
		SelectYear:false,
		SelectYearArray:false,
		SelectClub:false,
		SelectClubArray:false,
		SelectGround:false,
		SelectGroundArray:false
	}}

const By_Career_reducer = (state=InitialState, action) =>{
		switch(action.type){
			
			case "SET_SELECTED_TEAM_FETCHED":{
					return {...state, items:{...state.items, SelectTeam:action.payload}}
					break
				}
			case "SET_SELECTED_TEAM_ARRAY_FETCHED":{
					return {...state, items:{...state.items, SelectTeamArray:action.payload}}
					break
				}
			
			case "SET_SELECTED_YEAR_FETCHED":{
					return {...state, items:{...state.items, SelectYear:action.payload}}
					break
				}
			case "SET_SELECTED_YEAR_ARRAY_FETCHED":{
					return {...state, items:{...state.items, SelectYearArray:action.payload}}
					break
				}
			
			case "SET_SELECTED_CLUB_FETCHED":{
					return {...state, items:{...state.items, SelectClub:action.payload}}
					break
				}
			case "SET_SELECTED_CLUB_ARRAY_FETCHED":{
					return {...state, items:{...state.items, SelectClubArray:action.payload}}
					break
				}
			case "SET_SELECTED_GROUND_FETCHED":{
					return {...state, items:{...state.items, SelectGround:action.payload}}
					break
				}
			case "SET_SELECTED_GROUND_ARRAY_FETCHED":{
					return {...state, items:{...state.items, SelectGroundArray:action.payload}}
					break
				}
			case "SET_SELECTED_UMPIRE_FETCHED":{
					return {...state, items:{...state.items, SelectUmpire:action.payload}}
					break
				}
			case "SET_SELECTED_UMPIRE_ARRAY_FETCHED":{
					return {...state, items:{...state.items, SelectUmpireArray:action.payload}}
					break
				}
			
			
			}
		return state;
	}
	
export default By_Career_reducer;	