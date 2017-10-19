import React from "react";
import {  Link } from 'react-router-dom';
import { connect } from "react-redux";

import NavInner from "./NavBarinner";
import NavBarSeach from "./NavBarSearch";

let DisplayBar;
@connect((store) =>{
		return{
			UI: store.UI,
			FACTS:store.BATTING,
			BATTING:store.BATTING,
		}
	})		
export default class Layout extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){}
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ }
  
  render() {
    	if(this.props.UI.SearchBar == true){ DisplayBar = <NavBarSeach  {...this.props} />}
		else if(this.props.UI.SearchBar == false){ DisplayBar = <NavInner {...this.props}/>}
	return (
		<div id="header" class="header navbar navbar-default navbar-fixed-top">
      		<div class="container-fluid">
				{DisplayBar}
			</div>
		</div>
    );
  }
}