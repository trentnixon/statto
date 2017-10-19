import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
// Globals
import SectionHeader from "../../Global/SectionHeader";


// Structure
import Shell_Top_Panel from "./Shell_TopPanel";
import Shell_Side_Panel from "./Shell_SidePanel";

// Views
import View_Bowling_Home from "./View_Bowling_Home";
import View_At_Bowling from "./View_At_Bowling";
import View_Wickets from "./View_Wickets";
import View_Overs from "./View_Overs";
import View_balls from "./View_balls";
import View_economy from "./View_economy";
import View_average from "./View_average";
import View_strikerate from "./View_strikerate";
import View_bowledout from "./View_bowledout";
import View_figruns from "./View_figruns";
import View_over30 from "./View_over30";
import View_under20 from "./View_under20";
import View_1fa from "./View_1fa";
import View_2fa from "./View_2fa";
import View_3fa from "./View_3fa";
import View_4fa from "./View_4fa";
import View_5fa from "./View_5fa";
import View_6fa from "./View_6fa";

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class ShellBowling extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){
		if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	}

	render () {
			return (
				<section id="basicInfo">
							<Route exact path="/:playerid/bowling" component={View_Bowling_Home}/>
							<Route path="/:playerid/bowling/bowled" component={View_At_Bowling}/>
							<Route path="/:playerid/bowling/wickets" component={View_Wickets}/>
							<Route path="/:playerid/bowling/overs" component={View_Overs}/>
							<Route path="/:playerid/bowling/balls" component={View_balls}/>
							<Route path="/:playerid/bowling/economy" component={View_economy}/>
							<Route path="/:playerid/bowling/average" component={View_average}/>
							<Route path="/:playerid/bowling/strikerate" component={View_strikerate}/>
							<Route path="/:playerid/bowling/bowledout" component={View_bowledout}/>
							<Route path="/:playerid/bowling/figruns" component={View_figruns}/>
							<Route path="/:playerid/bowling/over30" component={View_over30}/>
							<Route path="/:playerid/bowling/under20" component={View_under20}/>
							<Route path="/:playerid/bowling/1fa" component={View_1fa}/>
							<Route path="/:playerid/bowling/2fa" component={View_2fa}/>
							<Route path="/:playerid/bowling/3fa" component={View_3fa}/>
							<Route path="/:playerid/bowling/4fa"  component={View_4fa}/>
							<Route path="/:playerid/bowling/5fa" component={View_5fa}/>
							<Route path="/:playerid/bowling/6fa" component={View_6fa}/>
				</section>
			)
  }

}