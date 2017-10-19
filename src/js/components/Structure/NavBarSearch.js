import React from "react";

import NavBarSearchClose from "./Components/Nav-Bar-SearchClose";
import PlayerSearchForm from "./Components/Nav-Bar-Search-Form";

export default class SearchFrom extends React.Component {

  componentWillMount(){}
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
   componentWillUpdate(nextProps, nextState){}
  
  render() {
    
	return (
		<div>
			<PlayerSearchForm {...this.props} />
			<NavBarSearchClose {...this.props}/>
		</div>
    );
  }
}