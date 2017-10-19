import React from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

import {Register_Player_Name,Register_Player_WP_ID} from "../../../actions/";

const MSG = ({ name }) => <div>{name}</div>

export default class LoginHeader extends React.Component {

constructor() { super(); 
 
	this.state = {
			Status:'Searching For Player',
			Value:'Waiting'
		};
	  }

	ReturnToLogin() { this.props.history.push('/lms/'); }
	
	FetchPlayerName(userID)
		{
			const request = axios.get("/lms/ajax/RegisterNewPlayer.php?UserID="+userID);
			request.then(({data}) =>{ 
			
					if(data.PlayerName != '')
						{
							this.setState({
								 Status:'Registering', 
								 Value : data.PlayerName,
							})
							this.props.dispatch(Register_Player_Name(data.PlayerName));
							this.props.dispatch(Register_Player_WP_ID(data.user_id));
						}
					else{
						const options = {
							onOpen: props => console.log(props.foo),
							onClose: this.ReturnToLogin(),
							autoClose: 6000
						};
							toast(<MSG name="No User for this ID. Please check the ID with the LMS website and try again" />,options);
						}			
				});
	}


	componentWillMount(){ 
		this.FetchPlayerName(this.props.Player.LMSID)
		this.setState({ Value : this.props.Player.LMSID })
	}

	render(){
		return(
			<div> <h3>{this.state.Status} : {this.state.Value}</h3> </div>
		)
	}			
}