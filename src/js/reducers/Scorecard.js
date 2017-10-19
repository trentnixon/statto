const InitialState ={
	scorecard:false}

const Scorecard_reducer = (state=InitialState, action) =>{
		switch(action.type){
			case "SET_SCORECARD":{
					return {...state, scorecard:action.payload}
					break
				}
			
			}
		return state;
	}
	
export default Scorecard_reducer;	