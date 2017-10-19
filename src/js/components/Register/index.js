import React from "react";
import { connect } from "react-redux";

import RegisterHeader from "./components/RegisterHeader";
import RegisterPlayerName from "./components/RegisterPlayerName"
import FetchPlayerData from "./components/FetchData"

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING,
			ACHIEVEMENTS: store.ACHIEVEMENTS
		}
	})
	
export default class Login extends React.Component {
  	
	constructor() { super(); }
	
 	componentWillMount(){ }	
	shouldComponentUpdate(NewProps, NewState){ return true;}
	componentWillUpdate(NewProps, NewState){}

  render() {
	
 
	return (
		<div id="page-container" >
			<div class="login bg-black animated fadeInDown">
				<RegisterHeader Header={this.props.UI.items.SiteName} SubHeader={this.props.UI.items.SubHeader}/>  
					<div class="login-content">
						<RegisterPlayerName  {...this.props}  Player={this.props.UI.PLAYER} />
						<FetchPlayerData  Player={this.props.UI.PLAYER} />
					</div>
			</div>
		</div>
    );
  }
}