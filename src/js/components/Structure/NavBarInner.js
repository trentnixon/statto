import React from "react";


import NavBarLogo from "./Components/Nav-Bar-Logo";
import NavBarSearchBar from "./Components/Nav-Bar-SearchBar";
import NavBarSearchIcon from "./Components/Nav-Bar-SearchIcon";

	
export default class Layout extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){  }
   
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ }
  
  render() {
    
	return (
		<div>
      		<NavBarLogo /> 
			<NavBarSearchIcon {...this.props}/>
		</div>
    );
  }
}