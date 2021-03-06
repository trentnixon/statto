import React from "react";
import { connect } from "react-redux";


import Display_Striped_Table from "../../Charts/Stage_StripedTable";


var TH=[];


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
			var t=0;
			Player.map((game,i)=>{
					if(game.Bowling_BallsBowled > 0 ){
						Teams[t]=game.Against;
						t++;
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
	}
	
	
	componentWillMount(){ 
		console.log(this.props)
	}
	render () {
			return (
				<div id="Stage">
					<Display_Striped_Table Title={this.props.Title} TableHeader={this.props.TH} TableData={this.props.TR} />
				</div>
			)
	}
}