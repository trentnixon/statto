import React from "react";

import {FetchMissingGames, Team_Missing_Games } from "../../../actions/";

let MissingIDs=[], missing=0, displayUI;

export default class Fetch_Missing_Games extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
		  Missing:0,
		};
	  }
  
  FetchMissingGames(IDS,SCORECARDS) { 
  	
	console.log(IDS,SCORECARDS);
	MissingIDs=[];
	
	IDS.map((id,i)=>{
				let index = _.findIndex(SCORECARDS, {Gameid: id.GameID});
				//
				//console.log(index);
				if(index == -1){
					MissingIDs.push(id.GameID);
					
				}
			})
  
  	console.log(MissingIDs);
	FetchMissingGames(MissingIDs)
	this.setState({ Missing: MissingIDs.length});
  	
  }
  
  componentWillMount(){ 
  		console.log("Missing Game Count ",this.props.Results[1].Filtered_IDS.length, this.props.Results["0"].Filtered_Scorecards.length )
		if(this.props.Results[1].Filtered_IDS.length != this.props.Results["0"].Filtered_Scorecards.length)
			{
				this.FetchMissingGames(this.props.Results[1].Filtered_IDS,this.props.Results["0"].Filtered_Scorecards)
				
		}
		else{
		}
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
  	componentWillUpdate(nextProps, nextState){}

  render() {
	  if(this.state.Missing != 0){ displayUI=<MissingDisplay Missing={this.state.Missing} />}
	  else{ displayUI='';}
	return (
		<div> {displayUI} </div>	
    );
  }
}


class MissingDisplay extends React.Component {

  componentWillMount(){ }
  shouldComponentUpdate(nextProps, nextState){ return true;}
  componentWillUpdate(nextProps, nextState){ }
  
  render() {
	return (
		<div class="container-fluid nopadding">
			<div class="alert alert-warning fade in m-b-15"> 
				Statto is fetching the <strong>{this.props.Missing}</strong> missing Games. <br /> <small>This process may take some time
				</small> 
			</div> 
		</div>	
    );
  }
}