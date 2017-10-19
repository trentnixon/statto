import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import { connect } from "react-redux";
// Globals
import SectionHeader from "../../Global/SectionHeader";


// Batting
// col - 12
import Batting_Widget_Stats from "../Chart_batting_basic_stats/career"; // Checked
import Batting_Previous_3_Games_Table from "../Chart_batting_basic_stats/BattingPrevious3GamesTable"; // checked

// col - 8 
import BattingScores_Bar from "../Chart_batting_Bars/career";
import Batting_Average_Career from "../Chart_batting_average/career";
import Batting_StrikeRate_Career from "../Chart_batting_strikerate/career";
import Batting_WorldRanking from "../Chart_batting_rank/career";
// col- 4
import Batting_Fun_Facts from "../Chart_batting_basic_stats/Batting_Fun_Facts";
import Batting_Widget_Stats_SideBar from "../Chart_batting_basic_stats/career_sideBar";
// footer


var Limit=10000;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class ShellBatting extends React.Component {
	componentWillMount(){ console.log() }
	render () {
			return (
				<section id="basicInfo">
					<div class="row">
						<div class="col-md-6">
								<h1 class="page-header">Batting Stats</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">CURRENT WORLD RANK: {this.props.BATTING.Facts["0"].Rank}</p>
						</div>	
					</div>
					<div class="row">
						<Batting_Widget_Stats Title={"Career Runs  *DNB Not Included"} />
					</div>
					
					<div class="row">
						<Batting_Previous_3_Games_Table {...this.props} Limit={3} Title="Batting: Last 3 Games"  />
					</div>
					<div class="row">
						<div class="col-md-8">	
							<BattingScores_Bar {...this.props} Limit={Limit} Title={"Career Runs  *DNB Not Included"} />
							<Batting_Average_Career {...this.props} Height={300} Limit={Limit} Title="Batting Average - Career" />
							<div class="col-md-6">
								<Batting_StrikeRate_Career {...this.props} Height={200} Limit={Limit} Title="Batting Strike Rate - Career"/>
							</div>
							<div class="col-md-6">
								<Batting_WorldRanking {...this.props} Height={200} Limit={Limit} Title="World Ranking - Progression "  /> 
							</div>
						</div>
						<div class="col-md-4">
							<Batting_Widget_Stats_SideBar {...this.props} Limit={Limit} Title={"Career Runs Breakdown"} />
							<Batting_Fun_Facts  {...this.props} Limit={Limit} Title={"Fun Facts and Predictions"}/>	
						
						
							<div class="col-md-12">
								<h2>Notes</h2>
								<ul>
									<li>Common Dismisal</li>
									<li>Last Game stats/breakdown</li>
									<li>Select a vs team - stats against Team </li>
								</ul>
							</div>
						
						</div>
					</div>
				</section>
			)
	}
}