import React from "react";

import {SetSearchBar} from "../../../actions/";

export default class NavBaricon extends React.Component {

  ShowSearchBar(){
	  this.props.dispatch(SetSearchBar(true));
	 }
 
  componentWillMount(){}
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){}
  
  render() {
    
	return (
		<ul class="nav navbar-nav navbar-right hidden-xs">
					<li>
						 <a href="javascript: void(0)" onClick={this.ShowSearchBar.bind(this) } class="icon notification waves-effect waves-light" data-toggle="navbar-search"><i class="material-icons">search</i></a>
					</li>
				</ul>
    );
  }
}