import React from "react";
import { connect } from "react-redux";

// col - 12
import Batting_Widget_Stats from "../Chart_batting_basic_stats/career"; // Checked
import Batting_Previous_3_Games_Table from "../Chart_batting_basic_stats/BattingPrevious3GamesTable"; // checked

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	componentWillMount(){ }
	render () {
			
			return (
				<div id="TopPanel">
					<div class="row">
						<div class="col-md-6">
								<h1 class="page-header">Batting Stats</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">CURRENT WORLD RANK: {this.props.BATTING.Facts["0"].Batting_World_Rank}</p>
						</div>	
					</div>
					<Batting_Widget_Stats Title={"Career Runs  *DNB Not Included"} />
					<Batting_Previous_3_Games_Table {...this.props} Limit={2} Title="Batting: Last 3 Games"  />
				</div>
			)
	}
}