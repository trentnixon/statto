import React from "react";
import { connect } from "react-redux";

// Nav List
import NavList from "./Components/Nav-List";
	
@connect((store) =>{
		return{
			UI: store.UI,
			FACTS:store.BATTING,
			MYTEAMS:store.MYTEAMS
		}
	})		
export default class Layout extends React.Component {
  constructor() { super();  }
  
  componentWillMount(){ }
	 
  componentDidMount(){ 
  			handleSlimScroll()
  			handleSidebarMenu();
			handleMobileSidebarToggle();
			handleSidebarMinify();
			handleMobileSidebar();
	}
  
  shouldComponentUpdate(nextProps, nextState){ return true;}
  
  componentWillUpdate(nextProps, nextState){ }
  
  render() {
	  
	  	return (
				<div>
					<NavList {...this.props}/>
				</div>
			);
	}
}

