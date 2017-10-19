import React from "react";

// Actions
import {VS_Select_Year,VS_Select_Year_Array} from '../../../actions/Career_By';

// vars
var Teams=[],TeamArray=[], SelectaTeam, ThisTeam=[];

export default class VS_Table extends React.Component {
	

	// Dispatch Array
	CreateTeamArray(SelectedYear){
			ThisTeam=[];
			var Year;
			this.props.BATTING.BattingObject.map((game,i)=>{
				
				Year = game.Date.split('/');
				if(Year[2] == SelectedYear.slice(2))
					{	
					ThisTeam.push({game})
						}
			})
			console.log(ThisTeam)
			this.props.dispatch(VS_Select_Year_Array(ThisTeam));
		}
 	 
	 // Dispatch Year
	 change(event){  
     	this.CreateTeamArray(event.target.value)
	 	this.props.dispatch(VS_Select_Year(event.target.value));
	 }
	 
	//sort individuals 
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

	// Create Select Items
	collectTeams(Player){
		// Teams
		var id=0;
		Player.map((game,i)=>{
				var Year = game.Date.split('/');
				Teams[id]= 20+Year[2];
				id++;
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
				<option value="false" >Select a Year</option>
					{
						SelectaTeam.map((team,i)=>{
							return( <option value={team} key={i}>{team}</option> )
						})
					}
			</select>
	);
  }
}