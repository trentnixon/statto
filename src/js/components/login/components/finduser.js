import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import axios from 'axios';

import LoginForm from "./LoginForm";

var ShowCTA='Building Career',Registered=false;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING,
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})
	
export default class FindUser extends React.Component {
	
	componentWillMount(){ }
	shouldComponentUpdate(newProps, newState) { return true; }
	componentWillUpdate(nextProps, nextState){

		//console.log(this.props.UI.LMS_REGISTERED)
	
		if(nextProps.UI.PLAYER)
			{
				// need an UPDATE Player option in here soon
				Registered = nextProps.UI.PLAYER.Registered
				
				if(Registered == false)
					{
					ShowCTA=<Link to={nextProps.UI.PLAYER.AppURL} class="btn btn-success btn-block btn-lg">{nextProps.UI.PLAYER.BtnText}</Link>			
				}
				else if(Registered == true)
				{
			
					if(	nextProps.UI.items.Batting == true &&
						nextProps.UI.items.Facts == true &&
						nextProps.UI.items.Player == true &&
						nextProps.UI.items.Formguide == true
					)
					ShowCTA=<Link to={nextProps.UI.PLAYER.AppURL} class="btn btn-success btn-block btn-lg">{nextProps.UI.PLAYER.BtnText}</Link>		
			}
		}
	}
	
	render(){
	
	if(this.props.UI.PLAYER == null){
			return(
				<div><LoginForm {...this.props}/></div>
			)	
		}
	else
		{	
			return(
					<div>
						<h3>Player: {this.props.UI.PLAYER.UserName}</h3>
						<p>{this.props.UI.PLAYER.String}</p>
						{ShowCTA}
						<a href="/lms" class="pull-right"><i class="fa fa-undo" aria-hidden="true"></i></a>
					</div>
			)	
		}
	}
}