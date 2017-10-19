import React from "react";
import { connect } from "react-redux";

// col - 12
import Widget_Stats from "./Keeping_stats/Career_Widgets"; // Checked
import Previous_3_Games_Table from "./Keeping_stats/Previous3GamesTable"; // checked
// <Widget_Stats />
@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	componentWillMount(){  console.log(this.props.BATTING) }
	shouldComponentUpdate(NewProps, NewState){ return true;}
    componentWillUpdate(NewProps, NewState){ }
	render () {
			
			return (
				<div id="TopPanel">
					<div class="row">
						<div class="col-md-6">
								<h1 class="page-header">Career Keeping Stats</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">CURRENT WORLD RANK: {this.props.BATTING.Facts["0"].Keeping_ranking}</p>
						</div>	
					</div>
						
						<Previous_3_Games_Table {...this.props} Limit={2} Title="Keeping: Last 3 Games"  />
				</div>
			)
	}
}