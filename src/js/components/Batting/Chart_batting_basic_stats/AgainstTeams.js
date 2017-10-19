import React from "react";
import { connect } from "react-redux";
import DisplayBarChart from "../../Charts/BarChart";
	
	
var TeamsArray=[], Results=[],UsedName, UsedTotal, Score=0, i=0,NotOut=0,ReturnedTeamsArray, highscore=0, didibat=0,Average=0;

export default class BasicStats extends React.Component {
	
	componentWillMount(){ }
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
	
	AddResults(TeamName,Runs, outs, Played,Average){
		
			Results.push({TeamName:TeamName, Runs:Runs,Outs:outs, Played:Played,Average:Average})
		}
	
	componentWillUpdate(nextProps, nextState){

		var Player = nextProps.PlayerStats;
		/****
			When i have time.. put all of these stats through a reducer
		****/
		Player.games.map((game,i)=>{
				
				var TeamName = game.meta.Team[0];
				var Score =  game.meta.Batting_Runscored[0];
				var BallsFaced = game.meta.Batting_BallsFaced[0];
		
				if(BallsFaced != ''){ TeamsArray.push({name:TeamName, runs:Score}); }
				
			})

			ReturnedTeamsArray = this.sortByKey(TeamsArray, 'name');


			var id = ReturnedTeamsArray.length-1;
			
			// Map over sorted Array to find teams and totals
			ReturnedTeamsArray.map((games,t)=>{
					
					if(UsedName != games.name)
						{	
								if(i != 0) { 
										if(didibat != 0) { Average = UsedTotal/didibat;}
										else{ Average = UsedTotal;}
										this.AddResults(UsedName,UsedTotal,didibat, i, Average)
									}
						
								UsedTotal =0;
								i=0
								didibat = 0
							
							Score = parseInt(games.runs);
							
							if(games.runs.indexOf("*") != -1){ didibat = didibat + 0;} else 
							{didibat = didibat + 1;}
							
							UsedTotal = UsedTotal +Score;
							
								UsedName = games.name;
								i++
							}
					else{
							Score = parseInt(games.runs);
							if(games.runs.indexOf("*") != -1){ didibat = didibat + 0;} else 
							{didibat = didibat + 1;}
							UsedTotal = UsedTotal +Score;
							i++
						}
						
					// Pick up the last Round
					if( t == id) { 
						if(didibat != 0) 
						{ Average = UsedTotal/didibat;}
						else{ Average = UsedTotal;}
						this.AddResults(UsedName,UsedTotal,didibat, i, Average)
					}
	
				})	
		// This array can be used for other things	
		// make this into a section	
		console.log(Results)

	}

	render () {
			
			return (
				<div id="BasicStats">
					<ul class="BasicStats">
						<li>Team Played the most : </li>
						<li>Most Runs Against (Min of 2 games) : </li>
						<li>Best Average Against: </li>
						<li>Least Runs Against (Min of 2 games) : </li>
						
					</ul>
					
					<h3>BAR/Line Chart: total runs as Bar Average against teams as Line</h3>
					<h3>Pie percentage of total Runs against Teams</h3>
					
						
				</div>
			)
  }

}