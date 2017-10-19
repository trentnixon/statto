import React from "react";
import { connect } from "react-redux";

import {FindPlayersStats} from "../../actions/";
// GLobal
import SectionHeader from "../Global/SectionHeader";

// Batting
import Basic_Batting_Stats from "../Batting/Chart_batting_basic_stats";
import Basic_Team_Against_Stats from "../Batting/Chart_batting_basic_stats/AgainstTeams";

import LINE_Chart_batting_rank from "../Batting/Chart_batting_rank";
import LINE_Chart_batting_average from "../Batting/Chart_batting_average";
import LINE_Chart_batting_strikeRate from "../Batting/Chart_batting_strikerate";
import BAR_BattingRunsScored from "../Batting/Chart_batting_Bars";

import LINE_Runs_to_Balls_Faced from "../Batting/Chart_batting_runs_to_ballsfaced";
import LINE_Runs_vs_Balls_Faced from "../Batting/Chart_batting_runs_vs_ballsfaced";
import LINE_Chart_batting_average_to_strikerate from "../Batting/Chart_batting_average_to_strikerate";
import Composed_Chart_Batting_Runs_To_Average from "../Batting/Chart_batting_scores_to_averages";




let Header, Subheader, GameNum=0, GamesAgainst,data;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER
		}
	})
export default class Layout extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){
	  
		var Vars = this.props.location.search.split("&");
		var tagID = Vars[0].split('=');
		var userID = Vars[1].split('=')
		
		this.props.dispatch(FindPlayersStats(tagID[1]))
	 }
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){  
  		Header = nextProps.UI.items.SiteName;
		Subheader = nextProps.UI.items.SubHeader;
		GameNum = nextProps.Player.games.length; 
	}
  
  render() {
    
	return (
      <div class="container-fluid">
	  	<section id="basicInfo">
			<div class="col-md-12">
	  		<h1>{Header}</h1>
			<h2>{Subheader}</h2>
	 		<p>{GameNum} games logged with Statr</p>
		</div>
		</section>
	  	
		
		<section id="batting">
		<div class="row">
			<div class="col-md-12">
				<Basic_Batting_Stats PlayerStats={this.props.Player} />
			</div>
			
			<SectionHeader copy="Basic Breakdown"/>
			
				<BAR_BattingRunsScored PlayerStats={this.props.Player}/>
				<LINE_Chart_batting_rank PlayerStats={this.props.Player} />
				<LINE_Chart_batting_average PlayerStats={this.props.Player} />
				<LINE_Chart_batting_strikeRate PlayerStats={this.props.Player} />
				
			
			
			
			<SectionHeader copy="Comparison Breakdown"/>
			
				
				<LINE_Runs_to_Balls_Faced PlayerStats={this.props.Player}/>
				<LINE_Runs_vs_Balls_Faced PlayerStats={this.props.Player}/>
				<LINE_Chart_batting_average_to_strikerate PlayerStats={this.props.Player} />
				<Composed_Chart_Batting_Runs_To_Average PlayerStats={this.props.Player}  />
			
			<SectionHeader copy="Opposition Breakdown"/>
			<Basic_Team_Against_Stats   PlayerStats={this.props.Player} />

		</div>		
		</section>
      </div>
    );
  }
}