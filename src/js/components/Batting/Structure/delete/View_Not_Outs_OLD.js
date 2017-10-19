import React from "react";
import { connect } from "react-redux";

import Feeder from "../Breakdown/";

var Years=[],year=[],Notouts=[],Overview=[],NewArrays,Count=0,Limit=0,TH=[], under=0,over=0,notoutcount=[], total=0,average=0, Teams=[], Teamcount,TeamString,teamID=0;

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
						if(game.Runs.indexOf("*") > 0){
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

	countTeams(teams,Count){
			
			var t=1;
			var TeamName='Currently all '+Count+' of your not-outs are against unique Teams';
			
			teams[1].map((count,i)=>{
					if(count>t){TeamName = teams[0][i]+' are your favorite teams with '+count+' not outs'; t=count;}	
				})	
	
			return TeamName
		
	}
		
	componentWillMount(){ 
		
		var ThisObject = this.props.BATTING.BattingObject;
		Count = this.props.BATTING.Facts["0"].NotOuts;
		//Calculate the years pie
		this.CalculatePie(ThisObject)
		// Calculate Table, over under and common teams
		Notouts=[];
		teamID=0;
		ThisObject.map((game,i)=>{
			if(game.Runs.indexOf("*") > 0){
				
				if(game.Runs_parsed < 50){ under++; }else
				if(game.Runs_parsed > 49){ over++; }
				
				total = total+game.Runs_parsed ;
				
				Teams[teamID]=game.Against;
				teamID++
				
				Notouts.push(
					<tr key={i}>
						<td>{game.Date}</td>
						<td>{game.Against}</td>
						<td>{game.Runs}</td>
						<td>{game.BallsFaced}</td>
					</tr>);
				}
			})
		// collect opponent with the most NO's
		Teamcount = this.foo(Teams)
		console.log(Teamcount);
		TeamString = this.countTeams(Teamcount,Count)
		

		TH=["Date","Team","Runs","Deliveries"]
		average = total/Count;
		average = average.toFixed(2);
		
		Overview=[
			{fact: over+ " of your "+Count+" not-outs have come from making 50 or more, Whereas "+under+" come from seeing out the 20 overs"},
			{fact:TeamString},
			{fact: "Your not-out total is "+total+" @ an average of "+average+" per not-out."}
		]
	}

	render () {
			return (
				<div id="lessthan20">
					<Feeder 
						Title="Career Not Outs"
						WidgetTitle="Career Not Outs"
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