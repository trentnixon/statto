import React from "react";
import { connect } from "react-redux";

// Globals

import VS_Select from "./Components/vs_select"
import VS_Table from   "../Global/by_opposition_representation_season/vs_table";
import VS_TotalGames from "../Global/by_opposition_representation_season/vs_TotalGames";
import VS_Batting from "../Global/by_opposition_representation_season/vs_batting";
import VS_Bowling from "../Global/by_opposition_representation_season/vs_Bowling";
import VS_Keeping from "../Global/by_opposition_representation_season/vs_Keeping"

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
		   value: 'select a Team'
		};
	}

	componentWillMount(){ 
		const GameObject = this.props.BATTING.BattingObject;	
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){}

	render () {
		
		if(this.props.UI.items.SelectTeamArray)
			{
			return (
				<section id="basicInfo">
					<div class="row">
						<div class="col-md-6">
							<h3 class="page-header"><small>VS : </small> {this.props.UI.items.SelectTeam}</h3>
						</div>
						<div class="col-md-6">
							<VS_Select {...this.props} Player={this.props.BATTING.BattingObject}/>
						</div>
					</div>
						<VS_TotalGames Player={this.props.UI.items.SelectTeamArray} />
						<VS_Batting Player={this.props.UI.items.SelectTeamArray}/>
						<VS_Bowling Player={this.props.UI.items.SelectTeamArray}/>
						<VS_Keeping Player={this.props.UI.items.SelectTeamArray}/>
						<VS_Table {... this.props} Player={this.props.UI.items.SelectTeamArray}/>
				</section>
			)
		}
		else
			{
			return(
				<section id="basicInfo">
					<div class="row">
						<div class="col-md-6 col-md-offset-3">
							<VS_Select {...this.props} Player={this.props.BATTING.BattingObject}/>
						</div>
					</div>
				</section>
			)
		}		
	}
}