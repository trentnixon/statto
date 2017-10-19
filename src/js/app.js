import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import { Provider } from "react-redux";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
require( 'react-toastify/dist/ReactToastify.min.css'); 

// Styles
// Stylesheets
//require('../scss/app.scss');

// Components
// Get Login
import Login from "./components/login/";
import stage from "./stage";
import register from "./components/Register"
import Assign from "./components/assign/";

import store from "./store/store";

// Fetch Logged Players
const request = axios.get("/lms/ajax/Login-Users.php");
request.then(({data}) =>{ 
	store.dispatch({ type:"FETCH_WP_USER_DATA", payload:data })
});


const Statto = ({ match }) => (
  <Router >  	
    	<div id="page-container" class="page-sidebar-fixed page-header-fixed">
			<Route exact path="/" component={Login}/>
			<Route path="/:playerid" component={stage} />	
			<Route exact path="/register" component={register}/>
			<Route exact path="/assign/:playerid" component={Assign}/>
			<ToastContainer />
		</div>
  </Router>
)

const app = document.getElementById('app');
ReactDOM.render( <Provider store={store}><Statto /></Provider>,app);