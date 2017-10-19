import React from "react";
import { connect } from "react-redux";

var Limit=10000;
// col - 12
import Bowling_Widget_Stats_SideBar from "./Keeping_stats/Career_sideBar";

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
					<div class="col-md-3">
						<Bowling_Widget_Stats_SideBar {...this.props} Limit={Limit} Title={"Career Breakdown"} />
						<div class="col-md-12">
							<h2>Notes</h2>
								<ul>
									<li></li>
								</ul>
							</div>
						</div>
				</div>
			)
	}
}