import React from "react";
import { connect } from "react-redux";

import Feeder from "../Breakdown/";

var Years=[],year=[],Notouts=[],Overview=[],NewArrays,Count=0,Limit=0,TH=[];

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
						if(game.Runs_parsed > 19 && game.Runs_parsed < 30){
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
			if(game.Runs_parsed > 19 && game.Runs_parsed < 30){
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
	
	componentWillMount(){ 
		var ThisObject = this.props.BATTING.BattingObject;
		Count = this.props.BATTING.Facts["0"].twenty;
		//Calculate the years pie
		this.CalculatePie(ThisObject)
		// Calculate Table
		this.CalculateTable(ThisObject)
		TH=["Date","Team","Runs","Deliveries"];
		Overview=[
			{fact:"Coming Soon"}
		]
	}

	render () {
			return (
				<div id="lessthan20">
					<Feeder 
						Title="Innings in the 20s"
						WidgetTitle="Career 20's"
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