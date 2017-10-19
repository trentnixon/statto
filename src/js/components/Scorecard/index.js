import React from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,orange500} from 'material-ui/styles/colors';

var _ = require('lodash');

import Scorecard_Header from "./Components/Scorecard_Header";
import Scorecard_Details from "./Components/Scorecard_Details";
import Scorecard_Summary from "./Components/Scorecard_Summary";
import Scorecard_Close from "./Components/Scorecard_Close";

let First_Innings_Batting, First_Innings_Bowling, Second_Innings_Batting,Second_Innings_Bowling, Result_First_Innings, Result_Second_Innings, FirstAddedScores=0, SecondAddedScores=0;	 

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  inkBar:{ backgroundColor:orange500},
  tabColor:{ backgroundColor:'#2a72b5'},
  Container:{ paddingTop:'3px'}
};

export default  class Scorecard extends React.Component {

	constructor() { 
		super();
		this.state = {
			value: 'a',
			gameSet:false,
			Game:{
				TeamA:false,
				TeamB:false,
				Venue:false,
				Umpire:false,
				Winner:false,
				Summary:false
				
			},
			First:{
				overs:false,
				runs:false,
				wickets:false,
				TeamName:false
				},
			Second:{
				overs:false,
				runs:false,
				wickets:false,
				TeamName:false
				},
		};
	 }
 
 
 	handleChange = (value) => {
    	this.setState({
    	  value: value,
    	});
  	};
  

	CreateBattingRow(player)
		{
			//console.log(player.Player_Name)
			let Runs, SR;
			if(player.Runs > 49){ Runs = <span class="performance_great"> {player.Runs} </span> }
			else if(player.Runs > 29){Runs = <span class="performance_good"> {player.Runs} </span>}
			else{Runs = player.Runs }
			
			if(player.StrikeRate > 199){ SR = <span class="performance_great"> {player.StrikeRate} </span> }
			else if(player.StrikeRate < 1001){SR = <span class="performance_poor"> {player.StrikeRate} </span>}
			else{SR = player.StrikeRate }
			
			return(
				<div>
					<div class="col-md-9 col-xs-6 nopadding"> {player.batting_position}. <h2>{player.Player_Name}</h2> <span>{player.How_Out} </span>   </div>
					
					<div class="col-md-1 col-xs-2"> {Runs} </div>
					<div class="col-md-1 col-xs-2"> {player.Balls_Faced} </div>
					<div class="col-md-1 col-xs-2"> {SR} </div>
				</div>
			)
		}

	CreateBowlingRow(player)
		{
			let wickets, Runs, E;
			if(player.Wickets > 1){ wickets = <span class="performance_great"> {player.Wickets} </span> }
			else{wickets = player.Wickets }
			
			if(player.runs_conceded > 29){ Runs = <span class="performance_poor"> {player.runs_conceded} </span> }
			else{Runs = player.runs_conceded }
			
			if(player.Economy < 6){ E = <span class="performance_great"> {player.Economy} </span> }
			else if(player.Economy > 7){ E = <span class="performance_poor"> {player.Economy} </span> }
			else{E = player.Economy }
			
			return(
				<div>
					<div class="col-md-8 col-xs-6 nopadding"> <h2>{player.Player_Name}</h2>   </div>
					<div class="col-md-1 col-xs-1"> {wickets} </div>
					<div class="col-md-1 col-xs-1"> {Runs} </div>
					<div class="col-md-1 col-xs-2"> {player.Overs_Bowled} </div>
					<div class="col-md-1 col-xs-2"> {E} </div>
				</div>
			)
	
	}

