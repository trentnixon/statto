import React from "react";
import { connect } from "react-redux";

// col - 12
import Bowling_Widget_Stats from "../Bowling_stats/Career_Widgets"; // Checked
import Bowling_Previous_3_Games_Table from "../Bowling_stats/BowlingPrevious3GamesTable"; // checked
// 
@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	componentWillMount(){ 
		console.log(this.props.BATTING)
	}

	render () {
			
			return (
				<div id="TopPanel">
					<div class="row">
						<div class="col-md-6">
								<h1 class="page-header">Career Bowling Stats</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">CURRENT WORLD RANK: {this.props.BATTING.Facts["0"].Bowling_ranking}</p>
						</div>	
					</div>
						<Bowling_Widget_Stats />
						<Bowling_Previous_3_Games_Table {...this.props} Limit={2} Title="Bowling: Last 3 Games"  />
				</div>
			)
	}
}