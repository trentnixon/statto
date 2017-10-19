import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

// Structure
import Shell_Top_Panel from "./Shell_TopPanel";
import Shell_Side_Panel from "./Shell_SidePanel";
import Keeping_Home from "./View_Keeping_Home";


//	<Shell_Top_Panel />
//<Keeping_Home />
@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class ShellKeeping extends React.Component {
	
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
					
					<div class="row">
						<h1>Coming Soon</h1>
					</div>
				</section>
			)
  }

}