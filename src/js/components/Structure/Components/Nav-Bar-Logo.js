import React from "react";
import {  Link } from 'react-router-dom';

export default class NavBarLogo extends React.Component {

  componentWillMount(){}
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
   componentWillUpdate(nextProps, nextState){}
  
  render() {
    
	return (
		<div class="navbar-header">
					<div class="row">
					<span class="logo"><Link to=""><img style={{width: 50}} src="/lms/wp-content/themes/twentyseventeen-child/img/SiteLogo.png" /></Link></span>

					<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					</div>
					
				</div>
    );
  }
}