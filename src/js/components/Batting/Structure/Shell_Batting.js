import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import { connect } from "react-redux";
// Globals
import SectionHeader from "../../Global/SectionHeader";

// Structure
// Views
import View_Batting_Home from "./View_Batting_Home";
import View_Total_Runs from "./View_Total_Runs";
import View_At_Bat from "./View_At_Bat";
import View_Balls_Faced from "./View_Balls_Faced";
import View_High_Scores from "./View_High_Scores";
import View_Not_Outs from "./View_Not_Outs";
import View_Ducks from "./View_Ducks";
import View_Less_Than_20 from "./View_Less_Than_20";
import View_twenties from "./View_twenties";
import View_thirties from "./View_thirties";
import View_fifties from "./View_fifties";
import View_hundreds from "./View_hundreds";
import View_Batting_Position from "./View_Batting_Position";
import View_Batting_Dismissals from "./View_Batting_Dismissals";

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class ShellBatting extends React.Component {
	componentWillMount(){ console.log(this.props.BATTING) }
	render () {
			return (  
				<section id="basicInfo">
						
					<div class="row">
						<div class="col-md-12">
							<Route exact path="/:playerid/batting" component={View_Batting_Home}/>
							<Route path="/:playerid/batting/career-at-bat" component={View_At_Bat}/>
							<Route path="/:playerid/batting/total-runs" component={View_Total_Runs}/>
							<Route path="/:playerid/batting/batting-position" component={View_Batting_Position}/>
							<Route path="/:playerid/batting/dismissals" component={View_Batting_Dismissals}/>
							
							<Route path="/:playerid/batting/balls-faced" component={View_Balls_Faced}/>
							<Route path="/:playerid/batting/high-scores" component={View_High_Scores}/>
							<Route path="/:playerid/batting/not-outs" component={View_Not_Outs}/>
							<Route path="/:playerid/batting/ducks" component={View_Ducks}/>
							<Route path="/:playerid/batting/less-than-20" component={View_Less_Than_20}/>
							<Route path="/:playerid/batting/twenties" component={View_twenties}/>
							<Route path="/:playerid/batting/thirties" component={View_thirties}/>
							<Route path="/:playerid/batting/fifties" component={View_fifties}/>
							<Route path="/:playerid/batting/hundreds" component={View_hundreds}/>
						</div>
					</div>
				</section>
			)
	}
}