	createScoreCard(data)
		{		
				this.setState({
						gameSet:data["0"].id,
						Game:{
							TeamA:data["0"].meta.Batted_First["0"],
							TeamB:data["0"].meta.Batting_Second["0"],
							Venue:data["0"].meta.Venue["0"],
							Umpire:data["0"].meta.Umpire["0"],
							Winner:data["0"].meta.Winner_Name["0"],
							Summary:data["0"].meta.Winner_Summary["0"],
							MOM:data["0"].meta.MOM["0"],
						},
						First:{
							overs:data["0"].meta.First_Overs["0"],
							runs:data["0"].meta.First_Score["0"],
							wickets:data["0"].meta.First_Wickets["0"],
							TeamName:data["0"].meta.Batted_First["0"]	
							},
						Second:{
							overs:data["0"].meta.Second_Overs["0"],
							runs:data["0"].meta.Second_Score["0"],
							wickets:data["0"].meta.Second_Wickets["0"],
							TeamName:data["0"].meta.Batting_Second["0"]	
						}
					})

			
			let JsonFirstInnings = JSON.parse("["+data["0"].meta["1st_Innings"]["0"]+"]");
			let JsonSecondInnings = JSON.parse("["+data["0"].meta["2nd_Innings"]["0"]+"]");
			
			
			Result_First_Innings = _.map(JsonFirstInnings[0]).map(function(x) {
			  return _.assign(x, { batting_position: x.batting_position });
			});
			Result_Second_Innings = _.map(JsonSecondInnings[0]).map(function(x) {
			  return _.assign(x, { batting_position: x.batting_position });
			});
			
			
			/*Create scorecard*/
			/* First innings */
				/*Batting*/
			FirstAddedScores=0;
			First_Innings_Batting = Result_First_Innings.map((player,i)=>{
				if(player.batting_position != 0){
						//console.log(player)
						FirstAddedScores = FirstAddedScores+ parseInt(player.Runs);
					return(
						<div key={i} class="scoreCardRow">
								{this.CreateBattingRow(player)}
						</div>
						)	
					}
				})
			console.log(FirstAddedScores)
				/*Bowling*/
			
			First_Innings_Bowling = Result_Second_Innings.map((player,i)=>{
				if(player.Overs_Bowled != '0.0'){
					return(
						<div key={i} class="scoreCardRow ">
								{this.CreateBowlingRow(player)}
						</div>
						)	
					}
				})
			
			
			/*Second Innings*/
				/*Batting*/
			SecondAddedScores=0;
			Second_Innings_Batting = Result_Second_Innings.map((player,i)=>{
				if(player.batting_position != 0){
					SecondAddedScores = SecondAddedScores + parseInt(player.Runs);
					return(
						<div key={i} class="scoreCardRow ">
								{this.CreateBattingRow(player)}
						</div>
						)	
					}
				})
				/*Bowling*/
			console.log(SecondAddedScores)
			Second_Innings_Bowling = Result_First_Innings.map((player,i)=>{
				if(player.Overs_Bowled != '0.0'){
					return(
						<div key={i} class="scoreCardRow ">
								{this.CreateBowlingRow(player)}
						</div>
						)	
					}
				})
	}


	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	componentWillUpdate(nextProps, nextState){ 
		
		if(nextProps.data){
			console.log("Scorecard Index", nextProps.data)
			if(this.state.gameSet != nextProps.data["0"].id) { this.createScoreCard(nextProps.data) }
		}
	}
	

	render () { 
			if(this.state.gameSet == false){
				return (
						<div class="modal modal-message ScoreCard fade" id="modal-message">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-body">
									<h4>Profile Updating</h4>
									<p>Statto is currectly updating your game data, This may take some time depending on the number of LMS games completed.</p> 
									<p> Please check back once this process has completed.</p>
								</div>
							</div>
						</div>
						</div>
				
				)
			}
			else if(this.state.gameSet != false){
			return (
					<div class="modal modal-message ScoreCard fade" id="modal-message">
						<div class="modal-dialog">
							<div class="modal-content">
								<Scorecard_Header 
											TeamA = {this.state.Game.TeamA}
											TeamB = {this.state.Game.TeamB}
											Venue = {this.state.Game.Venue}
											Umpire = {this.state.Game.Umpire}
										/>
								
									<div class="modal-body">
									
									<MuiThemeProvider>
										<Tabs
        									value={this.state.value}
											onChange={this.handleChange}
											inkBarStyle={styles.inkBar}
											tabItemContainerStyle={styles.tabColor}
											contentContainerStyle={styles.Container}
      									>
											<Tab label={this.state.First.TeamName +'     '+ this.state.First.runs +'/'+this.state.First.wickets} value="a">
											  <div>
													<Scorecard_Details 
													Team={this.state.First.TeamName}
													Runs={this.state.First.runs}
													Wickets={this.state.First.wickets}
													Overs={this.state.First.overs}
													Batting={First_Innings_Batting}
													Bowling={First_Innings_Bowling}
													AddedScore={FirstAddedScores}
													DisplayClass="panel panel-primary"
													/>
											  </div>
											</Tab>
											<Tab label={this.state.Second.TeamName +'     '+ this.state.Second.runs +'/'+this.state.Second.wickets} value="b">
											  <div>
													<Scorecard_Details 
													Team={this.state.Second.TeamName}
													Runs={this.state.Second.runs}
													Wickets={this.state.Second.wickets}
													Overs={this.state.Second.overs}
													Batting={Second_Innings_Batting}
													Bowling={Second_Innings_Bowling}
													AddedScore={SecondAddedScores}
													DisplayClass="panel panel-primary"
													/>
											  </div>
											</Tab>
									  </Tabs>
									</MuiThemeProvider>
											
											<Scorecard_Summary 
												Winner={this.state.Game.Winner}
												Summary={this.state.Game.Summary}
												MOM={this.state.Game.MOM}
											/>
										</div>
										<Scorecard_Close />
									</div>
						</div>
					</div>
				)
			}
	}
}