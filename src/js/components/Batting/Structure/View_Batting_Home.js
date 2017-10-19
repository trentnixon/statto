import React from "react";
import { connect } from "react-redux";

var Limit=10000;
// col - 12
import Shell_Top_Panel from "./Shell_TopPanel";
import BattingScores_Bar from "../Chart_batting_Bars/career";
import Batting_Average_Career from "../Chart_batting_average/career";
import Batting_StrikeRate_Career from "../Chart_batting_strikerate/career";
import Batting_WorldRanking from "../Chart_batting_rank/career";

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
				<div id="HomePanel">
					<Shell_Top_Panel />
					<BattingScores_Bar {...this.props} Limit={Limit} Title={"Career Runs  *DNB Not Included"} />
					<Batting_Average_Career {...this.props} Height={300} Limit={Limit} Title="Batting Average - Career" />
					<Batting_StrikeRate_Career {...this.props} Height={200} Limit={Limit} Title="Batting Strike Rate - Career"/>
					<Batting_WorldRanking {...this.props} Height={200} Limit={Limit} Title="World Ranking - Progression "  /> 
				</div>
			)
	}
}