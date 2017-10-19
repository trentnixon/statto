import React from "react";

import { Team_Select_Year } from "../../../actions/";

let FetchYears=[], SelectedYear = '*';
export default class Variable_Year extends React.Component {

	 change(event){
         //console.log(event.target.value)
		 if(event.target.value != '*'){ SelectedYear = event.target.value.substr(2,2); } 
		 else { SelectedYear = event.target.value; }
		// Dispatch to Reducer
		Team_Select_Year(SelectedYear);	
	 }

	
	FindYears(games)
		{
			if(games != null)
			{
				let FetchYears =[], id=0;
				games.map((game,i)=>{
					var Year = game.GameDate.split('/');
						if(FetchYears.indexOf('20'+Year[2]) == -1){
							FetchYears[id]= '20'+Year[2];
							id++;
						}
				})
				return FetchYears;
			}
	}

  componentWillMount(){ console.log(this.props.Results[1].Filtered_IDS); FetchYears = this.FindYears(this.props.Results[1].Filtered_IDS)}
  
  render() {
	return (
		<div>
			<h5>Select a Year</h5>
			<select class="form-control pull-right " onChange={this.change.bind(this)} >
				<option value="*" >Show all</option>
					{
						FetchYears.map((team,i)=>{
							return( <option value={team} key={i}>{team}</option> )
						})
					}
			</select>
		</div>
    );
  }
}