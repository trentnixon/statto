const InitialState ={
			Live:false,
			Fetched:false
	}

const Player_Batting_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "SET_LIVE_FETCHED":{
					return {...state,Live:true}
					break
				}
			case "SET_BATTING_OBJECT_FETCHED":{
					return{...state, BattingObject:action.payload}
					break
				}
			case "SET_BATTING_FACTS_OBJECT_FETCHED":{
					return{...state, Facts:action.payload}
					break
				}	
			}
		return state;
	}
export default Player_Batting_reducer;	