import React from "react";
import { connect } from "react-redux";

import {Calculate_Achievements,Set_Achievements} from "./../actions/Achievements"

	
// Get Structure
	// Global
		import SectionHeader from "./Global/SectionHeader";
	// Widgets
		import HomePageTopWidgets from "./Structure/HomePageTopWidgets";
		import CurrentFormWidgets from "./Structure/CurrentFormWidgets";
	// Batting
		import Last10BattingScores from "./Batting/Chart_batting_Bars/Last10GamesRuns";
		import BattingAverageLast10Games from "./Batting/Chart_batting_average/BattingAverageLast10Games";
	// Bowling
		import Bowling_wickets_to_runs from "./Bowling/Chart_bowling_wickets_to_runs/Last10Games";
		import Bowling_Average_runs_per_over  from "./Bowling/Chart_bowling_average_runs_per_over/Last10Games";
	// Keeping
		import HomePageKeepingPie from "./Keeping/Chart_Pie_Keeping_Home";
	// Ranking
		import HomePageWorldRankingsWidget from "./Rankings/HomePageWorldRankingsWidget";
		import PreviousFullGameTable from "./Rankings/PreviousFullGameTable";


	// Create Globals Class Vars	
		let Header, Subheader, GameNum=0, GamesAgainst,data, GlobalLimit=10;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING,
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})
	
export default class Layout extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){
		console.log(this.props.Player)
	
	  	Header = this.props.UI.items.SiteName;
		Subheader = this.props.UI.items.SubHeader;
		GameNum = this.props.Player.games.length; 
		
		if(this.props.BATTING.Facts && this.props.ACHIEVEMENTS.Set == false)
			{ 	
				this.props.dispatch(Calculate_Achievements(this.props.BATTING.Facts[0],this.props.ACHIEVEMENTS.Breakdown)) 
		}
	 }
  
  render() {
		return (
				<section id="basicInfo">
					<div class="row">
						<div class="col-md-6">
							<h1 class="page-header">Dashboard</h1>
						</div>
						<div class="col-md-6 hidden-xs">
							<p class="pull-right">{GameNum} games logged with Statto</p>
						</div>
					</div>
					<div class="row">
						<HomePageTopWidgets />
					</div>			
					<div class="row">
						<div class="col-md-8">
							<PreviousFullGameTable {...this.props} Limit={3} Title="Last 3 Games" />
						</div>
						<div class="col-md-4">
							<HomePageWorldRankingsWidget {...this.props} Title="World Rankings"/>
						</div>
					</div>
					
					<div class="row">
						<div class="col-md-12">
							<h1 class="page-header">Form Guide <small>Last {GlobalLimit} Games</small></h1>
						</div>
						<div class="col-md-8">
							<CurrentFormWidgets />	
							<Last10BattingScores Title={"Runs - Last "+GlobalLimit+" Games  *DNB Not Included"}/>
							<Bowling_wickets_to_runs Title={"Wickets to Runs - Last "+GlobalLimit+" Games"} />
						</div>
						
						<div class="col-md-4">
							<BattingAverageLast10Games Height={200} Title={"Batting Average - Last "+GlobalLimit+" Innings"} />
						<Bowling_Average_runs_per_over Height={200} Title={"Bowling Average Runs per over - Last "+GlobalLimit+" Innings"}/>
							<HomePageKeepingPie {...this.props} Limit={GlobalLimit} Title={"Keeping Stats - Last "+GlobalLimit+" Games"}  />
						</div>
					</div>	
				</section>
		);  
  }
}