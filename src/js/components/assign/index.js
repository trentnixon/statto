import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import {FindPlayersStats, SetLiveStats, CreateUserUI} from "../../actions/";
import LoginHeader from "../login/components/LoginHeader";


// Fetch Logged Players
import store from "../../store/store";
const request = axios.get("/lms/ajax/Login-Users.php");
request.then(({data}) =>{ 
	store.dispatch({ type:"FETCH_WP_USER_DATA", payload:data })
});



let Header, SubHeader;
@connect((store) =>{
		return{
			UI: store.UI,
		}
	})
	
export default class Layout extends React.Component {
  constructor() { super(); 
  	
	this.state = {
			rostered:false,
			Searching:false,
			PlayerName:false
			
		};
  }
  componentWillMount(){ 
	Header = this.props.UI.items.SiteName;
	SubHeader = this.props.UI.items.SubHeader;
	this.setState({ PlayerName:this.props.playerid })
  }
  
  UpdateUIState(PlayerID)
		{
		const request = axios.get("/lms/ajax/FetchPlayerDetails.php?UserID="+PlayerID);
				request.then(({data}) =>{ 
						this.props.dispatch(FindPlayersStats(data.UserID));
						this.props.dispatch(CreateUserUI(data));
						this.props.dispatch(SetLiveStats());	
				});
	
	}
  
  findplayer(PlayerRoster, PlayerID)
  	{
			PlayerRoster.map((player,i)=>{
				
				if(player.LMSID == PlayerID)
					{	
						this.setState({ Searching:true,PlayerName:player.username  })
						this.UpdateUIState(PlayerID)
				}
			})
		}
  
  
  shouldComponentUpdate(NewProps, NewState){ return true;}
  
  componentWillUpdate(NewProps, NewState){ 

		if(NewProps.UI.LMS_REGISTERED && this.state.Searching == false)
			{
				this.findplayer(NewProps.UI.LMS_REGISTERED["0"], this.props.playerid);		
		}	 
	}
  
  render() {
		return (
				
				<div id="page-container">
			<div class="login bg-black animated fadeInDown">
				<LoginHeader Header={Header} SubHeader={SubHeader}/>  
				<div class="login-content">
					<h5>Fetching Profile : {this.state.PlayerName} <MuiThemeProvider><CircularProgress size={15} thickness={1} /></MuiThemeProvider> </h5>			
				</div>
			</div>
		</div>
		);  
  }
}