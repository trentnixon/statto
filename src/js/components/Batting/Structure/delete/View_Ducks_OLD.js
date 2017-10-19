import React from "react";
import { connect } from "react-redux";

import Feeder from "../Breakdown/";

var Years=[],year=[],Notouts=[],Overview=[],NewArrays,Count=0,Limit=0,TH=[], duckAverage=0, duckballs=0,duckballsaverage=0,Teams=[], Teamcount,TeamString,teamID;

@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}

	CalculatePie(Player)
		{
				var id=0;
				Player.map((game,i)=>{
						if(game.Runs == 0 && game.BallsFaced != ''){
							var Year = game.Date.split('/');
							Years[id]= 20+Year[2];
							id++;
						}
					})
				
				NewArrays = this.foo(Years)
				Limit = NewArrays[0].length;	
				year=[];
				for (var i=0; i < Limit; i++) {
							year.push({name:NewArrays[0][i], value:NewArrays[1][i]});
					}
			}
	
	CalculateTable(Player)
		{
		Notouts=[];
		Player.map((game,i)=>{
			if(game.Runs_parsed == 0 && game.BallsFaced != '' && game.Runs.indexOf("*") == -1){
				
				Notouts.push(
					<tr key={i}>
						<td>{game.Date}</td>
						<td>{game.Against}</td>
						<td>{game.Runs}</td>
						<td>{game.BallsFaced}</td>
					</tr>);
				}
			})
	}

	countTeams(teams,DuckCount){
			
			var t=1;
			var TeamName='Currently all '+Count+' of your Ducks are against unique Teams';
			
			teams[1].map((count,i)=>{
					if(count>t){TeamName = teams[0][i]+' seems to be a boogie teams with '+count+' of your '+DuckCount+' Ducks'; t=count;} 
				})	
			return TeamName
		}
		
	componentWillMount(){ 

		var ThisObject = this.props.BATTING.BattingObject;

		Count = this.props.BATTING.Facts["0"].Ducks;

		var InningsCount = this.props.BATTING.Facts["0"].NumInnings
		//Calculate the years pie
		this.CalculatePie(ThisObject)
		// Calculate Table

		Notouts=[];
		teamID=0;
		ThisObject.map((game,i)=>{
			if(game.Runs_parsed == 0 && game.BallsFaced != '' && game.Runs.indexOf("*") == -1){
				
				duckballs=duckballs+game.BallsFaced;
				
				Teams[teamID]=game.Against;
				teamID++;
				Notouts.push(
					<tr key={i}>
						<td>{game.Date}</td>
						<td>{game.Against}</td>
						<td>{game.Runs}</td>
						<td>{game.BallsFaced}</td>
					</tr>);
				}
			})
		
		
		Teamcount = this.foo(Teams);

		TeamString = this.countTeams(Teamcount,Count);
		
		TH=["Date","Team","Runs","Deliveries"];
		
		duckAverage = InningsCount/Count;
		duckAverage = duckAverage.toFixed(0);
		duckballsaverage = duckballs/Count;
		duckballsaverage = duckballsaverage.toFixed(2);
		
		Overview=[
			{fact:"You currently make a Duck ever "+duckAverage+" games"},
			{fact:"You have wasted "+duckballs+" ball makes 0! That's "+duckballsaverage+" balls per duck"},
			{fact:TeamString}
		]
	}

	render () {
			return (
				<div id="lessthan20">
					<Feeder 
						Title="Career Ducks"
						WidgetTitle="Career Ducks"
						WidgetCount={Count}
						PieTitle="Over the Years"
						PieData={year}
						TableTitle="By Opposition"
						TableData={Notouts}
						TableHeader={TH}
						Overview={Overview}
					/>
				</div>
			)
	}
}