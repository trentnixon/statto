import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {orange500, blue500} from 'material-ui/styles/colors';
import {FindPlayersStats, SetLiveStats, CreateUserUI,SetSearchBar, SetStatto } from "../../../actions/";
import {Calculate_Achievements,Set_Achievements} from "../../../actions/Achievements"

// <MuiThemeProvider><CircularProgress size={15} thickness={1} /></MuiThemeProvider>
const dataSourceConfig = {
  text: 'username',
  value: 'LMSID',
};
const MSG = ({ name }) => <div>{name}</div>
const styles = {
	submitButton:{
		marginTop:'15px'
	},
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  MainColor:{
	color:'#666666',
	
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

  constructor() { super(); 
  	
	this.state = {
			FormButton:'Find a Player'
		};
  	}	
		
	CheckValue(value){
		var ReturnValue = false;
		if(isNaN(parseInt(value))){
				let FindInmerged = Object.assign(...this.props.UI.LMS_REGISTERED);
				FindInmerged.map((user,i)=>{
					if(user.username == value)
						{
						
							ReturnValue = user.LMSID;
							//process = true;
					}					
				})
			}
		else{
				ReturnValue = value;
			}
		return ReturnValue;
	}
		
		
	handleSubmit(event) {
		
		event.preventDefault();
		var UserID = jQuery("form#PlayerID").find('#id').val();	
		this.setState({
     			FormButton : <MuiThemeProvider><CircularProgress size={15} thickness={1} /></MuiThemeProvider>
    		})
		
		this.props.dispatch(SetStatto(true));
		
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
	
	
	componentWillMount(){
		let merged = Object.assign(...this.props.UI.LMS_REGISTERED);
		dataSource3 = merged
	 }
	shouldComponentUpdate(newProps, newState) { return true; }

	componentWillUpdate(nextProps, nextState){
			let merged = Object.assign(...nextProps.UI.LMS_REGISTERED);
			dataSource3 = merged
		}
		
		
	
	render(){
			return(
					<form class="margin-bottom-0" id="PlayerID" onSubmit={this.handleSubmit.bind(this)}>
						<div class="col-md-9">	
							<div class="form-group">
							<MuiThemeProvider>
								<AutoComplete
									  hintText="Statto Registered Players only"
									  dataSource={dataSource3}
									  dataSourceConfig={dataSourceConfig}
									  filter={AutoComplete.caseInsensitiveFilter}
									  onUpdateInput={this.handleUpdateInput}
									  floatingLabelText="Search for a Player"
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
						</div>
						<div class="col-md-2" style={styles.submitButton}>
							<button type="submit" class="btn btn-success btn-block btn-lg">{this.state.FormButton}</button>
						</div>
					</form>
			
		)
	}
}