import React from "react";
import { connect } from "react-redux";

var Limit=10000;
// col - 12
import Batting_Fun_Facts from "../Chart_batting_basic_stats/Batting_Fun_Facts";
import Batting_Widget_Stats_SideBar from "../Chart_batting_basic_stats/career_sideBar";

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
				<div id="SidePanel">
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
			)
	}
}