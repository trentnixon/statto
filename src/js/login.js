import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Provider } from "react-redux";
import axios from 'axios';

// Styles
// Stylesheets
//require('../scss/app.scss');


// Get Structure
import NavBar from "./components/Structure/NavBar";
import SideBar from "./components/Structure/SideBar";

// Get Login
import Login from "./components/login/";


// Components
import Layout from "./components/";
import Achievements from "./components/Achievements"
import History from "./components/History/";
import vs from "./components/vs";
import ByYear from "./components/ByYear";
import Batting from "./components/Batting/Structure/Shell_Batting";
import BattingAdvanced from "./components/Batting/Structure/Shell_Batting_Advanced";
import Bowling from "./components/Shell_Bowling";
import Keeping from "./components/Shell_Keeping";
import Team from "./components/Team";
import Contribution from "./components/Contribution";

// DEV Components
import dataTables from "./components/data-tables";

import store from "./store/store";

// Fetch data from here!!!!!
//store.dispatch({ type:"FETCH_DATA", payload: store) })

const app = document.getElementById('app');

const Statto = () => (
  <Router>  	
    	<div>
			<NavBar Version="Beta 1.0"/>
			<SideBar />
				<div class="container-fluid">
					<div id="content" class="content">
     			 		<Route exact path="/lms/app" component={Layout}/>
						<Route path="/lms/app/data" component={dataTables}/>
						<Route path="/lms/app/achievements" component={Achievements}/>
						<Route path="/lms/app/history" component={History}/>
						<Route path="/lms/app/vs" component={vs}/>
						<Route path="/lms/app/ByYear" component={ByYear}/>
      					<Route path="/lms/app/batting" component={Batting}/>
						<Route path="/lms/app/battingAdvanced" component={BattingAdvanced}/>
						<Route path="/lms/app/bowling" component={Bowling}/>
						<Route path="/lms/app/keeping" component={Keeping}/>
						<Route path="/lms/app/Team" component={Team}/>
						<Route path="/lms/app/Contribution" component={Contribution}/>
   				</div>
			</div>
		</div>
  </Router>
)


ReactDOM.render( <Provider store={store}><Statto /></Provider>,app);