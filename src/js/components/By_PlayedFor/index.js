import React from "react";
import { connect } from "react-redux";

// Globals

import VS_Select from "./Components/vs_select"
import VS_Table from   "../Global/by_opposition_representation_season/vs_table";
import VS_TotalGames from "../Global/by_opposition_representation_season/vs_TotalGames";
import VS_Batting from "../Global/by_opposition_representation_season/vs_batting";
import VS_Bowling from "../Global/by_opposition_representation_season/vs_Bowling";
import VS_Keeping from "../Global/by_opposition_representation_season/vs_Keeping"
let GameObject, SelectClubArray;
@connect((store) =>{
		return{
			UI: store.Career_By,
			BATTING:store.BATTING,
			SCORECARD:store.SCORECARD
		}
	})
export default class VS extends React.Component {
	
	constructor(props) {
    	super(props);
    	this.state = {
		   value: 'select a Club'
		};
	}

	componentWillMount(){  
			GameObject = this.props.BATTING.BattingObject;
			SelectClubArray = this.props.UI.items.SelectClubArray
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ 
			GameObject =      nextProps.BATTING.BattingObject;
			SelectClubArray = nextProps.UI.items.SelectClubArray
	}

	render () {	
		if(this.props.UI.items.SelectClubArray)
			{
			return (
				<section id="basicInfo">
					<div class="row">
						<div class="col-md-6">
							<h3 class="page-header"><small>Team : </small> {this.props.UI.items.SelectClub}</h3>
						</div>
						<div class="col-md-6">
							<VS_Select {...this.props} Player={GameObject}/>
						</div>
					</div>
						<VS_TotalGames Player={SelectClubArray} />
						<VS_Batting Player={SelectClubArray}/>
						<VS_Bowling Player={SelectClubArray}/>
						<VS_Keeping Player={SelectClubArray}/>
						<VS_Table {...this.props} Player={SelectClubArray}/>
				</section>
			)
		}
		else
			{
			return(
				<section id="basicInfo">
					<div class="row">
						<div class="col-md-6 col-md-offset-3">
							<VS_Select {...this.props} Player={GameObject}/>
						</div>
					</div>
				</section>
			)
		}		
	}
}