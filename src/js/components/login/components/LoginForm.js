import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {orange500, blue500} from 'material-ui/styles/colors';
import {FindPlayersStats, SetLiveStats, CreateUserUI} from "../../../actions/";
import {Calculate_Achievements,Set_Achievements} from "../../../actions/Achievements"


const dataSourceConfig = {
  text: 'username',
  value: 'LMSID',
};
const MSG = ({ name }) => <div>{name}</div>
const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  MainColor:{
	color:'#fff',
	
 },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};
var dataSource3 = [],  process=false, msg='';


export default class LoginForm extends React.Component {
	
	componentWillMount(){ }
	shouldComponentUpdate(newProps, newState) { return true; }

	componentWillUpdate(nextProps, nextState){
			let merged = Object.assign(...nextProps.UI.LMS_REGISTERED);
			dataSource3 = merged
		}
		
	CheckValue(value){
		
		var ReturnValue = false;
		if(isNaN(parseInt(value))){
				//console.log("This is TEXT")
				let FindInmerged = Object.assign(...this.props.UI.LMS_REGISTERED);
				FindInmerged.map((user,i)=>{
					if(user.username == value)
						{
							//console.log("Match Found");
							ReturnValue = user.LMSID;
							//process = true;
					}					
				})
			}
		else{
				//console.log("This is a Number")
				ReturnValue = value;
			}
		return ReturnValue;
	}
		
		
	handleSubmit(event) {
		
		event.preventDefault();
		var UserID = jQuery("form#PlayerID").find('#id').val();	
		
		
		var processID = this.CheckValue(UserID)	

		if(processID != false)
			{
				const request = axios.get("ajax/FetchPlayerDetails.php?UserID="+processID);
				request.then(({data}) =>{ 
						this.props.dispatch(FindPlayersStats(data.UserID));
						this.props.dispatch(CreateUserUI(data));
						this.props.dispatch(SetLiveStats());		
				});
			}
		else if(processID == false)
			{
					const options = {
							onOpen: props => console.log(props.foo),
							onClose: props => console.log(props.foo),
							autoClose: 6000
						};
					 toast(<MSG name="Player Name not found. To Register new Player use the LMS Player ID found at the LMS Website" />,options);
		}
	}
	
	render(){
			return(
			<form class="margin-bottom-0" id="PlayerID" onSubmit={this.handleSubmit.bind(this)}>
					<div class="form-group m-b-20">
					<MuiThemeProvider>
						<AutoComplete
							  hintText="Use the LMS Player ID to register a new Player"
							  dataSource={dataSource3}
							  dataSourceConfig={dataSourceConfig}
							  filter={AutoComplete.caseInsensitiveFilter}
							  onUpdateInput={this.handleUpdateInput}
							  floatingLabelText="LMS Player ID or Registered Name"
							  fullWidth={true}
							  id="id"
							  name="id"
							  underlineStyle={styles.underlineStyle}
							  floatingLabelFocusStyle={styles.MainColor}
							  floatingLabelShrinkStyle={styles.MainColor}
							  floatingLabelStyle={styles.MainColor}
							  inputStyle={styles.MainColor}
							/>
					</MuiThemeProvider>
					<p>{msg}</p>
					</div>
					<button type="submit" class="btn btn-success btn-block btn-lg">Submit</button>
			</form>
			
		)
	}
}