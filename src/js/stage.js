import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { connect } from "react-redux";
import axios from 'axios';

// Styles
// Stylesheets
//require('../scss/app.scss');


// Get Structure
import NavBar from "./components/Structure/NavBar";
import SideBar from "./components/Structure/SideBar";
import UpdatingApp from "./components/Structure/UpdatingApp";


// Get Login
import Login from "./components/login/";
// Get Assign
import Assign from "./components/assign/";

// Components
import Layout from "./components/Home/";
import Achievements from "./components/Achievements/"
import History from "./components/History/";
import vs from "./components/vs/";
import ByYear from "./components/ByYear/";
import ByPlayedFor from "./components/By_PlayedFor";
import ByGround from "./components/ByGround";
import ByUmpire from "./components/ByUmpire";
import Batting from "./components/Batting/Structure/Shell_Batting";
import Bowling from "./components/Bowling/Structure/Shell_Bowling";
import Keeping from "./components/Keeping/Shell_Keeping";
import Team from "./components/Team";
import Contribution from "./components/Contribution";
import MyStatto from "./components/MyStatto";
import ChangePlayer from  "./components/ChangePlayer";
import ChangeLog from "./components/ChangeLog";
import MyClubs from "./components/Teams/";
import Coltsoppo from "./components/coltsoppo/";
// DEV Components
import dataTables from "./components/data-tables";


const Stage_Router = ({ match }) => (
  <Router basename="/lms/#" >  	
    	<div>
			<NavBar />
			<UpdatingApp />
			<SideBar Version="Beta.28"/>
				<div id="content" class="content">
     			 		<Route exact path="/:playerid" component={Layout}/>
						<Route path="/:playerid/data" component={dataTables}/>
						<Route path="/:playerid/achievements" component={Achievements}/>
						<Route path="/:playerid/history" component={History}/>
						<Route path="/:playerid/vs" component={vs}/>
						<Route path="/:playerid/ByYear" component={ByYear}/>
						<Route path="/:playerid/Byfor" component={ByPlayedFor}/>
						<Route path="/:playerid/ByGround" component={ByGround}/>
						<Route path="/:playerid/ByUmpire" component={ByUmpire}/>
      					<Route path="/:playerid/batting" component={Batting}/>
						<Route path="/:playerid/bowling" component={Bowling}/>
						<Route path="/:playerid/keeping" component={Keeping}/>
						<Route path="/:playerid/Team" component={Team}/>
						<Route path="/:playerid/Contribution" component={Contribution}/>
						<Route path="/:playerid/mystatto" component={MyStatto}/>
						<Route path="/:playerid/changeplayer" component={ChangePlayer}/>
						<Route path="/:playerid/changelog" component={ChangeLog}/>
						<Route path="/:playerid/myClub/:teamid" component={MyClubs}/>
						<Route path="/:playerid/coltsoppo" component={Coltsoppo}/>
   				</div>
		</div>
  </Router>
)

@connect((store) =>{
		return{
			UI: store.UI
		}
	})	
export default class MainStage extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){ 
  		//console.log(this.props.match.params.playerid, this.props)
  }
  
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){
	 	//console.log(this.props.match.params.playerid, this.props.UI.items.Player) 
	 }
  
  render() {
	 
	  	if( this.props.UI.items.Player == true && 
			this.props.UI.items.Facts == true &&
			this.props.UI.items.Batting
		)
			{ return ( <Stage_Router /> ); }
	  	else
			{
			return ( <Assign path={this.props.location.pathname} playerid={this.props.match.params.playerid}/> ); 
		}
	}
}