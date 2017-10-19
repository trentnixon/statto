import React from "react";
import { connect } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

@connect((store) =>{
		return{
			UI: store.UI,
		}
	})
export default class NavBarLogo extends React.Component {

  componentWillMount(){ }
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){}
  
  render() {
    	if(this.props.UI.updateStatto == true)
			{
			return (
					<div id="UpdatingStatto">
						<h1>Statto is updating</h1>
						<h2><MuiThemeProvider><CircularProgress size={15} thickness={1} /></MuiThemeProvider></h2>
					</div>
   				 );
		}
		else
		{
			return (<div id="sattoIsUptoDate"></div>)	
		
		}
	}
}