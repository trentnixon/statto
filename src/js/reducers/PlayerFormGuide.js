const InitialState ={fetched:false}

const Player_Form_Guide_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "PLAYER_FORM_GUIDE_FETCHED":{
					return {...state, fetched:true}
					break
				}
			case "PLAYER_FORM_GUIDE_FACTS_FETCHED":{
					return {...state, Facts:action.payload}
					break
				}
			case "PLAYER_FORM_OBJECT_FETCHED":{
					return {...state, FormGuide:action.payload}
					break
				}
		/*	case "PLAYER_FORM_RUNS_FETCHED":{
					return {...state, BattingRunsObject:action.payload}
					break
				}
			case "PLAYER_BALLSFACED_FETCHED":{
					return {...state, BallsFacedObject:action.payload}
					break
				}
			case "PLAYER_BOWLING_AVERAGE_FETCHED":{
					return {...state, BowlingAverageObject:action.payload}
					break
				}
			case "PLAYER_BOWLING_PER_WEEK_FETCHED":{
					return {...state, BowlingPerWeekObject:action.payload}
					break
				}
				*/		
			}
		return state;
	}
	
export default Player_Form_Guide_reducer;	