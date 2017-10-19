import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Line, Circle } from 'rc-progress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
// Globals


@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
			BATTING:store.BATTING
		}
	})
export default class FetchStattoData extends React.Component {

	
	constructor(props) {
    	super(props);
    	this.state = {
		  ButtonText: this.props.PrimaryText,
		  Found: 0,
		  Counting:0,
		};
	}
	
	componentWillMount(){ }
	  
	  
	  ScrapBatting(path) {
  			var userID = this.props.UI.PLAYER.LMSID

			// Fetch Data
			const request = axios.get("/lms/ajax/Merge_Data_to_Account.php?UserID="+userID+"&path="+path);
			request.then(({data}) =>{ 
			
			this.setState({ Found:data.length });

				var i=0, num=1;
				var GamesPlayed = data.length +1;	
				
				var intervalId = setInterval( function(){
						const request = axios.post("/lms/ajax/MergeGametoWP.php", data[i]);
							request.then(({data}) =>{ 
								
								//console.log(data);
										if(data.Added == true)
											{
												this.setState({ Counting:num, ButtonText: this.state.Counting +'/'+this.state.Found });
												//console.log(num,i)
												num++;
												i++
										}
							request.catch(function(reason) {
									// console.log(reason)
								})		
							request.catch((err) => {
							
								//console.log(err)
							  })				
						});	
						if(num == GamesPlayed){
								clearInterval(intervalId)
								//console.log('Stoped')
								this.setState({ ButtonText: 'Completed' });
								
							}
					}.bind(this),4000);
			})
	}
	
	onClickScrap(e) {  
				e.preventDefault(); 
				this.ScrapBatting(this.props.path);
				this.setState({
					  ButtonText: 'Searching'
					});
	}
	render () {
			return (
				<a href="#" onClick={this.onClickScrap.bind(this)} class="btn btn-primary m-r-5">
						{this.state.ButtonText}
				</a>
		)
  }
}