import React from "react";


export default class NavBarearchBar extends React.Component {

  componentWillMount(){}
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
   componentWillUpdate(nextProps, nextState){}
  
  render() {
    
	return (
		<li><a href="javascript: void(0)">{this.state.Searching} <span> {this.state.Status}   </span></a></li>
    );
  }
}