import React from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900,orange500} from 'material-ui/styles/colors';
var _ = require('lodash');

import Team_Stats from "./Team_Stats";
import Player_batting_roster from "./player_batting_roster";
import Player_bowling_roster from "./player_bowling_roster";
import GameData from "./GameData";

let DisplayTeamRoster=[],HoldPlayerRoster=[], SavePlayerRoster=[], InningsArray=[], favoredBattingPosition=0, CommonDismissal='', Innings=0, fifties=0, HS=0,NotOut=0 ;


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  inkBar:{ backgroundColor:orange500},
  tabColor:{ backgroundColor:'#242a30'},
  Container:{ paddingTop:'20px'}
};


export default class PlayerRoster extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  value: 'a',
		};
	  }
	
	handleChange = (value) => {
    	this.setState({
    	  value: value,
    	});
  	};
	
	CreatePlayerRoster(ScoreCards)
		{

			SavePlayerRoster=[], DisplayTeamRoster=[], HoldPlayerRoster=[];
			
			ScoreCards.map((Scorecard,i)=>{
			
				Scorecard.MyTeamScorecard.map((player,i)=>{
					
					var index = _.findIndex(SavePlayerRoster, {id: player.Player_ID});
					
					if(index == -1)
						{
									Innings = 0, fifties=0, HS=0,NotOut=0;
					
									if(player.How_Out == 'Not out'){ NotOut = 1; }
									if(player.How_Out != 'NA'){ Innings = 1; }
					
									if( parseInt(player.Runs)  > 49 ){ fifties =1;}
									if( parseInt(player.Runs)  > HS ){ HS =  parseInt(player.Runs);}
									
									SavePlayerRoster.push({
											id:player.Player_ID, 
											Stats:{
													Name:player.Player_Name,
													GamesPlayed:1,
													batting_position:[player.batting_position],
													Balls_Faced:parseInt(player.Balls_Faced),
													Runs:parseInt(player.Runs),
													StrikeRate:parseInt(player.StrikeRate),
													How_Out:[player.How_Out],
													Overs_Bowled:parseInt(player.Overs_Bowled),
													runs_conceded:parseInt(player.runs_conceded),
													Wickets:parseInt(player.Wickets),
													Innings:Innings,
													NotOut:NotOut,
													fifties:fifties,
													HS:HS
												}
											}
									)
							}
							else if(index != -1)
								{
									let UpdatePlayer = SavePlayerRoster[index].Stats;
									// If index is present, update values
									UpdatePlayer.GamesPlayed = UpdatePlayer.GamesPlayed + 1;
									// Batting
									// Position
									UpdatePlayer.batting_position.push(player.batting_position);
									// Balls Faced
									UpdatePlayer.Balls_Faced = UpdatePlayer.Balls_Faced + parseInt(player.Balls_Faced);
									// Runs Scored
									UpdatePlayer.Runs = UpdatePlayer.Runs + parseInt(player.Runs);
									// How Out
									UpdatePlayer.How_Out.push(player.How_Out);
									// Num Bat
									
									if(player.How_Out == 'Not out'){ UpdatePlayer.NotOut = UpdatePlayer.NotOut + 1; }
									if(player.How_Out != 'NA'){ UpdatePlayer.Innings = UpdatePlayer.Innings + 1; }
									
									//fifties
									if( parseInt(player.Runs)  > 49 ){ UpdatePlayer.fifties = UpdatePlayer.fifties + 1;}
									
									// HS
									if( parseInt(player.Runs)  > UpdatePlayer.HS ){ UpdatePlayer.HS =  parseInt(player.Runs);}
									
									// Bowling
									// Overs
									UpdatePlayer.Overs_Bowled = UpdatePlayer.Overs_Bowled + parseInt(player.Overs_Bowled);
									// Wickets
									UpdatePlayer.Wickets = UpdatePlayer.Wickets + parseInt(player.Wickets);
									// runs_conceded
									UpdatePlayer.runs_conceded = UpdatePlayer.runs_conceded + parseInt(player.runs_conceded);
							}	
						})
				})
			
			return SavePlayerRoster;
	}

  shouldComponentUpdate(nextProps, nextState){ return true;}	
  componentWillMount(){ 
  	if(this.props.Results != false){ SavePlayerRoster = this.CreatePlayerRoster(this.props.Results["0"].Filtered_Scorecards)} }
  componentWillUpdate(nextProps, nextState){   
  	if(nextProps.Results != false){ SavePlayerRoster = this.CreatePlayerRoster(nextProps.Results["0"].Filtered_Scorecards)} }
  
  render() {
	return (
		<div>
			<Team_Stats playerRoster={SavePlayerRoster} />
			
			<h1 class="page-header">Player Roster and Scorecards</h1>
			<MuiThemeProvider>
					  <Tabs
						value={this.state.value}
						onChange={this.handleChange}
						inkBarStyle={styles.inkBar}
						tabItemContainerStyle={styles.tabColor}
						contentContainerStyle={styles.Container}
					  >
						<Tab label="Batting" value="a" >
						  <div>
						  <Player_batting_roster playerRoster={SavePlayerRoster} />
						  </div>
						</Tab>
						
						<Tab label="Bowling" value="b">
						  <div>
							<Player_bowling_roster playerRoster={SavePlayerRoster} />
						  </div>
						</Tab>
						
						<Tab label="Results" value="c">
						  <div>
							<GameData  Results={this.props.Results["0"].Filtered_Scorecards} {... this.props}/>
						  </div>
						</Tab>
						
					  </Tabs>
				  </MuiThemeProvider>	
		</div>	
    );
  }
}