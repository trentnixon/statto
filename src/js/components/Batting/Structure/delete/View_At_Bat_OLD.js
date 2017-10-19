import React from "react";
import { connect } from "react-redux";

import Feeder from "../Breakdown/";

var Years=[],year=[],Notouts=[],Teams=[],rows=[],Overview=[],NewArrays,Count=0,Limit=0, TH=[];

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
						if(game.BallsFaced > 0 ){
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
				return NewArrays;
			}
	
	CalculateTable(Player)
		{
			var t=0;
			Player.map((game,i)=>{
					if(game.BallsFaced > 0 ){
						Teams[t]=game.Against;
						t++
					}
				})
		
			var NewArrays = this.foo(Teams)
			
			Limit = NewArrays[0].length;
			rows=[]
			for (var i=0; i < Limit; i++) {
					if(NewArrays[1][i] > 1)
						{
							rows.push(<tr key={i}><td>{NewArrays[0][i]}</td><td>{NewArrays[1][i]}</td></tr>);
					}
			}	
		return NewArrays;
	}
	
	
	findCommonTeam(TeamCount){
			console.log(TeamCount)
			var Basecount=0;
			var commonTeam=[]
			var commonteam = TeamCount[1].map((count,i)=>{
					if(count > Basecount){
						Basecount = count
						commonTeam['Team']=TeamCount[0][i];
						commonTeam['count']=Basecount;
						}
				})
			return commonTeam;
		}
	
	componentWillMount(){ 
		var ThisObject = this.props.BATTING.BattingObject;
		Count = this.props.BATTING.Facts["0"].NumInnings;
		//Calculate the years pie
		var yearcount = this.CalculatePie(ThisObject)
		// Calculate Table
		var TeamCount = this.CalculateTable(ThisObject)
		
		var DisplayCommon = this.findCommonTeam(TeamCount);
		TH=["Team","Games"]
		
		Overview=[
			{fact:"You have Batted against a total of "+TeamCount[0].length+" unique teams over "+yearcount[0].length+" years"},
			{fact: rows.length+" of which you have scored against more than once."},
			{fact: DisplayCommon.Team+" being the most common with "+DisplayCommon.count+" innings"}
		]
	}
	render () {
			return (
				<div id="lessthan20">
					<Feeder 
						Title="Innings"
						WidgetTitle="Innings"
						WidgetCount={Count}
						PieTitle="Over the Years"
						PieData={year}
						TableTitle="By Opposition (2 game min)"
						TableHeader={TH}
						TableData={rows}
						Overview={Overview}
					/>
				</div>
			)
	}
}