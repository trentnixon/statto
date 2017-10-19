import React from "react";
import { connect } from "react-redux";


import Display_Striped_Table from "../../Charts/Stage_StripedTable";


var TH=[], TableRow=[], rows=[], Teams=[],t=0,NewArrays, Limit=0;


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

	CalculateTable(Player)
		{
			t=0;
			Teams=[]
			Player.map((game,i)=>{
				Teams[t]=game.Team;
				t++;
			})
		
			NewArrays = this.foo(Teams)
			
			Limit = NewArrays[0].length;
			rows=[]
			for (var i=0; i < Limit; i++) {
					if(NewArrays[1][i] > 1)
						{
							rows.push({name:NewArrays[0][i],value:NewArrays[1][i]});
					}
			}	
	}
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillMount(){  this.CalculateTable(this.props.TableRow)}
	componentWillUpdate(nextProps, nextState){  this.CalculateTable(nextProps.TableRow) }
	
	render () {
			return (
				<div id="Stage">
					<Display_Striped_Table Title={this.props.Title} TableHeader={this.props.TableHeader} TableData={rows} />
				</div>
			)
	}
}