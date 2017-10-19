const InitialState ={fetched:false}

const Player_Bowling_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "PLAYER_BOWLING_AVERAGE_FETCHED":{
					return {...state, BowlingAverageObject:action.payload}
					break
				}
	
			}
		return state;
	}
	
export default Player_Bowling_reducer;	