import React from "react";

import { Team_Select_Grade } from "../../../actions/";

let FetchGrade=[], SelectedYear = '*';
export default class Variable_Grade extends React.Component {

	 change(event){
		// Dispatch to Reducer
		Team_Select_Grade(event.target.value);	
	 }
	 
	FindGrade(games)
		{
			let FetchGrade =[], id=0;
			
			games.map((game,i)=>{
				var Year = game.Grade;
					if(FetchGrade.indexOf(game.Grade) == -1){
						FetchGrade[id]= game.Grade;
						id++;
					}
			})
			//console.log(FetchGrade)
			return FetchGrade;
	}

  componentWillMount(){ FetchGrade = this.FindGrade(this.props.Results[1].Filtered_IDS) }
  
  render() {
	return (
		<div>
			<h5>Select Grade</h5>
			<select class="form-control pull-right " onChange={this.change.bind(this)} >
				<option value="*" >Show all</option>
					{
						FetchGrade.map((team,i)=>{
							return( <option value={team} key={i}>{team}</option> )
						})
					}
			</select>
		</div>
    );
  }
}