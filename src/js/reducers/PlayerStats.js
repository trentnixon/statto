const InitialState ={games:{}}

const Player_stat_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "PLAYER_STATS_FETCHED":{
					return {...state, games:action.payload}
					break
				}
			case "PLAYER_STATS_REVERSED_FETCHED":{
					return {...state, games_reversed:action.payload}
					break
				}
			}
		return state;
	}
	
export default Player_stat_reducer;	