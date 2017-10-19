import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import FindUser from "./components/finduser";
import LoginHeader from "./components/LoginHeader";
var load = require("little-loader");

load("/lms/wp-content/themes/twentyseventeen-child/assets/plugins/pace/pace.min.js", function (err) { });

let Header, SubHeader;

@connect((store) =>{
		return{
			UI: store.UI
			}
	})
export default class Login extends React.Component {
  constructor() { super();  }
 
  shouldComponentUpdate(NewProps, NewState){ return true;}
  
 componentWillMount(){
		Header = this.props.UI.items.SiteName;
		SubHeader = this.props.UI.items.SubHeader;
	}	
	
  componentWillUpdate(NewProps, NewState){
			Header = NewProps.UI.items.SiteName;
		}

  render() {
	return (
	
		<div id="page-container">
			<div class="login bg-black animated fadeInDown">
				<LoginHeader Header={Header} SubHeader={SubHeader}/>  
				<div class="login-content">
				  <FindUser />
				</div>
			</div>
		</div>
    );
  }
}