const InitialState ={}

const WorldRankings_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "WORLD_RANKINGS_OBJECT_FETCHED":{
					return {...state, Rankings:action.payload}
					break
				}
			}
		return state;
	}
	
export default WorldRankings_reducer;	