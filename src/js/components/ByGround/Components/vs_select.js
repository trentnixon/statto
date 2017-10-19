import React from "react";

// Actions
import {VS_Select_Ground,VS_Select_Ground_Array} from '../../../actions/Career_By';

// vars
var Teams=[],TeamArray=[], SelectaTeam, ThisTeam=[];

export default class ByGround_Select extends React.Component {
	CreateTeamArray(Team){
		
			ThisTeam=[];
			this.props.BATTING.BattingObject.map((game,i)=>{
				if(game.Game_Venue == Team)
					{	
						ThisTeam.push({game})
						}
				
			})
			console.log(ThisTeam)
			// Dispatch to Reducer
			this.props.dispatch(VS_Select_Ground_Array(ThisTeam));
		}
 	 
	 change(event){
         console.log(event.target.value)
		  
     	this.CreateTeamArray(event.target.value)
		// Dispatch to Reducer
	 	this.props.dispatch(VS_Select_Ground(event.target.value));
	 }
	 
	foo(arr) {
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

	collectTeams(Player){
		// Teams
		Player.map((game,i)=>{
						Teams[i]= game.Game_Venue;
					})
		TeamArray = this.foo(Teams)
		return TeamArray[0];
	}
	
	componentWillMount(){  SelectaTeam = this.collectTeams(this.props.Player)}	 
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){ SelectaTeam = this.collectTeams(nextProps.Player)} 
	
  render() {
    return (
			<select class="form-control pull-right " onChange={this.change.bind(this)} >
				<option value="false" >Select a Ground</option>
					{
						SelectaTeam.map((team,i)=>{
							return( <option value={team} key={i}>{team}</option> )
						})
					}
			</select>
	);
  }
}