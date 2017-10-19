import React from "react";

import Player_roster_widget from "./player_roster_widget";

// Arrays
let SortArray=[];
// Batting
let Total_Runs=0,Total_Balls_Faced=0,Total_fifties=0,Total_Innings=0, wicketsLost;
// Bowling
let Total_Over=0,Total_wickets=0,Bowling_Runs; 

export default class Team_Stats extends React.Component {

 frequency(obj)
		{
			let frequency = {};  // array of frequency.
			let max = 0;  // holds the max frequency.
			let result;   // holds the max frequency element.
			for(let v in obj) {
			frequency[obj[v]]=(frequency[obj[v]] || 0)+1; // increment frequency.
			if(frequency[obj[v]] > max) { // is this frequency > max so far ?
				max = frequency[obj[v]];  // update max.
				result = obj[v];          // update result.
				}
			}
		return result
	}
	
	createTable(SortArray)
		{
			
			// Batting
			Total_Runs=0,Total_Balls_Faced=0,Total_fifties=0,Total_Innings=0, wicketsLost=0;
			// Bowling
			Total_Over=0,Total_wickets=0,Bowling_Runs=0;
			
			SortArray = _.sortBy(SortArray, [function(o) { return o.Stats.GamesPlayed; }]);	
			SortArray = SortArray.reverse()
			
			SortArray.map((player,i)=>{
						// Global
						Total_Runs = Total_Runs + player.Stats.Runs;
						Total_Balls_Faced = Total_Balls_Faced +player.Stats.Balls_Faced
						Total_fifties = Total_fifties + player.Stats.fifties;
						Total_Innings = Total_Innings + (player.Stats.Innings-player.Stats.NotOut);
						
						Total_Over    = Total_Over+player.Stats.Overs_Bowled
						Total_wickets = Total_wickets+player.Stats.Wickets
						Bowling_Runs  = Bowling_Runs +player.Stats.runs_conceded;
						
				});
	}

	componentWillMount(){ this.createTable(this.props.playerRoster)}
  	shouldComponentUpdate(nextProps, nextState){ return true;}
  	componentWillUpdate(nextProps, nextState){  this.createTable(nextProps.playerRoster) }
  
  render() {
	return (
		<div>
			<h1 class="page-header hidden-xs">&nbsp;</h1>
			<div class="row">	
				<Player_roster_widget title="Total Runs Scored" value={Total_Runs} />
				<Player_roster_widget title="Total # 50s" value={Total_fifties} />
				<Player_roster_widget title="Total Balls Faced" value={Total_Balls_Faced} />
				<Player_roster_widget title="Average Runs" value={(Total_Runs/Total_Innings).toFixed(2)} />
				
				
				<Player_roster_widget title="Total Overs Bowled" value={Total_Over} />
				<Player_roster_widget title="Total Wickets Taken" value={Total_wickets} />
				<Player_roster_widget title="Team Economy" value={(Bowling_Runs/Total_Over).toFixed(2)} />
				<Player_roster_widget title="Team Average" value={(Bowling_Runs/Total_wickets).toFixed(2)} />
				
			</div>
		</div>	
    );
  }
}