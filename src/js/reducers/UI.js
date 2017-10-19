const InitialState ={
	Register:{
			FoundGames:0,
			GamesAdded:0
			},
	SearchBar:false,
	updateStatto:false,
	Dismissals:['Bowled','Caught','LBW','Not out','Stumped','Run out', 'NA','Other'],
	items:{
		SiteName:"STATTO",
		SubHeader:"Reviewing your LMS Career!",
		Player:false,
		Facts:false,
		ACHIEVEMENTS:false,
		Batting:false,
		Formguide:false,
		UpdateProfile:true,
		UpdateProfileProgress:false
	}}

const User_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "FETCH_DATA_FULFILLED":{
					return {...state, LIVE:true}
					break
				}
			case "FETCH_WP_USER_DATA":{
					return {...state,LMS_REGISTERED:action.payload}
					break
				}
			case "SET_UI_PLAYER_FETCHED":{
					return {...state, PLAYER:action.payload}
					break
				}
			case "SET_UI_PLAYER_NAME_FETCHED":{
					return {...state, PLAYER:{...state.PLAYER,UserName:action.payload}}
					break
				}
			case "SET_UI_PLAYER_WP_ID_FETCHED":{
					return {...state, PLAYER:{...state.PLAYER,WP_ID:action.payload}}
					break
				}
				
			case "SET_UI_NUM_GAMES_FOUND_FETCHED":{
					console.log(action.payload)
					return {...state, Register:{...state.Register,FoundGames:action.payload}}
					break
				}
			case "SET_UI_GAME_ADDED_FETCHED":{
					console.log('action.payload ',action.payload)
					return {...state, Register:{...state.Register,GamesAdded:action.payload}}
					break
				}
			case "SET_REGISTERED_PLAYER_FETCHED":{
					return {...state, Register:{...state.Register,REGISTERED:action.payload}}
					break
				}				
			case "UI_PLAYER_TRUE_FETCHED":{
					return {...state, items:{...state.items, Player:action.payload}}
					break
				}
			case "UI_FACTS_TRUE_FETCHED":{
					return {...state, items:{...state.items, Facts:action.payload}}
					break
				}
			case "UI_BATTING_TRUE_FETCHED":{
					return {...state, items:{...state.items, Batting:action.payload}}
					break
				}
			case "UI_FORMGUIDE_TRUE_FETCHED":{
					return {...state, items:{...state.items, Formguide:action.payload}}
					break
				}
			case "UI_ACHIEVEMENTS_TRUE_FETCHED":{
					return {...state, items:{...state.items, ACHIEVEMENTS:action.payload}}
					break
				}
			case "SET_UI_UPDATEPROFILE":{
					return {...state, items:{...state.items, UpdateProfile:action.payload}}
					break
				}
			case "SET_UI_UPDATEPROFILE_PROGRESS":{
					return {...state, items:{...state.items, UpdateProfileProgress:action.payload}}
					break
				}
			case "SET_SEARCH_BAR":{
					return {...state, SearchBar:action.payload}
					break
				}
			case "SET_STATTO_UPDATE":{
					return {...state, updateStatto:action.payload}
					break
				}	
			}
		return state;
	}
	
export default User_reducer;	